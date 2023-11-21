import { envConfig } from "./config/config";


// API call to get dashboard headers /user/list
export async function getUsers() {
    const response = await fetch(`${envConfig.apiServerBaseUrl}/api/user/list`);
    const finalResponse = await response.json();
    return finalResponse.users;
}
