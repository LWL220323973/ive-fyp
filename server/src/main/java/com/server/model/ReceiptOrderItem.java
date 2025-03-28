package com.server.model;

public class ReceiptOrderItem {
    private int id;
    private int receiptId;
    private String itemNameZhHK;
    private String itemNameZhCN;
    private String itemNameEnUS;
    private String customStringZhHK;
    private String customStringZhCN;
    private String customStringEnUS;
    private int price;
    private int customPrice;
    private int quantity;
    private String tableName;
    
    public ReceiptOrderItem() {
    }
    
    public ReceiptOrderItem(int id, int receiptId, String itemNameZhHK, String itemNameZhCN, String itemNameEnUS,
                             String customStringZhHK, String customStringZhCN, String customStringEnUS, 
                             int price, int customPrice, int quantity, String tableName) {
        this.id = id;
        this.receiptId = receiptId;
        this.itemNameZhHK = itemNameZhHK;
        this.itemNameZhCN = itemNameZhCN;
        this.itemNameEnUS = itemNameEnUS;
        this.customStringZhHK = customStringZhHK;
        this.customStringZhCN = customStringZhCN;
        this.customStringEnUS = customStringEnUS;
        this.price = price;
        this.customPrice = customPrice;
        this.quantity = quantity;
        this.tableName = tableName;
    }
    
    // Getter 和 Setter 方法
    public int getId() {
        return id;
    }
    
    public void setId(int id) {
        this.id = id;
    }
    
    public int getReceiptId() {
        return receiptId;
    }
    
    public void setReceiptId(int receiptId) {
        this.receiptId = receiptId;
    }
    
    public String getItemNameZhHK() {
        return itemNameZhHK;
    }
    
    public void setItemNameZhHK(String itemNameZhHK) {
        this.itemNameZhHK = itemNameZhHK;
    }
    
    public String getItemNameZhCN() {
        return itemNameZhCN;
    }
    
    public void setItemNameZhCN(String itemNameZhCN) {
        this.itemNameZhCN = itemNameZhCN;
    }
    
    public String getItemNameEnUS() {
        return itemNameEnUS;
    }
    
    public void setItemNameEnUS(String itemNameEnUS) {
        this.itemNameEnUS = itemNameEnUS;
    }
    
    public String getCustomStringZhHK() {
        return customStringZhHK;
    }
    
    public void setCustomStringZhHK(String customStringZhHK) {
        this.customStringZhHK = customStringZhHK;
    }
    
    public String getCustomStringZhCN() {
        return customStringZhCN;
    }
    
    public void setCustomStringZhCN(String customStringZhCN) {
        this.customStringZhCN = customStringZhCN;
    }
    
    public String getCustomStringEnUS() {
        return customStringEnUS;
    }
    
    public void setCustomStringEnUS(String customStringEnUS) {
        this.customStringEnUS = customStringEnUS;
    }
    
    public int getPrice() {
        return price;
    }
    
    public void setPrice(int price) {
        this.price = price;
    }
    
    public int getCustomPrice() {
        return customPrice;
    }
    
    public void setCustomPrice(int customPrice) {
        this.customPrice = customPrice;
    }
    
    public int getQuantity() {
        return quantity;
    }
    
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    
    public String getTableName() {
        return tableName;
    }
    
    public void setTableName(String tableName) {
        this.tableName = tableName;
    }
}
