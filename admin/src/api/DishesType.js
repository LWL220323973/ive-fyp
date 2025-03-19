import axios from "axios";

const baseURL = "http://localhost:8080/api/dishesType";

//Dishes Type

export function getDishesType() {
  return axios.get(baseURL + "/getAllDishesType");
}

export function insertDishesType(name_Zh_HK, name_Zh_CN, name_Us_EN) {
  return axios.post(baseURL + "/insertDishesType", {
    name_Zh_HK,
    name_Zh_CN,
    name_Us_EN,
  });
}

export function editDishesType(name_Zh_HK, name_Zh_CN, name_Us_EN, id) {
  return axios.post(baseURL + "/editDishesType", {
    name_Zh_HK,
    name_Zh_CN,
    name_Us_EN,
    id,
  });
}

export function deleteDishesType(id) {
  return axios.post(baseURL + "/deleteDishesType", { id });
}
