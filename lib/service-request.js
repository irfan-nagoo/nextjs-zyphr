import { envConfig } from "./config/config";

// typical GET REST API call to /service-request/list
export async function getAllServiceRequests(pageNo, pageSize) {
    const response = await fetch(envConfig.apiServerBaseUrl + '/api/service-request/list?pageNo=' + pageNo + '&pageSize=' + pageSize);
    return await response.json();
}

// typical GET REST API call to /service-request/total-count
export async function getActiveServiceRequestCount() {
    const response = await fetch(envConfig.apiServerBaseUrl + '/api/service-request/total-count');
    const finalResponse = await response.json();
    return finalResponse.count;
}

// typical GET REST API call to /service-request/unassigned-count
export async function getUnassignedServiceRequestCount(q, pageNo, pageSize) {
    const response = await fetch(envConfig.apiServerBaseUrl + '/api/service-request/unassigned-count');
    const finalResponse = await response.json();
    return finalResponse.count;
}

// typical GET REST API call to /service-request/search?q='query string'
export async function search(q, pageNo, pageSize) {
    const response = await fetch(envConfig.apiServerBaseUrl + '/api/service-request/search?q=' + q + '&pageNo=' + pageNo + '&pageSize=' + pageSize);
    return await response.json();
}

// typical GET REST API call to /service-request/{id}
export async function getServiceRequestById(id) {
    const response = await fetch(envConfig.apiServerBaseUrl + '/api/service-request/' + id);
    return await response.json();
}

// typical POST REST API call to /service-request
export async function saveServiceRequest(request) {
    await fetch(envConfig.apiServerBaseUrl + '/api/service-request/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: request
    });
}