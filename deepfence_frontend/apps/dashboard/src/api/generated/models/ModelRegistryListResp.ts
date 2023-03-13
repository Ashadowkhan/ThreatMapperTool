/* tslint:disable */
/* eslint-disable */
/**
 * Deepfence ThreatMapper
 * Deepfence Runtime API provides programmatic control over Deepfence microservice securing your container, kubernetes and cloud deployments. The API abstracts away underlying infrastructure details like cloud provider,  container distros, container orchestrator and type of deployment. This is one uniform API to manage and control security alerts, policies and response to alerts for microservices running anywhere i.e. managed pure greenfield container deployments or a mix of containers, VMs and serverless paradigms like AWS Fargate.
 *
 * The version of the OpenAPI document: 2.0.0
 * Contact: community@deepfence.io
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ModelRegistryListResp
 */
export interface ModelRegistryListResp {
    /**
     * 
     * @type {Date}
     * @memberof ModelRegistryListResp
     */
    created_at?: Date;
    /**
     * 
     * @type {number}
     * @memberof ModelRegistryListResp
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ModelRegistryListResp
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof ModelRegistryListResp
     */
    node_id?: string;
    /**
     * 
     * @type {any}
     * @memberof ModelRegistryListResp
     */
    non_secret?: any | null;
    /**
     * 
     * @type {string}
     * @memberof ModelRegistryListResp
     */
    registry_type?: string;
    /**
     * 
     * @type {Date}
     * @memberof ModelRegistryListResp
     */
    updated_at?: Date;
}

/**
 * Check if a given object implements the ModelRegistryListResp interface.
 */
export function instanceOfModelRegistryListResp(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ModelRegistryListRespFromJSON(json: any): ModelRegistryListResp {
    return ModelRegistryListRespFromJSONTyped(json, false);
}

export function ModelRegistryListRespFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelRegistryListResp {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'created_at': !exists(json, 'created_at') ? undefined : (new Date(json['created_at'])),
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'node_id': !exists(json, 'node_id') ? undefined : json['node_id'],
        'non_secret': !exists(json, 'non_secret') ? undefined : json['non_secret'],
        'registry_type': !exists(json, 'registry_type') ? undefined : json['registry_type'],
        'updated_at': !exists(json, 'updated_at') ? undefined : (new Date(json['updated_at'])),
    };
}

export function ModelRegistryListRespToJSON(value?: ModelRegistryListResp | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'created_at': value.created_at === undefined ? undefined : (value.created_at.toISOString()),
        'id': value.id,
        'name': value.name,
        'node_id': value.node_id,
        'non_secret': value.non_secret,
        'registry_type': value.registry_type,
        'updated_at': value.updated_at === undefined ? undefined : (value.updated_at.toISOString()),
    };
}
