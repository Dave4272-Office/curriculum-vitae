import axios from "axios";

export function AxiosClient() {
    return axios.create({baseURL: "http://localhost:3000/static/data/"});
}