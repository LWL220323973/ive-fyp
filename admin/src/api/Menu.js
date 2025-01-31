import axios from "axios";

const baseURL = "http://localhost:8080/api/menu";

export function findInMenu(
  Name_zh_HK,
  Name_zh_CN,
  Name_en_US,
  price,
  onSale,
  type
) {
  return axios.post(baseURL + "/findInMenu", {
    Name_zh_HK,
    Name_zh_CN,
    Name_en_US,
    price,
    onSale,
    type,
  });
}
