import useSWR from "swr";
import { envConfig } from "./config/config";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

// API call to get dashboard headers /user/list
export function getUsers() {
    const { data, error } = useSWR(`${envConfig.apiServerBaseUrl}/api/user/list`, fetcher);
    if (data) {
        return data.users;
    }
}
