import jsonData from '../data/service-requests.json'


// typical REST API call to /service-request/list
export function getAllServiceRequests(pageNo, pageSize) {
    const length = jsonData.length
    const start = (pageNo * pageSize);
    const end = (start + pageSize) > length ? length : (start + pageSize);
    return jsonData.slice(start, end);
} 