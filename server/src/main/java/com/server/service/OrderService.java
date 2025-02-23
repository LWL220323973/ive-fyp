package com.server.service;

import com.server.mapper.OrderMapper;
import com.server.model.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

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
}