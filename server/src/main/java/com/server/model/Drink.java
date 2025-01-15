package com.server.model;

public class Drink {
    private String Name_zh_HK;
    private String Name_en_US;
    private String Name_zh_CN;
    private String onSale;
    private int price;
    private String path;

    public String getName_zh_HK() {
        return Name_zh_HK;
    }

    public void setName_zh_HK(String name_zh_HK) {
        Name_zh_HK = name_zh_HK;
    }

    public String getName_en_US() {
        return Name_en_US;
    }

    public void setName_en_US(String name_en_US) {
        Name_en_US = name_en_US;
    }

    public String getName_zh_CN() {
        return Name_zh_CN;
    }

    public void setName_zh_CN(String name_zh_CN) {
        Name_zh_CN = name_zh_CN;
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

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

}
