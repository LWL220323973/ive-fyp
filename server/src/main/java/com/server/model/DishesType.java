package com.server.model;

import lombok.Data;

@Data
public class DishesType {

    private String id;
    private String name_Zh_HK;
    private String name_Zh_CN;
    private String name_Us_EN;

    @Override
    public String toString() {
        return "DishesType [name_Zh_HK=" + name_Zh_HK + ", name_Zh_CN=" + name_Zh_CN + ", name_Us_En="
                + name_Us_EN + "]";
    }
}
