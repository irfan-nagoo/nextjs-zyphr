import { envConfig } from "./config/config";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

// typical GET REST API call to /service-request/list
export function getAllServiceRequests(pageNo, pageSize) {
    const { data, error } = useSWR(`${envConfig.apiServerBaseUrl}/api/service-request/list?pageNo=${pageNo}&pageSize=${pageSize}`, fetcher, {
        refreshInterval: 3000
    });
    if (data) {
        return data.serviceRequests;
    }
}

// typical GET REST API call to /service-request/total-count
export function getActiveServiceRequestCount() {
    const { data, error } = useSWR(`${envConfig.apiServerBaseUrl}/api/service-request/total-count`, fetcher, {
        refreshInterval: 3000
    });
    if (data) {
        return data.count;
    }
}

// typical GET REST API call to /service-request/unassigned-count
export function getUnassignedServiceRequestCount() {
    const { data, error } = useSWR(`${envConfig.apiServerBaseUrl}/api/service-request/unassigned-count`, fetcher,
        {
            refreshInterval: 3000
        });
    if (data) {
        return data.count;
    }
}

// typical GET REST API call to /service-request/search?q='query string'
export function search(q, pageNo, pageSize) {
    const { data, error } = useSWR(`${envConfig.apiServerBaseUrl}/api/service-request/search?q=${q}&pageNo=${pageNo}&pageSize=${pageSize}`, fetcher);
    if (data) {
        return data.serviceRequests;
    }
}

// typical GET REST API call to /service-request/{id}
export async function getServiceRequestById(id) {
    const response = await fetch(`${envConfig.apiServerBaseUrl}/api/service-request/${id}`);
    const finalResponse = await response.json();
    return finalResponse.serviceRequest;
}

// typical POST REST API call to /service-request
export async function saveServiceRequest(request) {
    const response = await fetch(`${envConfig.apiServerBaseUrl}/api/service-request/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    });
    return await response.json();
}

// typical PUT REST API call to /service-request/{id}
export async function updateServiceRequest(id, request) {
    const response = await fetch(`${envConfig.apiServerBaseUrl}/api/service-request/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    });
    return await response.json();
}

// typical PUT REST API call to /service-request/{id}/assign
export async function assignServiceRequest(id, request) {
    const response = await fetch(`${envConfig.apiServerBaseUrl}/api/service-request/${id}/assign`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    });
    return await response.json();
}


// typical PUT REST API call to /service-request/{id}/close
export async function closeServiceRequest(id) {
    const response = await fetch(`${envConfig.apiServerBaseUrl}/api/service-request/${id}/close`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
}