/*
Deepfence ThreatMapper

Deepfence Runtime API provides programmatic control over Deepfence microservice securing your container, kubernetes and cloud deployments. The API abstracts away underlying infrastructure details like cloud provider,  container distros, container orchestrator and type of deployment. This is one uniform API to manage and control security alerts, policies and response to alerts for microservices running anywhere i.e. managed pure greenfield container deployments or a mix of containers, VMs and serverless paradigms like AWS Fargate.

API version: 2.0.0
Contact: community@deepfence.io
*/

// Code generated by OpenAPI Generator (https://openapi-generator.tech); DO NOT EDIT.

package deepfence_server_client

import (
	"encoding/json"
	"time"
)

// checks if the IngestersSecretScanStatus type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &IngestersSecretScanStatus{}

// IngestersSecretScanStatus struct for IngestersSecretScanStatus
type IngestersSecretScanStatus struct {
	Timestamp *time.Time `json:"@timestamp,omitempty"`
	ContainerName *string `json:"container_name,omitempty"`
	HostName *string `json:"host_name,omitempty"`
	KubernetesClusterName *string `json:"kubernetes_cluster_name,omitempty"`
	Masked *string `json:"masked,omitempty"`
	NodeId *string `json:"node_id,omitempty"`
	NodeName *string `json:"node_name,omitempty"`
	NodeType *string `json:"node_type,omitempty"`
	ScanId *string `json:"scan_id,omitempty"`
	ScanStatus *string `json:"scan_status,omitempty"`
}

// NewIngestersSecretScanStatus instantiates a new IngestersSecretScanStatus object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewIngestersSecretScanStatus() *IngestersSecretScanStatus {
	this := IngestersSecretScanStatus{}
	return &this
}

// NewIngestersSecretScanStatusWithDefaults instantiates a new IngestersSecretScanStatus object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewIngestersSecretScanStatusWithDefaults() *IngestersSecretScanStatus {
	this := IngestersSecretScanStatus{}
	return &this
}

// GetTimestamp returns the Timestamp field value if set, zero value otherwise.
func (o *IngestersSecretScanStatus) GetTimestamp() time.Time {
	if o == nil || isNil(o.Timestamp) {
		var ret time.Time
		return ret
	}
	return *o.Timestamp
}

// GetTimestampOk returns a tuple with the Timestamp field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *IngestersSecretScanStatus) GetTimestampOk() (*time.Time, bool) {
	if o == nil || isNil(o.Timestamp) {
		return nil, false
	}
	return o.Timestamp, true
}

// HasTimestamp returns a boolean if a field has been set.
func (o *IngestersSecretScanStatus) HasTimestamp() bool {
	if o != nil && !isNil(o.Timestamp) {
		return true
	}

	return false
}

// SetTimestamp gets a reference to the given time.Time and assigns it to the Timestamp field.
func (o *IngestersSecretScanStatus) SetTimestamp(v time.Time) {
	o.Timestamp = &v
}

// GetContainerName returns the ContainerName field value if set, zero value otherwise.
func (o *IngestersSecretScanStatus) GetContainerName() string {
	if o == nil || isNil(o.ContainerName) {
		var ret string
		return ret
	}
	return *o.ContainerName
}

// GetContainerNameOk returns a tuple with the ContainerName field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *IngestersSecretScanStatus) GetContainerNameOk() (*string, bool) {
	if o == nil || isNil(o.ContainerName) {
		return nil, false
	}
	return o.ContainerName, true
}

// HasContainerName returns a boolean if a field has been set.
func (o *IngestersSecretScanStatus) HasContainerName() bool {
	if o != nil && !isNil(o.ContainerName) {
		return true
	}

	return false
}

// SetContainerName gets a reference to the given string and assigns it to the ContainerName field.
func (o *IngestersSecretScanStatus) SetContainerName(v string) {
	o.ContainerName = &v
}

// GetHostName returns the HostName field value if set, zero value otherwise.
func (o *IngestersSecretScanStatus) GetHostName() string {
	if o == nil || isNil(o.HostName) {
		var ret string
		return ret
	}
	return *o.HostName
}

// GetHostNameOk returns a tuple with the HostName field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *IngestersSecretScanStatus) GetHostNameOk() (*string, bool) {
	if o == nil || isNil(o.HostName) {
		return nil, false
	}
	return o.HostName, true
}

