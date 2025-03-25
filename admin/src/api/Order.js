import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

/**
 * 獲取所有訂單
 * @returns {Promise} 包含所有訂單的Promise
 */
export const getAllOrders = () => {
  return axios.get(`${BASE_URL}/orders/all`);
};

/**
 * 更新訂單狀態
 * @param {number} orderId 訂單ID
 * @param {number} orderStatusId 新的訂單狀態ID
 * @returns {Promise} 更新操作結果
 */
export const updateOrderStatus = (orderId, orderStatusId) => {
  return axios.post(`${BASE_URL}/orders/update-status`, null, {
    params: {
      orderId,
      orderStatusId,
    },
  });
};

/**
 * 更新單個訂單的桌號
 * @param {number} orderId 訂單ID
 * @param {string} newTableName 新的桌號
 * @returns {Promise} 更新操作結果
 */
export const updateOrderTable = (orderId, newTableName) => {
  return axios.post(`${BASE_URL}/orders/update-table`, null, {
    params: {
      orderId,
      newTableName,
    },
  });
};

/**
 * 更新所有指定桌號的訂單到新桌號 (僅更新狀態為1和2的訂單)
 * @param {string} oldTableName 原桌號
 * @param {string} newTableName 新桌號
 * @returns {Promise} 更新操作結果
 */
export const updateAllOrdersTables = (oldTableName, newTableName) => {
  return axios.post(`${BASE_URL}/orders/update-all-tables`, null, {
    params: {
      oldTableName,
      newTableName,
    },
  });
};

