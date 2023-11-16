import fsPromises from 'fs/promises';
import path from 'path';
import jsonData from '../../../data/service-requests.json';
import { StatusType } from '../../../lib/constants/app-constants';

const jsonPath = path.join(process.cwd(), 'data/service-requests.json');

export default async function handler(req, res) {

    console.info(req.query.query[0]);
    switch (req.method) {

        case 'GET':
            switch (req.query.query[0]) {
                case 'total-count':
                    return res.status(200).json({ count: getActiveServiceRequestCount() });
                case 'unassigned-count':
                    return res.status(200).json({ count: getUnassignedServiceRequestCount() });
                case 'list':
                    return res.status(200).json(getAllServiceRequests(req.query.pageNo, req.query.pageSize));
                case 'search':
                    return res.status(200).json(search(req.query.q, req.query.pageNo, req.query.pageSize));
                default:
                    return res.status(200).json(getServiceRequestById(req.query.query[0]));
            }
            break;
        case 'POST':
            await saveServiceRequest(req.body);
            break;
        case 'PUT':

    }
    return res.status(200).json({ name: "nextjs" });
}


export function getAllServiceRequests(pageNo, pageSize) {
    const result = jsonData.filter(element => element.status !== StatusType.CLOSED);
    const length = result.length
    const start = (pageNo * pageSize);
    const end = (start + pageSize) > length ? length : (start + pageSize);
    return result.slice(start, end);
}

export function getActiveServiceRequestCount() {
    return jsonData.filter(element => element.status !== StatusType.CLOSED).length
}

export function getUnassignedServiceRequestCount(q, pageNo, pageSize) {
    return jsonData.filter(element => element.status === StatusType.UNASSIGNED).length
}

export function search(q, pageNo, pageSize) {
    const result = jsonData.filter(element => element.status !== StatusType.CLOSED
        && (element.id.search(new RegExp(q, 'i')) !== -1 || element.title.search(new RegExp(q, 'i')) !== -1));
    const length = result.length
    const start = (pageNo * pageSize);
    const end = (start + pageSize) > length ? length : (start + pageSize);
    return result.slice(start, end);
}

// typical GET REST API call to /service-request/{id}
export function getServiceRequestById(id) {
    const result = jsonData.filter(element => element.id === id);
    return result;
}

// typical POST REST API call to /service-request
export async function saveServiceRequest(request) {
    // generate ID and audit fields
    request.id = 'SR' + Math.floor(Math.random() * 1000);
    request.status = StatusType.UNASSIGNED;
    const date = new Date().toISOString();
    request.createDate = date;
    request.modifiedDate = date;
    jsonData.push(request);
    await fsPromises.writeFile(jsonPath, JSON.stringify(jsonData, undefined, 2));
}