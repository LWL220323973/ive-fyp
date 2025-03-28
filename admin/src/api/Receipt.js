import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

/**
 * 創建收據和收據訂單項
 * @param {Object} receipt 收據對象
 * @param {Array} receiptOrderItems 收據訂單項列表
 * @returns {Promise} 創建操作結果
 */
export const createReceiptWithItems = (receipt, receiptOrderItems) => {
  // 確保數據格式與後端 CreateReceiptRequest 類匹配
  const requestData = {
    receipt: receipt,
    orderItems: receiptOrderItems || [] // 確保即使為空也傳送一個空數組
  };
  
  return axios.post(`${BASE_URL}/receipts`, requestData);
};

/**
 * 向現有收據添加訂單項
 * @param {number} receiptId 收據ID
 * @param {Object} receiptOrderItem 收據訂單項
 * @returns {Promise} 創建操作結果
 */
export const addOrderItemToReceipt = (receiptId, receiptOrderItem) => {
  return axios.post(`${BASE_URL}/receipts/${receiptId}/items`, receiptOrderItem);
};

/**
 * 批量向現有收據添加訂單項
 * @param {number} receiptId 收據ID
 * @param {Array} receiptOrderItems 收據訂單項列表
 * @returns {Promise} 創建操作結果
 */
export const addOrderItemsToReceipt = (receiptId, receiptOrderItems) => {
  return axios.post(`${BASE_URL}/receipts/${receiptId}/batch-items`, receiptOrderItems);
};
