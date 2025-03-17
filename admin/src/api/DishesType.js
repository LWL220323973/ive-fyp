import axios from "axios";

const baseURL = "http://localhost:8080/api/dishesType";

//Dishes Type

export function getDishesType() {
  return axios.get(baseURL + "/getAllDishesType");
}

export function insertDishesType(name_Zh_HK, name_Zh_CN, name_Us_En) {
  return axios.post(baseURL + "/insertDishesType", {
    name_Zh_HK,
    name_Zh_CN,
    name_Us_En,
  });
}

export function updateDishesType(name_Zh_HK, name_Zh_CN, name_Us_En, id) {
  return axios.put(baseURL + "/updateDishesType", {
    name_Zh_HK,
    name_Zh_CN,
    name_Us_En,
    id,
  });
}

export function deleteDishesType(id) {
  return axios.delete(baseURL + "/deleteDishesType", { id });
}
