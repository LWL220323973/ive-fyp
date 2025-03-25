import axios from "axios";

const baseURL = "http://localhost:8080/api/systemsProfile";

export function getSystemsProfile() {
  return axios.get(`${baseURL}`);
}

export function updateRestaurantName(restaurantNames) {
  return axios.put(`${baseURL}/updateRestaurantName`, restaurantNames);
}

export function updateSystemSettings(systemSettings) {
  return axios.put(`${baseURL}/updateSystemSettings`, systemSettings);
}
