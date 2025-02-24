import axios from "axios";

const baseURL = "http://localhost:8080/api/orders";

export function createOrder(item_id, quantity, table_name) {
  return axios.post(baseURL + "/create", null, {
    params: {
      item_id: item_id,
      quantity: quantity,
      table_name: table_name,
    },
  });
}
