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
)

// checks if the ApiDocsBadRequestResponse type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &ApiDocsBadRequestResponse{}

// ApiDocsBadRequestResponse struct for ApiDocsBadRequestResponse
type ApiDocsBadRequestResponse struct {
	ErrorFields map[string]string `json:"error_fields,omitempty"`
	Message *string `json:"message,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// NewApiDocsBadRequestResponse instantiates a new ApiDocsBadRequestResponse object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewApiDocsBadRequestResponse() *ApiDocsBadRequestResponse {
	this := ApiDocsBadRequestResponse{}
	return &this
}

// NewApiDocsBadRequestResponseWithDefaults instantiates a new ApiDocsBadRequestResponse object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewApiDocsBadRequestResponseWithDefaults() *ApiDocsBadRequestResponse {
	this := ApiDocsBadRequestResponse{}
	return &this
}

// GetErrorFields returns the ErrorFields field value if set, zero value otherwise (both if not set or set to explicit null).
func (o *ApiDocsBadRequestResponse) GetErrorFields() map[string]string {
	if o == nil {
		var ret map[string]string
		return ret
	}
	return o.ErrorFields
}

// GetErrorFieldsOk returns a tuple with the ErrorFields field value if set, nil otherwise
// and a boolean to check if the value has been set.
// NOTE: If the value is an explicit nil, `nil, true` will be returned
func (o *ApiDocsBadRequestResponse) GetErrorFieldsOk() (*map[string]string, bool) {
	if o == nil || isNil(o.ErrorFields) {
		return nil, false
	}
	return &o.ErrorFields, true
}

// HasErrorFields returns a boolean if a field has been set.
func (o *ApiDocsBadRequestResponse) HasErrorFields() bool {
	if o != nil && isNil(o.ErrorFields) {
		return true
	}

	return false
}

// SetErrorFields gets a reference to the given map[string]string and assigns it to the ErrorFields field.
func (o *ApiDocsBadRequestResponse) SetErrorFields(v map[string]string) {
	o.ErrorFields = v
}

// GetMessage returns the Message field value if set, zero value otherwise.
func (o *ApiDocsBadRequestResponse) GetMessage() string {
	if o == nil || isNil(o.Message) {
		var ret string
		return ret
	}
	return *o.Message
}

// GetMessageOk returns a tuple with the Message field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *ApiDocsBadRequestResponse) GetMessageOk() (*string, bool) {
	if o == nil || isNil(o.Message) {
		return nil, false
	}
	return o.Message, true
}

// HasMessage returns a boolean if a field has been set.
func (o *ApiDocsBadRequestResponse) HasMessage() bool {
	if o != nil && !isNil(o.Message) {
		return true
	}

	return false
}

// SetMessage gets a reference to the given string and assigns it to the Message field.
func (o *ApiDocsBadRequestResponse) SetMessage(v string) {
	o.Message = &v
}

// GetSuccess returns the Success field value if set, zero value otherwise.
func (o *ApiDocsBadRequestResponse) GetSuccess() bool {
	if o == nil || isNil(o.Success) {
		var ret bool
		return ret
	}
	return *o.Success
}

// GetSuccessOk returns a tuple with the Success field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *ApiDocsBadRequestResponse) GetSuccessOk() (*bool, bool) {
	if o == nil || isNil(o.Success) {
		return nil, false
	}
	return o.Success, true
}

// HasSuccess returns a boolean if a field has been set.
func (o *ApiDocsBadRequestResponse) HasSuccess() bool {
	if o != nil && !isNil(o.Success) {
		return true
	}

	return false
}

// SetSuccess gets a reference to the given bool and assigns it to the Success field.
func (o *ApiDocsBadRequestResponse) SetSuccess(v bool) {
	o.Success = &v
}

func (o ApiDocsBadRequestResponse) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o ApiDocsBadRequestResponse) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	if o.ErrorFields != nil {
		toSerialize["error_fields"] = o.ErrorFields
	}
	if !isNil(o.Message) {
		toSerialize["message"] = o.Message
	}
	if !isNil(o.Success) {
		toSerialize["success"] = o.Success
	}
	return toSerialize, nil
}

type NullableApiDocsBadRequestResponse struct {
	value *ApiDocsBadRequestResponse
	isSet bool
}

func (v NullableApiDocsBadRequestResponse) Get() *ApiDocsBadRequestResponse {
	return v.value
}

func (v *NullableApiDocsBadRequestResponse) Set(val *ApiDocsBadRequestResponse) {
	v.value = val
	v.isSet = true
}

func (v NullableApiDocsBadRequestResponse) IsSet() bool {
	return v.isSet
}

func (v *NullableApiDocsBadRequestResponse) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableApiDocsBadRequestResponse(val *ApiDocsBadRequestResponse) *NullableApiDocsBadRequestResponse {
	return &NullableApiDocsBadRequestResponse{value: val, isSet: true}
}

func (v NullableApiDocsBadRequestResponse) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableApiDocsBadRequestResponse) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}

