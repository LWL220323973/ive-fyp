import axios from "axios";

const baseURL = "http://localhost:8080/api/dishesType";

//Dishes Type

export function getDishesType() {
  return axios.get(baseURL + "/getAllDishesType");
}
