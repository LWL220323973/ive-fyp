package com.server.model;

import java.sql.Timestamp;

public class OrderItem {
    private int id;
    private int order_id;
    private int dish_id;
    private int quantity;
    private Timestamp created_at;
    private Timestamp updated_at;

    // Constructors
    public OrderItem() {}

    public OrderItem(int id, int order_id, int dish_id, int quantity, Timestamp created_at, Timestamp updated_at) {
        this.id = id;
        this.order_id = order_id;
        this.dish_id = dish_id;
        this.quantity = quantity;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getorder_id() {
        return order_id;
    }

    public void setorder_id(int order_id) {
        this.order_id = order_id;
    }

    public int getdish_id() {
        return dish_id;
    }

    public void setdish_id(int dish_id) {
        this.dish_id = dish_id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Timestamp getcreated_at() {
        return created_at;
    }

    public void setcreated_at(Timestamp created_at) {
        this.created_at = created_at;
    }

    public Timestamp getupdated_at() {
        return updated_at;
    }

    public void setupdated_at(Timestamp updated_at) {
        this.updated_at = updated_at;
    }
}
