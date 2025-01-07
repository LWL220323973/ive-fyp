import axios from "axios";

const baseURL = "http://localhost:8080/api";

// Get all dishes
export function getAllDish() {
  return axios.get(baseURL + "/dishesList");
}