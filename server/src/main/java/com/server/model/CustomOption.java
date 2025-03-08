package com.server.model;

import lombok.Data;

@Data
public class CustomOption {

    private int id;
    private String name_zh_hk;
    private String name_zh_cn;
    private String name_us_en;

    @Override
    public String toString() {
        return "CustomOption [name_zh_hk=" + name_zh_hk + ", name_zh_cn=" + name_zh_cn + ", name_us_en=" + name_us_en
                + "]";
    }

}
