import jsonData from '../data/service-requests.json';
import { StatusType } from './constants/app-constants';


// typical REST API call to /service-request/list
export function getAllServiceRequests(pageNo, pageSize) {
    const result = jsonData.filter(element => element.status !== StatusType.CLOSED);
    const length = result.length
    const start = (pageNo * pageSize);
    const end = (start + pageSize) > length ? length : (start + pageSize);
    return result.slice(start, end);
}

// typical REST API call to /service-request/count
export function getActiveServiceRequestCount() {
    return jsonData.filter(element => element.status !== StatusType.CLOSED).length
}

// typical REST API call to /service-request/unassigned-count
export function getUnassignedServiceRequestCount(q, pageNo, pageSize) {
    return jsonData.filter(element => element.status === StatusType.UNASSIGNED).length
}

// typical REST API call to /service-request/search?q='query string'
export function search(q, pageNo, pageSize) {
    const result = jsonData.filter(element => element.status !== StatusType.CLOSED
        && (element.id.search(new RegExp(q, 'i')) !== -1 || element.title.search(new RegExp(q, 'i')) !== -1));
    const length = result.length
    const start = (pageNo * pageSize);
    const end = (start + pageSize) > length ? length : (start + pageSize);
    return result.slice(start, end);
}