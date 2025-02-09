import axios from "axios";

const baseURL = "http://localhost:8080/api/menu";

export function findInMenu(
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
