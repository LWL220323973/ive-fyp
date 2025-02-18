package com.server.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.server.model.OrderStatus;
import com.server.service.OrderStatusService;

@RestController
@RequestMapping("/api/orderStatus")
public class OrderStatusController {

    @Autowired
    private OrderStatusService orderStatusService;

    @GetMapping("/all")
    public ResponseEntity<List<OrderStatus>> findAllOrderStatus() {
        return ResponseEntity.ok(orderStatusService.findAllOrderStatus());
    }

    @GetMapping
    public ResponseEntity<OrderStatus> getOrderStatusById(@RequestParam("id") Integer id) {
        OrderStatus orderStatus = orderStatusService.getOrderStatusById(id);
        return ResponseEntity.ok(orderStatus);
    }
}