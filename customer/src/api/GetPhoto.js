import axios from "axios";

const baseURL = "http://localhost:8080/api/photo";

export function getPhoto(imagePath) {
  return axios.get(`${baseURL}/${imagePath}`, {
    responseType: 'blob'
  });
}
