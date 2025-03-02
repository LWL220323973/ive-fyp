import axios from "axios";

const baseURL = "http://localhost:8080/api/systemsProfile";

export function getSystemsProfile() {
  return axios.get(`${baseURL}`);
}
