import axios from "axios";

const baseURL = "http://localhost:8080/api/admin";

// Admin Login
export function login(username, password) {
  return axios.post(baseURL + "/adminLogin", { username, password });
}

// Admin searching
export function findInAdmin(staff_id, name_en, name_cn, email, phone_number) {
  return axios.post(baseURL + "/findInAdmin", {
    staff_id,
    name_en,
    name_cn,
    email,
    phone_number,
  });
}