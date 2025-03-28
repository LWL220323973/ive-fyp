package com.server.mapper;

import com.server.model.Receipt;
import com.server.model.ReceiptOrderItem;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ReceiptMapper {
    
    /**
     * 插入新的收據記錄
     * @param receipt 收據對象
     * @return 受影響的行數
     */
    int insertReceipt(Receipt receipt);
    
    /**
     * 插入收據訂單項目
     * @param receiptOrderItem 收據訂單項目對象
     * @return 受影響的行數
     */
    int insertReceiptOrderItem(ReceiptOrderItem receiptOrderItem);
}
