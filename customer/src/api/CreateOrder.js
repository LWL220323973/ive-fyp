import axios from "axios";

const baseURL = "http://localhost:8080/api/orders";

export function createOrder(orderData) {
  return axios.post(baseURL + "/create", null, {
    params: {
      item_name_zh_HK: orderData.item_name_zh_HK,
      item_name_zh_CN: orderData.item_name_zh_CN,
      item_name_en_US: orderData.item_name_en_US,
      price: orderData.price,
      quantity: orderData.quantity,
      table_name: orderData.table_name
    },
  });
}
