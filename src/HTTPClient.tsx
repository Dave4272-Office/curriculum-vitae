import axios from "axios";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function AxiosClient() {
  return axios.create({ baseURL: `${basePath}/static/data/` });
}
