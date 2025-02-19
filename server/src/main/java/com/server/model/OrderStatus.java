package com.server.model;

import lombok.Data;

@Data
public class OrderStatus {
    private int id;
    private String status_en_US;
    private String status_zh_HK;
    private String status_zh_CN;
}