// HasHostName returns a boolean if a field has been set.
func (o *IngestersSecretScanStatus) HasHostName() bool {
	if o != nil && !isNil(o.HostName) {
		return true
	}

	return false
}

// SetHostName gets a reference to the given string and assigns it to the HostName field.
func (o *IngestersSecretScanStatus) SetHostName(v string) {
	o.HostName = &v
}

// GetKubernetesClusterName returns the KubernetesClusterName field value if set, zero value otherwise.
func (o *IngestersSecretScanStatus) GetKubernetesClusterName() string {
	if o == nil || isNil(o.KubernetesClusterName) {
		var ret string
		return ret
	}
	return *o.KubernetesClusterName
}

// GetKubernetesClusterNameOk returns a tuple with the KubernetesClusterName field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *IngestersSecretScanStatus) GetKubernetesClusterNameOk() (*string, bool) {
	if o == nil || isNil(o.KubernetesClusterName) {
		return nil, false
	}
	return o.KubernetesClusterName, true
}

// HasKubernetesClusterName returns a boolean if a field has been set.
func (o *IngestersSecretScanStatus) HasKubernetesClusterName() bool {
	if o != nil && !isNil(o.KubernetesClusterName) {
		return true
	}

	return false
}

// SetKubernetesClusterName gets a reference to the given string and assigns it to the KubernetesClusterName field.
func (o *IngestersSecretScanStatus) SetKubernetesClusterName(v string) {
	o.KubernetesClusterName = &v
}

// GetMasked returns the Masked field value if set, zero value otherwise.
func (o *IngestersSecretScanStatus) GetMasked() string {
	if o == nil || isNil(o.Masked) {
		var ret string
		return ret
	}
	return *o.Masked
}

// GetMaskedOk returns a tuple with the Masked field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *IngestersSecretScanStatus) GetMaskedOk() (*string, bool) {
	if o == nil || isNil(o.Masked) {
		return nil, false
	}
	return o.Masked, true
}

// HasMasked returns a boolean if a field has been set.
func (o *IngestersSecretScanStatus) HasMasked() bool {
	if o != nil && !isNil(o.Masked) {
		return true
	}

	return false
}

// SetMasked gets a reference to the given string and assigns it to the Masked field.
func (o *IngestersSecretScanStatus) SetMasked(v string) {
	o.Masked = &v
}

// GetNodeId returns the NodeId field value if set, zero value otherwise.
func (o *IngestersSecretScanStatus) GetNodeId() string {
	if o == nil || isNil(o.NodeId) {
		var ret string
		return ret
	}
	return *o.NodeId
}

// GetNodeIdOk returns a tuple with the NodeId field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *IngestersSecretScanStatus) GetNodeIdOk() (*string, bool) {
	if o == nil || isNil(o.NodeId) {
		return nil, false
	}
	return o.NodeId, true
}

// HasNodeId returns a boolean if a field has been set.
func (o *IngestersSecretScanStatus) HasNodeId() bool {
	if o != nil && !isNil(o.NodeId) {
		return true
	}

	return false
}

// SetNodeId gets a reference to the given string and assigns it to the NodeId field.
func (o *IngestersSecretScanStatus) SetNodeId(v string) {
	o.NodeId = &v
}

// GetNodeName returns the NodeName field value if set, zero value otherwise.
func (o *IngestersSecretScanStatus) GetNodeName() string {
	if o == nil || isNil(o.NodeName) {
		var ret string
		return ret
	}
	return *o.NodeName
}

// GetNodeNameOk returns a tuple with the NodeName field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *IngestersSecretScanStatus) GetNodeNameOk() (*string, bool) {
	if o == nil || isNil(o.NodeName) {
		return nil, false
	}
	return o.NodeName, true
}

// HasNodeName returns a boolean if a field has been set.
func (o *IngestersSecretScanStatus) HasNodeName() bool {
	if o != nil && !isNil(o.NodeName) {
		return true
	}

	return false
}

// SetNodeName gets a reference to the given string and assigns it to the NodeName field.
func (o *IngestersSecretScanStatus) SetNodeName(v string) {
	o.NodeName = &v
}

// GetNodeType returns the NodeType field value if set, zero value otherwise.
func (o *IngestersSecretScanStatus) GetNodeType() string {
	if o == nil || isNil(o.NodeType) {
		var ret string
		return ret
	}
	return *o.NodeType
}

