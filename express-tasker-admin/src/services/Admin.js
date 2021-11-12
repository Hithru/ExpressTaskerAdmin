import http from "./httpService";
import { apiUrl } from "../config.json";

const apiRegisterEndpoint = apiUrl + "/admin/signup";

export function register(user) {
  return http.post(apiRegisterEndpoint, {
    email: user.email,
    password: user.password,
    username: user.username,
  });
}

const apiAdminspoint = apiUrl + "/admin/admins";

export function getAdmins() {
  return http.post(apiAdminspoint);
}

export default {
  register,
  getAdmins,
};
