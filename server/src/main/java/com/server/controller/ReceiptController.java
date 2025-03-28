package com.server.controller;

import com.server.model.Receipt;
import com.server.model.ReceiptOrderItem;
import com.server.service.ReceiptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/receipts")
public class ReceiptController {

    private final ReceiptService receiptService;

    @Autowired
    public ReceiptController(ReceiptService receiptService) {
        this.receiptService = receiptService;
    }

    /**
     * 創建新的收據
     * 
     * @param request 包含收據和訂單項的請求體
     * @return 帶有新創建收據ID的響應
     */
    @PostMapping
    public ResponseEntity<Map<String, Object>> createReceipt(@RequestBody CreateReceiptRequest request) {
        try {
            int receiptId = receiptService.createReceipt(request.getReceipt(), request.getOrderItems());
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "收據創建成功");
            response.put("receiptId", receiptId);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "收據創建失敗: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * 添加訂單項到現有收據
     * 
     * @param receiptId 收據ID
     * @param orderItem 訂單項
     * @return 帶有操作結果的響應
     */
    @PostMapping("/{receiptId}/items")
    public ResponseEntity<Map<String, Object>> addOrderItem(
            @PathVariable int receiptId,
            @RequestBody ReceiptOrderItem orderItem) {
        try {
            int orderItemId = receiptService.addOrderItemToReceipt(receiptId, orderItem);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "訂單項添加成功");
            response.put("orderItemId", orderItemId);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "訂單項添加失敗: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * 批量添加訂單項到現有收據
     * 
     * @param receiptId 收據ID
     * @param orderItems 訂單項列表
     * @return 帶有操作結果的響應
     */
    @PostMapping("/{receiptId}/batch-items")
    public ResponseEntity<Map<String, Object>> addOrderItems(
            @PathVariable int receiptId,
            @RequestBody List<ReceiptOrderItem> orderItems) {
        try {
            receiptService.addOrderItemsToReceipt(receiptId, orderItems);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "批量訂單項添加成功");
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "批量訂單項添加失敗: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * 創建收據的請求體類
     */
    public static class CreateReceiptRequest {
        private Receipt receipt;
        private List<ReceiptOrderItem> orderItems;

        public Receipt getReceipt() {
            return receipt;
        }

        public void setReceipt(Receipt receipt) {
            this.receipt = receipt;
        }

        public List<ReceiptOrderItem> getOrderItems() {
            return orderItems != null ? orderItems : Collections.emptyList();
        }

        public void setOrderItems(List<ReceiptOrderItem> orderItems) {
            this.orderItems = orderItems;
        }
    }
}
