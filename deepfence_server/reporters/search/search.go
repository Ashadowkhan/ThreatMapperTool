package reporters_search

import (
	"context"

	"github.com/deepfence/ThreatMapper/deepfence_server/model"
	"github.com/deepfence/ThreatMapper/deepfence_server/reporters"
	reporters_scan "github.com/deepfence/ThreatMapper/deepfence_server/reporters/scan"
	"github.com/deepfence/golang_deepfence_sdk/utils/directory"
	"github.com/deepfence/golang_deepfence_sdk/utils/utils"
	"github.com/neo4j/neo4j-go-driver/v4/neo4j"
	"github.com/neo4j/neo4j-go-driver/v4/neo4j/dbtype"
	"github.com/rs/zerolog/log"
	"github.com/samber/mo"
)

// If no nodeIds are provided, will return all
// If no field are provided, will return all fields.
// (Fields can only be top level since neo4j does not support nested fields)
type SearchFilter struct {
	InFieldFilter []string                `json:"in_field_filter" required:"true"` // Fields to return
	Filters       reporters.FieldsFilters `json:"filters" required:"true"`
	Window        model.FetchWindow       `json:"window" required:"true"`
}

type SearchNodeReq struct {
	NodeFilter SearchFilter      `json:"node_filter" required:"true"`
	Window     model.FetchWindow `json:"window" required:"true"`
}

type SearchScanReq struct {
	ScanFilter SearchFilter      `json:"scan_filters" required:"true"`
	NodeFilter SearchFilter      `json:"node_filters" required:"true"`
	Window     model.FetchWindow `json:"window" required:"true"`
}

type SearchCountResp struct {
	Count      int              `json:"count" required:"true"`
	Categories map[string]int32 `json:"categories" required:"true"`
}

type NodeCountResp struct {
	CloudProviders    int64 `json:"cloud_provider" required:"true"`
	Host              int64 `json:"host" required:"true"`
	Container         int64 `json:"container" required:"true"`
	ContainerImage    int64 `json:"container_image" required:"true"`
	Pod               int64 `json:"pod" required:"true"`
	KubernetesCluster int64 `json:"kubernetes_cluster" required:"true"`
	Namespace         int64 `json:"namespace" required:"true"`
}

type ResultGroup struct {
	Name     string `json:"name"`
	Count    int64  `json:"count"`
	Severity string `json:"severity"`
}

type ResultGroupResp struct {
	Groups []ResultGroup `json:"groups"`
}

func CountNodes(ctx context.Context) (NodeCountResp, error) {
	res := NodeCountResp{}
	driver, err := directory.Neo4jClient(ctx)
	if err != nil {
		return res, err
	}

	session, err := driver.Session(neo4j.AccessModeRead)
	if err != nil {
		return res, err
	}
	defer session.Close()

	tx, err := session.BeginTransaction()
	if err != nil {
		return res, err
	}
	defer tx.Close()

	query := `
		MATCH (n)
		WHERE (n:Node OR n:Container OR n:ContainerImage OR n:KubernetesCluster OR n:Pod OR n:CloudProvider)
		AND n.pseudo=false AND n.active=true
		RETURN labels(n), count(labels(n)), count(distinct n.kubernetes_namespace);`
	r, err := tx.Run(query,
		map[string]interface{}{})
	if err != nil {
		return res, err
	}
	recs, err := r.Collect()
	if err != nil {
		return res, err
	}
	for _, rec := range recs {
		neo4jNodeTypes := rec.Values[0].([]interface{})
		count := rec.Values[1].(int64)
		for _, neo4jNodeType := range neo4jNodeTypes {
			switch neo4jNodeType {
			case "Node":
				res.Host = count
			case "Container":
				res.Container = count
			case "ContainerImage":
				res.ContainerImage = count
			case "KubernetesCluster":
				res.KubernetesCluster = count
			case "Pod":
				res.Pod = count
				res.Namespace = rec.Values[2].(int64)
			case "CloudProvider":
				res.CloudProviders = count
			}
		}
	}

	return res, nil
}

