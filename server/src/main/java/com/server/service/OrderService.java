package com.server.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.server.mapper.OrderMapper;
import com.server.model.Order;

@Service
public class OrderService {

    @Autowired
    private OrderMapper orderMapper;

    public List<Order> findAllOrders() {
        return orderMapper.findAllOrders();
    }

    public List<Order> findOrdersByTableName(String tableName) {
        return orderMapper.findOrdersByTableName(tableName);
    }
}