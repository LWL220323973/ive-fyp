package com.server.model;

import java.sql.Timestamp;

public class Order {
    private int id;
    private int order_status_id;
    private String table_name;
    private Timestamp created_at;
    private Timestamp updated_at;

    // Constructors
    public Order() {}

    public Order(int id, int order_status_id, String table_name, Timestamp created_at, Timestamp updated_at) {
        this.id = id;
        this.order_status_id = order_status_id;
        this.table_name = table_name;
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

    public int getorder_status_id() {
        return order_status_id;
    }

    public void setorder_status_id(int order_status_id) {
        this.order_status_id = order_status_id;
    }

    public String gettable_name() {
        return table_name;
    }

    public void settable_name(String table_name) {
        this.table_name = table_name;
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