func searchGenericDirectNodeReport[T reporters.Cypherable](ctx context.Context, filter SearchFilter, fw model.FetchWindow) ([]T, error) {
	res := []T{}
	var dummy T

	driver, err := directory.Neo4jClient(ctx)
	if err != nil {
		return res, err
	}

	session, err := driver.Session(neo4j.AccessModeRead)
	if err != nil {
		return res, err
	}
	defer session.Close()

	tx, err := session.BeginTransaction()
	if err != nil {
		return res, err
	}
	defer tx.Close()

	query := `
		MATCH (n:` + dummy.NodeType() + `)` +
		reporters.ParseFieldFilters2CypherWhereConditions("n", mo.Some(filter.Filters), true) +
		` OPTIONAL MATCH (n) -[:IS]-> (e)
		RETURN ` + reporters.FieldFilterCypher("n", filter.InFieldFilter) + `, e ` +
		reporters.OrderFilter2CypherCondition("n", filter.Filters.OrderFilter) +
		fw.FetchWindow2CypherQuery()
	log.Info().Msgf("search query: %v", query)
	r, err := tx.Run(query,
		map[string]interface{}{})

	if err != nil {
		return res, err
	}

	recs, err := r.Collect()

	if err != nil {
		return res, err
	}

	for _, rec := range recs {
		var node_map map[string]interface{}
		if len(filter.InFieldFilter) == 0 {
			data, has := rec.Get("n")
			if !has {
				log.Warn().Msgf("Missing neo4j entry")
				continue
			}
			da, ok := data.(dbtype.Node)
			if !ok {
				log.Warn().Msgf("Missing neo4j entry")
				continue
			}
			node_map = da.Props
		} else {
			node_map = map[string]interface{}{}
			for i := range filter.InFieldFilter {
				node_map[filter.InFieldFilter[i]] = rec.Values[i]
			}
		}
		is_node, _ := rec.Get("e")
		if is_node != nil {
			for k, v := range is_node.(dbtype.Node).Props {
				if k != "node_id" {
					node_map[k] = v
				} else {
					node_map[dummy.ExtendedField()] = v
				}
			}
		}
		var node T
		utils.FromMap(node_map, &node)
		res = append(res, node)
	}

	return res, nil
}

func searchCloudNode(ctx context.Context, filter SearchFilter, fw model.FetchWindow) ([]model.CloudNodeAccountInfo, error) {
	var res []model.CloudNodeAccountInfo
	dummy := model.CloudNodeAccountInfo{
		CloudProvider: filter.Filters.ContainsFilter.FieldsValues["cloud_provider"][0].(string),
	}

	driver, err := directory.Neo4jClient(ctx)
	if err != nil {
		return res, err
	}

	session, err := driver.Session(neo4j.AccessModeRead)
	if err != nil {
		return res, err
	}
	defer session.Close()

	tx, err := session.BeginTransaction()
	if err != nil {
		return res, err
	}
	defer tx.Close()

	query := `
		MATCH (n:` + dummy.NodeType() + `)` +
		reporters.ParseFieldFilters2CypherWhereConditions("n", mo.Some(filter.Filters), true) +
		`WITH n.node_id AS node_id UNWIND node_id AS x
		OPTIONAL MATCH (n:` + dummy.NodeType() + `{node_id: x})<-[:SCANNED]-(s:` + string(dummy.ScanType()) + `)-[:DETECTED]->(c:` + dummy.ScanResultType() + `)
		WITH x ` + reporters.FieldFilterCypher("", filter.InFieldFilter) + `, COUNT(c) AS total_compliance_count
		OPTIONAL MATCH (n:` + dummy.NodeType() + `{node_id: x})<-[:SCANNED]-(s:` + string(dummy.ScanType()) + `)-[:DETECTED]->(c1:` + dummy.ScanResultType() + `)
		WHERE c1.status IN $pass_status
		WITH x` + reporters.FieldFilterCypher("", filter.InFieldFilter) + `, CASE WHEN total_compliance_count = 0 THEN 0.0 ELSE COUNT(c1.status)*100.0/total_compliance_count END AS compliance_percentage
		CALL {
			WITH x
			OPTIONAL MATCH (n:` + dummy.NodeType() + `{node_id: x})<-[:SCANNED]-(s1:` + string(dummy.ScanType()) + `)
			RETURN s1.node_id AS last_scan_id, s1.status AS last_scan_status
			ORDER BY s1.updated_at DESC LIMIT 1
		}
		RETURN x as node_id, compliance_percentage, COALESCE(last_scan_id, '') as last_scan_id, COALESCE(last_scan_status, '') as last_scan_status` + reporters.FieldFilterCypher("", filter.InFieldFilter) +
		reporters.OrderFilter2CypherCondition("", filter.Filters.OrderFilter) + fw.FetchWindow2CypherQuery()

	log.Info().Msgf("search cloud node query: %v", query)
	r, err := tx.Run(query,
		map[string]interface{}{
			"pass_status": dummy.GetPassStatus(),
		})

	if err != nil {
		return res, err
	}

	recs, err := r.Collect()

	if err != nil {
		return res, err
	}

	for _, rec := range recs {
		var node_map map[string]interface{}
		if len(filter.InFieldFilter) != 0 {
			data, has := rec.Get("n")
			if !has {
				log.Warn().Msgf("Missing neo4j entry")
				continue
			}
			da, ok := data.(dbtype.Node)
			if !ok {
				log.Warn().Msgf("Missing neo4j entry")
				continue
			}
			node_map = da.Props
		} else {
			node_map = map[string]interface{}{}
			baseValuesCount := 0
			for _, nodeMapKey := range []string{"node_id", "compliance_percentage", "last_scan_id", "last_scan_status"} {
				node_map[nodeMapKey] = rec.Values[baseValuesCount]
				baseValuesCount = baseValuesCount + 1
			}
			for i := range filter.InFieldFilter {
				node_map[filter.InFieldFilter[i]] = rec.Values[i+baseValuesCount]
			}
		}
		var node model.CloudNodeAccountInfo
		utils.FromMap(node_map, &node)
		res = append(res, node)
	}
	return res, nil
}

