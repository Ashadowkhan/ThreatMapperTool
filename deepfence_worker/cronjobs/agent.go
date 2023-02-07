package cronjobs

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"os/exec"
	"strings"

	"github.com/ThreeDotsLabs/watermill/message"

	"github.com/deepfence/golang_deepfence_sdk/utils/directory"
	"github.com/deepfence/golang_deepfence_sdk/utils/log"
	m "github.com/minio/minio-go/v7"
	"github.com/neo4j/neo4j-go-driver/v4/neo4j"
)

func getVersionMetadata(url string, result *[]map[string]interface{}) error {
	resp, err := http.Get(url)
	if err != nil {
		return fmt.Errorf("cannot fetch URL %q: %v", url, err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("unexpected http GET status: %s", resp.Status)
	}
	// We could check the resulting content type
	// here if desired.
	err = json.NewDecoder(resp.Body).Decode(result)
	if err != nil {
		return fmt.Errorf("cannot decode JSON: %v", err)
	}
	return nil
}

func CheckAgentUpgrade(msg *message.Message) error {

	log.Info().Msg("Start agent version check")

	res := []map[string]interface{}{}
	getVersionMetadata("https://api.github.com/repos/deepfence/ThreatMapper/tags", &res)

	tags_to_ingest := []string{}
	for _, tag := range res {
		if strings.HasPrefix(tag["name"].(string), "v") {
			tags_to_ingest = append(tags_to_ingest, tag["name"].(string))
		}
	}

	namespace := msg.Metadata.Get(directory.NamespaceKey)
	ctx := directory.NewContextWithNameSpace(directory.NamespaceID(namespace))

	tags_with_urls, err := prepareAgentReleases(ctx, tags_to_ingest)
	if err != nil {
		return err
	}

	return ingestAgentVersion(ctx, tags_with_urls)
}

func prepareAgentReleases(ctx context.Context, tags_to_ingest []string) (map[string]string, error) {
	processed_tags := map[string]string{}
	minio, err := directory.MinioClient(ctx)
	if err != nil {
		return processed_tags, err
	}

	for _, tag := range tags_to_ingest {
		agent_image := "deepfenceio/deepfence_agent_ce:" + tag[1:]
		cmd := exec.Command("docker", []string{"pull", agent_image}...)
		if err := cmd.Run(); err != nil {
			log.Error().Err(err).Msg("Docker pull")
			continue
		}
		cmd = exec.Command("docker", []string{"create", "--name=dummy", agent_image}...)
		if err := cmd.Run(); err != nil {
			log.Error().Err(err).Msg("Docker create")
			continue
		}
		cmd = exec.Command("docker", []string{"cp", "dummy:/home/deepfence", "/tmp/" + tag}...)
		if err := cmd.Run(); err != nil {
			log.Error().Err(err).Msg("Docker cp")
			continue
		}
		cmd = exec.Command("docker", []string{"rm", "dummy"}...)
		if err := cmd.Run(); err != nil {
			log.Error().Err(err).Msg("Docker rm")
			continue
		}
		out_file := fmt.Sprintf("%s.tar.gz", tag)
		cmd = exec.Command("tar", []string{"zcvf", out_file, "-C", "/tmp/" + tag, "."}...)
		if err := cmd.Run(); err != nil {
			log.Error().Err(err).Msg("Untar")
			continue
		}
		b, err := os.ReadFile(out_file)
		if err != nil {
			log.Error().Err(err).Msg("ReadFile")
			continue
		}
		res, err := minio.UploadFile(ctx, out_file, b, m.PutObjectOptions{ContentType: "application/gzip"})
		key := ""
		if err != nil {
			ape, ok := err.(directory.AlreadyPresentError)
			if ok {
				log.Warn().Err(err).Msg("Skip upload")
				key = ape.Path
			} else {
				log.Error().Err(err).Msg("Upload")
				continue
			}
		} else {
			key = res.Key
		}

		url, err := minio.ExposeFile(ctx, key)
		if err != nil {
			log.Error().Err(err)
			continue
		}
		log.Info().Msgf("Exposed URL: %v", url)
		processed_tags[tag] = url
	}
	return processed_tags, nil
}

func ingestAgentVersion(ctx context.Context, tags_to_url map[string]string) error {
	nc, err := directory.Neo4jClient(ctx)
	if err != nil {
		return err
	}
	session := nc.NewSession(neo4j.SessionConfig{AccessMode: neo4j.AccessModeWrite})
	defer session.Close()

	tx, err := session.BeginTransaction()
	if err != nil {
		return err
	}
	defer tx.Close()

	tags_to_ingest := []map[string]string{}
	for k, v := range tags_to_url {
		tags_to_ingest = append(tags_to_ingest, map[string]string{"tag": k, "url": v})
	}

	if _, err = tx.Run(`
		UNWIND $batch as row
		MERGE (:AgentVersion{node_id: row.tag, url: row.url})
		`, map[string]interface{}{"batch": tags_to_ingest}); err != nil {
		return err
	}

	return tx.Commit()
}
