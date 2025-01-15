import axios from "axios";

const baseURL = "http://localhost:8080/api/menu";

export function getDrink(name_zh_HK, name_en_US, name_zh_CN, price, onSale) {
  return axios.post(`${baseURL}/getDrink`, {
    name_zh_HK,
    name_en_US,
    name_zh_CN,
    price,
    onSale,
  });
}

export function getStapleFood(name_zh_HK, name_en_US, name_zh_CN, price, onSale) {
  return axios.post(`${baseURL}/getStapleFood`, {
    name_zh_HK,
    name_en_US,
    name_zh_CN,
    price,
    onSale,
  });
}

export function getColdFood(name_zh_HK, name_en_US, name_zh_CN, price, onSale) {
  return axios.post(`${baseURL}/getColdFood`, {
    name_zh_HK,
    name_en_US,
    name_zh_CN,
    price,
    onSale,
  });
}

export function getSideDish(name_zh_HK, name_en_US, name_zh_CN, price, onSale) {
  return axios.post(`${baseURL}/getSideDish`, {
    name_zh_HK,
    name_en_US,
    name_zh_CN,
    price,
    onSale,
  });
}

export function getSignatureDish(name_zh_HK, name_en_US, name_zh_CN, price, onSale) {
  return axios.post(`${baseURL}/getSignatureDish`, {
    name_zh_HK,
    name_en_US,
    name_zh_CN,
    price,
    onSale,
  });
}

export function getCapsicumAnnuum(name_zh_HK, name_en_US, name_zh_CN, price, onSale) {
  return axios.post(`${baseURL}/getCapsicumAnnuum`, {
    name_zh_HK,
    name_en_US,
    name_zh_CN,
    price,
    onSale,
  });
}

export function getStirFry(name_zh_HK, name_en_US, name_zh_CN, price, onSale) {
  return axios.post(`${baseURL}/getStirFry`, {
    name_zh_HK,
    name_en_US,
    name_zh_CN,
    price,
    onSale,
  });
}