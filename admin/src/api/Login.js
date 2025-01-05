import axios from "axios";

const baseURL = "http://localhost:8080/api";

//Admin Login

export function login(username, password) {
  return axios.post(baseURL + "/adminLogin", { username, password });
}
