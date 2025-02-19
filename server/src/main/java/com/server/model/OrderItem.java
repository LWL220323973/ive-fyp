package com.server.model;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class OrderItem {
    private int id;
    private int order_id;
    private int dish_id;
    private int quantity;
    private Timestamp created_at;
    private Timestamp updated_at;
}
