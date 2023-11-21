import { envConfig } from "./config/config";

// typical GET REST API call to /service-request/list
export async function getAllServiceRequests(pageNo, pageSize) {
    const response = await fetch(`${envConfig.apiServerBaseUrl}/api/service-request/list?pageNo=${pageNo}&pageSize=${pageSize}`);
    const finalResponse =  await response.json()
    return finalResponse.serviceRequests;
}

// typical GET REST API call to /service-request/total-count
export async function getActiveServiceRequestCount() {
    const response = await fetch(`${envConfig.apiServerBaseUrl}/api/service-request/total-count`);
    const finalResponse = await response.json();
    return finalResponse.count;
}

// typical GET REST API call to /service-request/unassigned-count
export async function getUnassignedServiceRequestCount() {
    const response = await fetch(`${envConfig.apiServerBaseUrl}/api/service-request/unassigned-count`);
    const finalResponse = await response.json();
    return finalResponse.count;
}

// typical GET REST API call to /service-request/search?q='query string'
export async function search(q, pageNo, pageSize) {
    const response = await fetch(`${envConfig.apiServerBaseUrl}/api/service-request/search?q=${q}&pageNo=${pageNo}&pageSize=${pageSize}`);
    const finalResponse =  await response.json()
    return finalResponse.serviceRequests;
}

// typical GET REST API call to /service-request/{id}
export async function getServiceRequestById(id) {
    const response = await fetch(`${envConfig.apiServerBaseUrl}/api/service-request/${id}`);
    const finalResponse =  await response.json()
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
    return response;
}

// typical PUT REST API call to /service-request/{id}
export async function updateServiceRequest(request) {
    const response = await fetch(`${envConfig.apiServerBaseUrl}/api/service-request/${request.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    });
    return response;
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
    return response;
}


// typical PUT REST API call to /service-request/{id}/close
export async function closeServiceRequest(id) {
    const response = await fetch(`${envConfig.apiServerBaseUrl}/api/service-request/${id}/close`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}