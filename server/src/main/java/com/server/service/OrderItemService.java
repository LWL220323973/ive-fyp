package com.server.service;

import com.server.mapper.OrderItemMapper;
import com.server.model.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderItemService {
    
    private final OrderItemMapper orderItemMapper;

    @Autowired
    public OrderItemService(OrderItemMapper orderItemMapper) {
        this.orderItemMapper = orderItemMapper;
    }

    public List<OrderItem> getOrderItemsByOrderId(Long orderId) {
        return orderItemMapper.findOrderItemsByOrderId(orderId);
    }

    public List<OrderItem> getAllOrderItems() {
        return orderItemMapper.getAllOrderItems();
    }
}