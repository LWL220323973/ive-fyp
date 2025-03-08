import axios from "axios";

const baseURL = "http://localhost:8080/api/customOption";

//Custom Option

export function getAllCustomOption() {
  return axios.get(baseURL + "/getAllCustomOptions");
}