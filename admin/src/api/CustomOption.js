import axios from "axios";

const baseURL = "http://localhost:8080/api/customOption";

//Custom Option

export function getAllCustomOption() {
  return axios.get(baseURL + "/getAllCustomOptions");
}

export function editCustomOption(name_us_en, name_zh_hk, name_zh_cn, id) {
  return axios.post(baseURL + "/editCustomOption", {
    name_us_en,
    name_zh_hk,
    name_zh_cn,
    id,
  });
}

export function deleteCustomOption(id) {
  return axios.post(baseURL + "/deleteCustomOption", { id });
}
