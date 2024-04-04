import axios from "axios";

export function AxiosClient() {
  return axios.create({ baseURL: `${process.env.PUBLIC_URL}/static/data/` });
}
