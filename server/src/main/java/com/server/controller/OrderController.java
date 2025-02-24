package com.server.controller;

import com.server.model.Order;
import com.server.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("api")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("orders/table")
    public List<Order> getOrderDetailByTableName(@RequestParam String tableName) {
        return orderService.getOrderDetailByTableName(tableName);
    }

    @PostMapping("orders/create")
    public int CreateOrder(@RequestParam int item_id, @RequestParam int quantity, @RequestParam String table_name) {
        return orderService.CreateOrder(item_id, quantity, table_name);
    }
}