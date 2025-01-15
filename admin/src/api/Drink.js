import axios from "axios";

const baseURL = "http://localhost:8080/api/menu";

export function getDrink(name_zh_HK, name_en_US, name_zh_CN, price, onSale) {
  return axios.post(`${baseURL}/getDrink`, {
    name_zh_HK,
    name_en_US,
    name_zh_CN,
    price,
    onSale,
  });
}
