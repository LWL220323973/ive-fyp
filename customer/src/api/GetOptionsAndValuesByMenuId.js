import axios from "axios";

const baseURL = "http://localhost:8080/api/customOption/getOptionsAndValuesByMenuId";

export function getOptionsAndValuesByMenuId(menuId) {
  return axios.get(baseURL, {
    params: {
      menuId: menuId,
    },
  });
}