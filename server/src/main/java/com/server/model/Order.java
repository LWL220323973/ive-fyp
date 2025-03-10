package com.server.model;

import java.util.Date;

public class Order {
    private int id;
    private int orderStatusId;
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
    private Date createdAt;
    private Date updatedAt;
    private OrderStatus orderStatus;

    // Getters and setters for all properties
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getOrderStatusId() {
        return orderStatusId;
    }

    public void setOrderStatusId(int orderStatusId) {
        this.orderStatusId = orderStatusId;
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

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public OrderStatus getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
    }
}