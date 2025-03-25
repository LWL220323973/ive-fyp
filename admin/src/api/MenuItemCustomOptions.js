import axios from "axios";

const baseURL = "http://localhost:8080/api/menuItemCustomOptions";

// delete menu item custom option by menu item id
export function deleteMenuItemCustomOptionByMenuItemId(menuItemId) {
  return axios.post(baseURL + "/deleteMenuItemCustomOptionByMenuItemId", {
    menuItemId,
  });
}

// delete menu item custom option by custom option id
export function deleteMenuItemCustomOptionByCustomOptionId(customOptionId) {
  return axios.post(baseURL + "/deleteMenuItemCustomOptionByCustomOptionId", {
    customOptionId,
  });
}

//get the menu item custom option by menu item id
export function getMenuItemCustomOptionByMenuItemId(menuItemId) {
  return axios.post(baseURL + "/getMenuItemCustomOptionByMenuItemId", {
    menuItemId,
  });
}

export function insertMenuItemCustomOption(menuId, customOptionId) {
  return axios.post(baseURL + "/insertMenuItemCustomOption", {
    menuId,
    customOptionId,
  });
}
