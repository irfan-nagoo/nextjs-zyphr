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
                    return getActiveServiceRequestCount(req, res);
                case 'unassigned-count':
                    return getUnassignedServiceRequestCount(req, res);
                case 'list':
                    return getAllServiceRequests(req, res);
                case 'search':
                    return search(req, res);
                default:
                    return getServiceRequestById(req,res);
            }
        case 'POST':
            return await saveServiceRequest(req, res);
        case 'PUT':
            return await updateServiceRequest(req, res);

    }
    return res.status(200).json({ name: "nextjs" });
}


function getAllServiceRequests(req, res) {
    const pageNo = Number(req.query.pageNo);
    const pageSize = Number(req.query.pageSize);
    const result = jsonData.filter(element => element.status !== StatusType.CLOSED)
        .sort((e1, e2) => new Date(e2.modifiedDate) - new Date(e1.modifiedDate));
    const length = result.length
    const start = (pageNo * pageSize);
    const end = (start + pageSize) > length ? length : (start + pageSize);
    return res.status(200).json({
        code: "OK",
        message: "Request processed Successfully",
        serviceRequests: result.slice(start, end)
    });
}

function getActiveServiceRequestCount(req, res) {
    return res.status(200).json({
        code: "OK",
        message: "Request processed Successfully",
        count: jsonData.filter(element => element.status !== StatusType.CLOSED).length
    }); 
}

function getUnassignedServiceRequestCount(req, res) {
    return res.status(200).json({
        code: "OK",
        message: "Request processed Successfully",
        count: jsonData.filter(element => element.status === StatusType.UNASSIGNED).length
    });
}

function search(req, res) {
    const q = req.query.q;
    const pageNo = Number(req.query.pageNo);
    const pageSize = Number(req.query.pageSize);
    const result = jsonData.filter(element => element.status !== StatusType.CLOSED
        && (element.id.search(new RegExp(q, 'i')) !== -1 || element.title.search(new RegExp(q, 'i')) !== -1));
    const length = result.length;
    const start = (pageNo * pageSize);
    const end = (start + pageSize) > length ? length : (start + pageSize);
    return res.status(200).json({
        code: "OK",
        message: "Request processed Successfully",
        serviceRequests: result.slice(start, end)
    });
}

function getServiceRequestById(req, res) {
    const id = req.query.query[0];
    const result = jsonData.find(element => element.id === id);
    if (result) {
        return res.status(200).json({
            code: "OK",
            message: "Request processed Successfully",
            serviceRequest: result
        });
    } else {
        return res.status(404).json({
            errorCode: "NOT FOUND",
            errorMesage: "Record not found"
        });
    }
}

async function saveServiceRequest(req, res) {
    // generate ID and audit fields
    const request = req.body;
    request.id = 'SR' + Math.floor(Math.random() * 1000);
    request.status = StatusType.UNASSIGNED;
    const date = new Date().toISOString();
    request.createDate = date;
    request.modifiedDate = date;
    jsonData.push(request);
    await fsPromises.writeFile(jsonPath, JSON.stringify(jsonData, undefined, 2));
    return res.status(200).json({
        code: "OK",
        message: "Request processed Successfully"
    });
}


async function updateServiceRequest(req, res) {
    const request = req.body;
    const result = jsonData.find(element => element.id === request.id);
    if (result) {
        result.title = request.title;
        result.description = request.description;
        result.category = request.category;
        result.type = request.type;
        result.userName = request.userName;
        result.modifiedDate = new Date().toISOString();
        await fsPromises.writeFile(jsonPath, JSON.stringify(jsonData, undefined, 2));
        return res.status(404).json({
            code: "OK",
            message: "Request processed Successfully"
        });
    } else {
        return res.status(404).json({
            errorCode: "NOT FOUND",
            errorMesage: "Record not found"
        });
    }
}