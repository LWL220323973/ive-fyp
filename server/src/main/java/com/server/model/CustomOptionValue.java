package com.server.model;

import lombok.Data;

@Data
public class CustomOptionValue {
    private int id;
    private int custom_option_id;
    private String value_zh_hk;
    private String value_zh_cn;
    private String value_us_en;
    private double price_adjustment;

    @Override
    public String toString() {
        return "CustomOptionValue [custom_option_id=" + custom_option_id + ", value_zh_hk=" + value_zh_hk + ", value_zh_cn="
                + value_zh_cn + ", value_us_en=" + value_us_en + ", price_adjustment=" + price_adjustment + "]";
    }
}
