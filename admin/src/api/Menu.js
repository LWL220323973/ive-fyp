import axios from "axios";

const baseURL = "http://localhost:8080/api/menu";

export function getDrink(name, price, onSale) {
  return axios.post(`${baseURL}/getDrink`, { name, price, onSale });
}
