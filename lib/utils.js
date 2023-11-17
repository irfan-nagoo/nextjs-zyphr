import { envConfig } from "./config/config";


// API call to get dashboard headers /dashboard/headers
export async function getDashboardHeaders() {
    const response = await fetch(envConfig.apiServerBaseUrl + '/api/dashboard/headers');
    const finalResponse = await response.json();
    return finalResponse.headers;
}

// API call to get dashboard headers /dashboard/ctegory-type
export async function getCategoryAndType() {
    const response = await fetch(envConfig.apiServerBaseUrl + '/api/dashboard/category-type');
    return await response.json();
}