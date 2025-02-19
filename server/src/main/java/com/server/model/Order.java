package com.server.model;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class Order {
    private int id;
    private int order_status_id;
    private String table_name;
    private Timestamp created_at;
    private Timestamp updated_at;
}