func searchGenericScanInfoReport(ctx context.Context, scan_type utils.Neo4jScanType, scan_filter SearchFilter, resource_filter SearchFilter, fw model.FetchWindow) ([]model.ScanInfo, error) {
	res := []model.ScanInfo{}

	driver, err := directory.Neo4jClient(ctx)
	if err != nil {
		return res, err
	}

	session, err := driver.Session(neo4j.AccessModeRead)
	if err != nil {
		return res, err
	}
	defer session.Close()

	tx, err := session.BeginTransaction()
	if err != nil {
		return res, err
	}
	defer tx.Close()

	query := `
		MATCH (:` + string(scan_type) + `) -[:SCANNED]-> (m)` +
		reporters.ParseFieldFilters2CypherWhereConditions("m", mo.Some(resource_filter.Filters), true) +
		`
	    WITH distinct m
		CALL {
	    WITH m
		MATCH (n:` + string(scan_type) + `) -[:SCANNED]-> (m)` +
		reporters.ParseFieldFilters2CypherWhereConditions("n", mo.Some(scan_filter.Filters), true) +
		`
	    RETURN n
	    ORDER BY n.updated_at DESC` +
		scan_filter.Window.FetchWindow2CypherQuery() +
		`}
	    RETURN n.node_id as scan_id, n.status, n.status_message, n.updated_at, m.node_id, labels(m) as node_type, m.node_name` +
		reporters.OrderFilter2CypherCondition("n", scan_filter.Filters.OrderFilter) +
		fw.FetchWindow2CypherQuery()
	log.Info().Msgf("search query: %v", query)
	r, err := tx.Run(query,
		map[string]interface{}{})

	if err != nil {
		return res, err
	}

	recs, err := r.Collect()

	if err != nil {
		return res, err
	}

	for _, rec := range recs {

		counts, err := reporters_scan.GetSevCounts(ctx, scan_type, rec.Values[0].(string))
		if err != nil {
			log.Error().Msgf("%v", err)
		}
		res = append(res, model.ScanInfo{
			ScanId:         rec.Values[0].(string),
			Status:         rec.Values[1].(string),
			StatusMessage:  rec.Values[2].(string),
			UpdatedAt:      rec.Values[3].(int64),
			NodeId:         rec.Values[4].(string),
			NodeType:       reporters_scan.Labels2NodeType(rec.Values[5].([]interface{})),
			NodeName:       rec.Values[6].(string),
			SeverityCounts: counts,
		})
	}

	return res, nil
}

func SearchCloudNodeReport[T reporters.Cypherable](ctx context.Context, filter SearchFilter, fw model.FetchWindow) ([]model.CloudNodeAccountInfo, error) {
	hosts, err := searchCloudNode(ctx, filter, fw)
	if err != nil {
		return nil, err
	}
	return hosts, nil
}

func SearchReport[T reporters.Cypherable](ctx context.Context, filter SearchFilter, fw model.FetchWindow) ([]T, error) {
	hosts, err := searchGenericDirectNodeReport[T](ctx, filter, fw)
	if err != nil {
		return nil, err
	}
	return hosts, nil
}

func SearchScansReport(ctx context.Context, filter SearchScanReq, scan_type utils.Neo4jScanType) ([]model.ScanInfo, error) {
	hosts, err := searchGenericScanInfoReport(ctx, scan_type, filter.ScanFilter, filter.NodeFilter, filter.Window)
	if err != nil {
		return nil, err
	}
	return hosts, nil
}
