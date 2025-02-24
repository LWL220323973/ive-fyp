import axios from "axios";

const baseURL = "http://localhost:8080/api/orders";

export function getOrderDetailByTableName(tableName) {
  return axios.get(baseURL + "/table", {
    params: {
      tableName: tableName,
    },
  });
}