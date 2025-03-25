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
export function getMenuItemCustomOptionByMenuItemId(menu_item_id) {
  return axios.post(baseURL + "/getMenuItemCustomOptionByMenuItemId", {
    menu_item_id,
  });
}

//insert menu item custom option
export function insertMenuItemCustomOption(menu_item_id, custom_option_id) {
  return axios.post(baseURL + "/insertMenuItemCustomOption", {
    menu_item_id,
    custom_option_id,
  });
}
