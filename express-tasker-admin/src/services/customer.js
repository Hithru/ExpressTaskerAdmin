import http from "./httpService";
import { apiUrl } from "../config.json";

const apiComplaintspoint = apiUrl + "/customer/complaints";

export function getComplaints() {
  return http.post(apiComplaintspoint);
}

const apiResolveEndpoint = apiUrl + "/customer/resolve";

export function resolveComplaint(complaint_id) {
  const resolve_body = { complaint_id: complaint_id };
  return http.post(apiResolveEndpoint, resolve_body);
}

export default {
  getComplaints,
  resolveComplaint,
};
