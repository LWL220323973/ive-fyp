package com.server.model;

public class Menu {
    private int id;
    private String Name_zh_HK;
    private String Name_zh_CN;
    private String Name_en_US;
    private String onSale;
    private int price;
    private String type;

    // Getters and setters
    public String getName_zh_HK() {
        return Name_zh_HK;
    }

    public void setName_zh_HK(String Name_zh_HK) {
        this.Name_zh_HK = Name_zh_HK;
    }

    public String getName_zh_CN() {
        return Name_zh_CN;
    }

    public void setName_zh_CN(String Name_zh_CN) {
        this.Name_zh_CN = Name_zh_CN;
    }

    public String getName_en_US() {
        return Name_en_US;
    }

    public void setName_en_US(String Name_en_US) {
        this.Name_en_US = Name_en_US;
    }

    public String getOnSale() {
        return onSale;
    }

    public void setOnSale(String onSale) {
        this.onSale = onSale;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}