// GetNodeTypeOk returns a tuple with the NodeType field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *IngestersSecretScanStatus) GetNodeTypeOk() (*string, bool) {
	if o == nil || isNil(o.NodeType) {
		return nil, false
	}
	return o.NodeType, true
}

// HasNodeType returns a boolean if a field has been set.
func (o *IngestersSecretScanStatus) HasNodeType() bool {
	if o != nil && !isNil(o.NodeType) {
		return true
	}

	return false
}

// SetNodeType gets a reference to the given string and assigns it to the NodeType field.
func (o *IngestersSecretScanStatus) SetNodeType(v string) {
	o.NodeType = &v
}

// GetScanId returns the ScanId field value if set, zero value otherwise.
func (o *IngestersSecretScanStatus) GetScanId() string {
	if o == nil || isNil(o.ScanId) {
		var ret string
		return ret
	}
	return *o.ScanId
}

// GetScanIdOk returns a tuple with the ScanId field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *IngestersSecretScanStatus) GetScanIdOk() (*string, bool) {
	if o == nil || isNil(o.ScanId) {
		return nil, false
	}
	return o.ScanId, true
}

// HasScanId returns a boolean if a field has been set.
func (o *IngestersSecretScanStatus) HasScanId() bool {
	if o != nil && !isNil(o.ScanId) {
		return true
	}

	return false
}

// SetScanId gets a reference to the given string and assigns it to the ScanId field.
func (o *IngestersSecretScanStatus) SetScanId(v string) {
	o.ScanId = &v
}

// GetScanStatus returns the ScanStatus field value if set, zero value otherwise.
func (o *IngestersSecretScanStatus) GetScanStatus() string {
	if o == nil || isNil(o.ScanStatus) {
		var ret string
		return ret
	}
	return *o.ScanStatus
}

// GetScanStatusOk returns a tuple with the ScanStatus field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *IngestersSecretScanStatus) GetScanStatusOk() (*string, bool) {
	if o == nil || isNil(o.ScanStatus) {
		return nil, false
	}
	return o.ScanStatus, true
}

// HasScanStatus returns a boolean if a field has been set.
func (o *IngestersSecretScanStatus) HasScanStatus() bool {
	if o != nil && !isNil(o.ScanStatus) {
		return true
	}

	return false
}

// SetScanStatus gets a reference to the given string and assigns it to the ScanStatus field.
func (o *IngestersSecretScanStatus) SetScanStatus(v string) {
	o.ScanStatus = &v
}

func (o IngestersSecretScanStatus) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o IngestersSecretScanStatus) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	if !isNil(o.Timestamp) {
		toSerialize["@timestamp"] = o.Timestamp
	}
	if !isNil(o.ContainerName) {
		toSerialize["container_name"] = o.ContainerName
	}
	if !isNil(o.HostName) {
		toSerialize["host_name"] = o.HostName
	}
	if !isNil(o.KubernetesClusterName) {
		toSerialize["kubernetes_cluster_name"] = o.KubernetesClusterName
	}
	if !isNil(o.Masked) {
		toSerialize["masked"] = o.Masked
	}
	if !isNil(o.NodeId) {
		toSerialize["node_id"] = o.NodeId
	}
	if !isNil(o.NodeName) {
		toSerialize["node_name"] = o.NodeName
	}
	if !isNil(o.NodeType) {
		toSerialize["node_type"] = o.NodeType
	}
	if !isNil(o.ScanId) {
		toSerialize["scan_id"] = o.ScanId
	}
	if !isNil(o.ScanStatus) {
		toSerialize["scan_status"] = o.ScanStatus
	}
	return toSerialize, nil
}

type NullableIngestersSecretScanStatus struct {
	value *IngestersSecretScanStatus
	isSet bool
}

func (v NullableIngestersSecretScanStatus) Get() *IngestersSecretScanStatus {
	return v.value
}

func (v *NullableIngestersSecretScanStatus) Set(val *IngestersSecretScanStatus) {
	v.value = val
	v.isSet = true
}

func (v NullableIngestersSecretScanStatus) IsSet() bool {
	return v.isSet
}

func (v *NullableIngestersSecretScanStatus) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableIngestersSecretScanStatus(val *IngestersSecretScanStatus) *NullableIngestersSecretScanStatus {
	return &NullableIngestersSecretScanStatus{value: val, isSet: true}
}

func (v NullableIngestersSecretScanStatus) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableIngestersSecretScanStatus) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}

