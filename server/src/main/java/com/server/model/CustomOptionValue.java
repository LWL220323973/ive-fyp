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
}
