package com.server.model;

public class Admin {
    private String Name_zh_HK;
    private String Name_en;
    private String Name_zh_CN;
    private String onSale;
    private int price;

    public String getName_zh_HK() {
        return Name_zh_HK;
    }

    public void setName_zh_HK(String name_zh_HK) {
        Name_zh_HK = name_zh_HK;
    }

    public String getName_en() {
        return Name_en;
    }

    public void setName_en(String name_en) {
        Name_en = name_en;
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

}
