package handler

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/deepfence/ThreatMapper/deepfence_server/controls"
	"github.com/deepfence/ThreatMapper/deepfence_server/ingesters"
	"github.com/deepfence/ThreatMapper/deepfence_server/model"
	ctl "github.com/deepfence/ThreatMapper/deepfence_utils/controls"
	"github.com/deepfence/ThreatMapper/deepfence_utils/log"
	httpext "github.com/go-playground/pkg/v5/net/http"
	"github.com/twmb/franz-go/pkg/kgo"
)

func (h *Handler) StartVulnerabilityScanHandler(w http.ResponseWriter, r *http.Request) {
	req, err := extractScanTrigger(w, r)
	if err != nil {
		return
	}
	startScan(w, r, req.NodeId, ctl.StartVulnerabilityScan, "")
}

func (h *Handler) StartSecretScanHandler(w http.ResponseWriter, r *http.Request) {

	req, err := extractScanTrigger(w, r)
	if err != nil {
		return
	}

	internal_req := ctl.StartSecretScanRequest{
		ResourceId:   req.ResourceId,
		ResourceType: req.ResourceType,
		BinArgs:      req.BinArgs,
		Hostname:     req.Hostname,
	}

	b, err := json.Marshal(internal_req)

	if err != nil {
		httpext.JSON(w, http.StatusInternalServerError, model.Response{Success: false})
		return
	}

	startScan(w, r, req.NodeId, ctl.StartSecretScan, string(b))
}

func (h *Handler) StartComplianceScanHandler(w http.ResponseWriter, r *http.Request) {
	req, err := extractScanTrigger(w, r)
	if err != nil {
		return
	}
	startScan(w, r, req.NodeId, ctl.StartComplianceScan, "")
}

func (h *Handler) StartMalwareScanHandler(w http.ResponseWriter, r *http.Request) {
	req, err := extractScanTrigger(w, r)
	if err != nil {
		return
	}
	startScan(w, r, req.NodeId, ctl.StartMalwareScan, "")
}

func (h *Handler) StopVulnerabilityScanHandler(w http.ResponseWriter, r *http.Request) {
	stopScan(w, r, ctl.StartVulnerabilityScan)
}

func (h *Handler) StopSecretScanHandler(w http.ResponseWriter, r *http.Request) {
	stopScan(w, r, ctl.StartSecretScan)
}

func (h *Handler) StopComplianceScanHandler(w http.ResponseWriter, r *http.Request) {
	stopScan(w, r, ctl.StartComplianceScan)
}

func (h *Handler) StopMalwareScanHandler(w http.ResponseWriter, r *http.Request) {
	stopScan(w, r, ctl.StartMalwareScan)
}

func startScan(w http.ResponseWriter, r *http.Request, nodeId string, action ctl.ActionID, payload string) {

	ctx := r.Context()
	err := controls.SetAgentActions(ctx, nodeId, []ctl.Action{
		{
			ID:             action,
			RequestPayload: payload,
		},
	})

	if err != nil {
		log.Error().Msgf("%v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Started")
}

func (h *Handler) IngestCloudResourcesReportHandler(w http.ResponseWriter, r *http.Request) {
	ingester := ingesters.NewCloudResourceIngester()
	ingest_scan_report(w, r, ingester)
}

func ingest_scan_report[T any](respWrite http.ResponseWriter, req *http.Request, ingester ingesters.Ingester[T]) {

	defer req.Body.Close()
	if req.Method != "POST" {
		http.Error(respWrite, "invalid request", http.StatusInternalServerError)
		return
	}
	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		http.Error(respWrite, "Error reading request body", http.StatusInternalServerError)
		return
	}

	ctx := req.Context()

	var data T
	err = json.Unmarshal(body, &data)
	if err != nil {
		http.Error(respWrite, "Error processing request body", http.StatusInternalServerError)
		return
	}
	ingester.Ingest(ctx, data)
	if err != nil {
		http.Error(respWrite, "Error processing request body", http.StatusInternalServerError)
		return
	}

	respWrite.WriteHeader(http.StatusOK)
	fmt.Fprintf(respWrite, "Ok")
}

func (h *Handler) IngestVulnerabilityReportHandler(w http.ResponseWriter, r *http.Request) {
	ingester := ingesters.NewVulnerabilityIngester()
	ingest_scan_report_kafka(w, r, ingester, h.IngestChan)
}

func (h *Handler) IngestSecretReportHandler(w http.ResponseWriter, r *http.Request) {
	ingester := ingesters.NewSecretIngester()
	ingest_scan_report_kafka(w, r, ingester, h.IngestChan)
}

func (h *Handler) IngestComplianceReportHandler(w http.ResponseWriter, r *http.Request) {
	ingester := ingesters.NewComplianceIngester()
	ingest_scan_report_kafka(w, r, ingester, h.IngestChan)
}

func (h *Handler) IngestCloudComplianceReportHandler(w http.ResponseWriter, r *http.Request) {
	ingester := ingesters.NewCloudComplianceIngester()
	ingest_scan_report_kafka(w, r, ingester, h.IngestChan)
}

func ingest_scan_report_kafka[T any](respWrite http.ResponseWriter, req *http.Request,
	ingester ingesters.KafkaIngester[T], ingestChan chan *kgo.Record) {

	defer req.Body.Close()
	if req.Method != "POST" {
		http.Error(respWrite, "invalid request", http.StatusInternalServerError)
		return
	}
	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		http.Error(respWrite, "Error reading request body", http.StatusInternalServerError)
		return
	}

	ctx := req.Context()

	var data T
	err = json.Unmarshal(body, &data)
	if err != nil {
		http.Error(respWrite, "Error processing request body", http.StatusInternalServerError)
		return
	}
	err = ingester.Ingest(ctx, data, ingestChan)
	if err != nil {
		http.Error(respWrite, "Error processing request body", http.StatusInternalServerError)
		return
	}

	respWrite.WriteHeader(http.StatusOK)
	fmt.Fprintf(respWrite, "Ok")
}

func stopScan(w http.ResponseWriter, r *http.Request, action ctl.ActionID) {
	//	Stopping scan is on best-effort basis, not guaranteed
}

func extractScanTrigger(w http.ResponseWriter, r *http.Request) (model.ScanTrigger, error) {
	defer r.Body.Close()
	var req model.ScanTrigger
	err := httpext.DecodeJSON(r, httpext.NoQueryParams, MaxPostRequestSize, &req)

	if err != nil {
		log.Error().Msgf("%v", err)
		httpext.JSON(w, http.StatusBadRequest, model.Response{Success: false})
	}
	return req, err
}
