import axios from "axios";

const baseURL = "http://localhost:8080/api/admin";

// Admin Login
export function login(username, password) {
  return axios.post(baseURL + "/adminLogin", { username, password });
}

// Admin searching
export function findInAdmin(staff_id, name_en, name_cn, email, phone_number) {
  return axios.post(baseURL + "/findInAdmin", {
    staff_id,
    name_en,
    name_cn,
    email,
    phone_number,
  });
}

//Find current admin
export function findCurrentAdmin(username) {
  return axios.post(baseURL + "/findInAdmin", {
    username,
  });
}

// Admin registration
export function registerAdmin(
  name_en,
  name_cn,
  email,
  phone_number,
  userRole
) {
  return axios.post(baseURL + "/registerAdmin", {
    name_en,
    name_cn,
    email,
    phone_number,
    userRole,
  });
}

//Get Latest Admin
export function getLatestAdmin() {
  return axios.post(baseURL + "/getLatestAdmin",{});
}

// Admin updating
export function updateAdmin(
  id,
  staff_id,
  name_en,
  name_cn,
  email,
  phone_number,
) {
  return axios.post(baseURL + "/updateAdmin", {
    id,
    staff_id,
    name_en,
    name_cn,
    email,
    phone_number,
  });
}

//Upload Admin Excel
export function uploadExcel(file) {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(baseURL + "/uploadExcel", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

//Cancel Upload Excel
export function cancelUploadExcel() {
  return axios.post(baseURL + "/cancelUploadExcel");
}

//Submit Admin Excel
export function submitExcel() {
  return axios.post(baseURL + "/submitExcel");
}

//Delete Admin
export function deleteAdmin(record) {
  const {id, staff_id} = record;
  return axios.post(baseURL + "/deleteAdmin", {
    id,
    staff_id
  });
}

//Check old password
export function checkPassword(staff_id, password) {
  return axios.post(baseURL + "/checkPassword", {
    staff_id,
    password,
  });
}

//Change password and pesonal information
export function changePasswordAndInfo(
  id,
  staff_id,
  email,
  phone_number,
  password,
) {
  return axios.post(baseURL + "/updateAdmin", {
    id,
    staff_id,
    email,
    phone_number,
    password,
  });
}