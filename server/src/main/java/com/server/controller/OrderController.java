package com.server.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.server.model.Order;
import com.server.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.findAllOrders();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/table")
    public ResponseEntity<List<Order>> getOrdersByTableName(@RequestParam("tablename") String tableName) {
        List<Order> orders = orderService.findOrdersByTableName(tableName);
        return ResponseEntity.ok(orders);
    }
}