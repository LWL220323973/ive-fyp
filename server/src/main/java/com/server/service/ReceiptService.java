package com.server.service;

import com.server.mapper.ReceiptMapper;
import com.server.model.Receipt;
import com.server.model.ReceiptOrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;

@Service
public class ReceiptService {
    
    private final ReceiptMapper receiptMapper;
    
    @Autowired
    public ReceiptService(ReceiptMapper receiptMapper) {
        this.receiptMapper = receiptMapper;
    }
    
    /**
     * 創建新收據及其訂單項目
     * 
     * @param receipt 收據對象
     * @param orderItems 訂單項目列表
     * @return 新創建的收據ID
     */
    @Transactional
    public int createReceipt(Receipt receipt, List<ReceiptOrderItem> orderItems) {
        // 如果沒有設置創建時間，設置為當前時間
        if (receipt.getCreatedAt() == null) {
            receipt.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        }
        
        // 插入收據並獲取生成的ID
        receiptMapper.insertReceipt(receipt);
        int receiptId = receipt.getId();
        
        // 插入每個訂單項
        if (orderItems != null && !orderItems.isEmpty()) {
            for (ReceiptOrderItem item : orderItems) {
                item.setReceiptId(receiptId);
                receiptMapper.insertReceiptOrderItem(item);
            }
        }
        
        return receiptId;
    }
    
    /**
     * 添加新的訂單項到現有收據
     * 
     * @param receiptId 收據ID
     * @param orderItem 訂單項目
     * @return 新創建的訂單項ID
     */
    @Transactional
    public int addOrderItemToReceipt(int receiptId, ReceiptOrderItem orderItem) {
        orderItem.setReceiptId(receiptId);
        receiptMapper.insertReceiptOrderItem(orderItem);
        return orderItem.getId();
    }
    
    /**
     * 批量添加訂單項到現有收據
     * 
     * @param receiptId 收據ID
     * @param orderItems 訂單項目列表
     */
    @Transactional
    public void addOrderItemsToReceipt(int receiptId, List<ReceiptOrderItem> orderItems) {
        if (orderItems != null && !orderItems.isEmpty()) {
            for (ReceiptOrderItem item : orderItems) {
                item.setReceiptId(receiptId);
                receiptMapper.insertReceiptOrderItem(item);
            }
        }
    }
}
