package com.server.model;

import lombok.Data;

@Data
public class Menu {
    private int id;
    private String Name_zh_HK;
    private String Name_zh_CN;
    private String Name_en_US;
    private String onSale;
    private int price;
    private int type;
    private String path;
}