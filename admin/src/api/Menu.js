import axios from "axios";

const baseURL = "http://localhost:8080/api/menu";

export function searchInMenu(
  name_zh_HK,
  name_zh_CN,
  name_en_US,
  price,
  onSale,
  type
) {
  return axios.post(baseURL + "/findInMenu", {
    name_zh_HK,
    name_zh_CN,
    name_en_US,
    price,
    onSale,
    type,
  });
}

export function insertMenu(
  name_zh_HK,
  name_zh_CN,
  name_en_US,
  price,
  onSale,
  type,
  path
) {
  return axios.post(baseURL + "/insertMenu", {
    name_zh_HK,
    name_zh_CN,
    name_en_US,
    price,
    onSale,
    type,
    path,
  });
}

export function updateMenu(
  id,
  name_zh_HK,
  name_zh_CN,
  name_en_US,
  price,
  onSale,
  type,
  path
) {
  return axios.post(baseURL + "/updateMenu", {
    id,
    name_zh_HK,
    name_zh_CN,
    name_en_US,
    price,
    onSale,
    type,
    path,
  });
}

export function deleteMenu(id) {
  return axios.post(baseURL + "/deleteMenu", {
    id,
  });
}

export function getLastMenu() {
  return axios.post(baseURL + "/getLastMenu");
}
