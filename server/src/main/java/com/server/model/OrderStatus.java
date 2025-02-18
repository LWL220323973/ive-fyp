package com.server.model;

public class OrderStatus {
    private int id;
    private String status_en_US;
    private String status_zh_HK;
    private String status_zh_CN;

    // Constructors
    public OrderStatus() {}

    public OrderStatus(int id, String status_en_US, String status_zh_HK, String status_zh_CN) {
        this.id = id;
        this.status_en_US = status_en_US;
        this.status_zh_HK = status_zh_HK;
        this.status_zh_CN = status_zh_CN;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getstatus_en_US() {
        return status_en_US;
    }

    public void setstatus_en_US(String status_en_US) {
        this.status_en_US = status_en_US;
    }

    public String getstatus_zh_HK() {
        return status_zh_HK;
    }

    public void setstatus_zh_HK(String status_zh_HK) {
        this.status_zh_HK = status_zh_HK;
    }

    public String getstatus_zh_CN() {
        return status_zh_CN;
    }

    public void setstatus_zh_CN(String status_zh_CN) {
        this.status_zh_CN = status_zh_CN;
    }
}
