import http from "./httpService";
import { apiUrl } from "../config.json";

const apiDashboardpoint = apiUrl + "/dashboard/info";

export function getInfo() {
  return http.post(apiDashboardpoint);
}

export default {
  getInfo,
};
