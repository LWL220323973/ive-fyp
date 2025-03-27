import axios from "axios";

const baseURL = "http://localhost:8080/api/menuItemCustomOptions";

// delete menu item custom option by menu item id
export function deleteMenuItemCustomOptionByMenuItemId(menu_item_id) {
  return axios.post(baseURL + "/deleteMenuItemCustomOptionByMenuItemId", {
    menu_item_id,
  });
}

// delete menu item custom option by custom option id
export function deleteMenuItemCustomOptionByCustomOptionId(custom_option_id) {
  return axios.post(baseURL + "/deleteMenuItemCustomOptionByCustomOptionId", {
    custom_option_id,
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
