package com.server.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.server.mapper.OrderStatusMapper;
import com.server.model.OrderStatus;

@Service
public class OrderStatusService {

    @Autowired
    private OrderStatusMapper orderStatusMapper;

    public List<OrderStatus> findAllOrderStatus() {
        return orderStatusMapper.findAllOrderStatus();
    }

    public OrderStatus getOrderStatusById(Integer id) {
        return orderStatusMapper.getOrderStatusById(id);
    }
}