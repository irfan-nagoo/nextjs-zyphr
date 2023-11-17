import fsPromises from 'fs/promises';
import path from 'path';
import jsonData from '../../../data/service-requests.json';
import { StatusType } from '../../../lib/constants/app-constants';

const jsonPath = path.join(process.cwd(), 'data/service-requests.json');

export default async function handler(req, res) {

    console.info(req.method, req.query.query[0]);
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


function getAllServiceRequests(pageNo, pageSize) {
    pageNo = Number(pageNo);
    pageSize = Number(pageSize);
    const result = jsonData.filter(element => element.status !== StatusType.CLOSED)
            .sort( (e1,e2) => new Date(e2.modifiedDate) - new Date(e1.modifiedDate));
    const length = result.length
    const start = (pageNo * pageSize);
    const end = (start + pageSize) > length ? length : (start + pageSize);
    return result.slice(start, end);
}

function getActiveServiceRequestCount() {
    return jsonData.filter(element => element.status !== StatusType.CLOSED).length
}

function getUnassignedServiceRequestCount(q, pageNo, pageSize) {
    return jsonData.filter(element => element.status === StatusType.UNASSIGNED).length
}

function search(q, pageNo, pageSize) {
    pageNo = Number(pageNo);
    pageSize = Number(pageSize);
    const result = jsonData.filter(element => element.status !== StatusType.CLOSED
        && (element.id.search(new RegExp(q, 'i')) !== -1 || element.title.search(new RegExp(q, 'i')) !== -1));
    const length = result.length;
    const start = (pageNo * pageSize);
    const end = (start + pageSize) > length ? length : (start + pageSize);
    return result.slice(start, end);
}

function getServiceRequestById(id) {
    const result = jsonData.filter(element => element.id === id);
    return result;
}

async function saveServiceRequest(request) {
    // generate ID and audit fields
    request.id = 'SR' + Math.floor(Math.random() * 1000);
    request.status = StatusType.UNASSIGNED;
    const date = new Date().toISOString();
    request.createDate = date;
    request.modifiedDate = date;
    jsonData.push(request);
    await fsPromises.writeFile(jsonPath, JSON.stringify(jsonData, undefined, 2));
}