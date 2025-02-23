package com.server.model;

public class OrderStatus {
    private int id;
    private String statusEnUS;
    private String statusZhHK;
    private String statusZhCN;

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStatusEnUS() {
        return statusEnUS;
    }

    public void setStatusEnUS(String statusEnUS) {
        this.statusEnUS = statusEnUS;
    }

    public String getStatusZhHK() {
        return statusZhHK;
    }

    public void setStatusZhHK(String statusZhHK) {
        this.statusZhHK = statusZhHK;
    }

    public String getStatusZhCN() {
        return statusZhCN;
    }

    public void setStatusZhCN(String statusZhCN) {
        this.statusZhCN = statusZhCN;
    }
}