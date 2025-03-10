package com.server.service;

import com.server.mapper.OrderMapper;
import com.server.model.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrderService {

    private final OrderMapper orderMapper;

    @Autowired
    public OrderService(OrderMapper orderMapper) {
        this.orderMapper = orderMapper;
    }

    public List<Order> getOrderDetailByTableName(String tableName) {
        return orderMapper.getOrderDetailByTableName(tableName);
    }

    public int CreateOrder(String item_name_zh_HK, String item_name_zh_CN, 
                           String item_name_en_US, 
                           String custom_string_zh_HK, String custom_string_zh_CN, String custom_string_en_US,
                           int price, int custom_price, int quantity, String table_name) {
        Map<String, Object> params = new HashMap<>();
        params.put("item_name_zh_HK", item_name_zh_HK);
        params.put("item_name_zh_CN", item_name_zh_CN);
        params.put("item_name_en_US", item_name_en_US);
        params.put("custom_string_zh_HK", custom_string_zh_HK);
        params.put("custom_string_zh_CN", custom_string_zh_CN);
        params.put("custom_string_en_US", custom_string_en_US);
        params.put("price", price);
        params.put("custom_price", custom_price);
        params.put("quantity", quantity);
        params.put("table_name", table_name);
        return orderMapper.CreateOrder(params);
    }
}