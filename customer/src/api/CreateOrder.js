import axios from "axios";

const baseURL = "http://localhost:8080/api/orders";

export function createOrder(orderData) {
  return axios.post(baseURL + "/create", null, {
    params: {
      item_name_zh_HK: orderData.item_name_zh_HK,
      item_name_zh_CN: orderData.item_name_zh_CN,
      item_name_en_US: orderData.item_name_en_US,
      custom_string_zh_HK: orderData.custom_string_zh_HK || "", // 默認為空字符串
      custom_string_zh_CN: orderData.custom_string_zh_CN || "", // 默認為空字符串
      custom_string_en_US: orderData.custom_string_en_US || "", // 默認為空字符串
      price: orderData.price,
      custom_price: orderData.custom_price || 0, // 默認為 0
      quantity: orderData.quantity,
      table_name: orderData.table_name
    },
  });
}