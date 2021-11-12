import http from "./httpService";
import { apiUrl } from "../config.json";

const apiComplaintspoint = apiUrl + "/serviceProvider/complaints";

export function getComplaints() {
  return http.post(apiComplaintspoint);
}

const apiResolveEndpoint = apiUrl + "/serviceProvider/resolve";

export function resolveComplaint(complaint_id) {
  const resolve_body = { complaint_id: complaint_id };
  return http.post(apiResolveEndpoint, resolve_body);
}

const apiRequestsEndpoint = apiUrl + "/serviceProvider/requests";

export function getRequests() {
  return http.post(apiRequestsEndpoint);
}

const apiDeclineEndpoint = apiUrl + "/serviceProvider/decline";

export function declineRequest(request_id) {
  const resolve_body = { request_id: request_id };
  return http.post(apiDeclineEndpoint, resolve_body);
}

const apiAcceptEndpoint = apiUrl + "/serviceProvider/accept";

export function acceptRequest(request_id) {
  const resolve_body = { request_id: request_id };
  return http.post(apiAcceptEndpoint, resolve_body);
}

export default {
  getComplaints,
  resolveComplaint,
  getRequests,
  declineRequest,
  acceptRequest,
};
