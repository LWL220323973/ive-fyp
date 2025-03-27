import axios from "axios";

const baseURL = "http://localhost:8080/api/admin/photoAdmin";

export function uploadPhoto(file) {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(baseURL + "/uploadPhoto", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function cancelUploadPhoto(file) {
  return axios.post(baseURL + "/cancelUploadPhoto",  file );
}
