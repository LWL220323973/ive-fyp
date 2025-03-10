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
    public int CreateOrder(
            @RequestParam String item_name_zh_HK,
            @RequestParam String item_name_zh_CN, 
            @RequestParam String item_name_en_US,
            @RequestParam(required = false) String custom_string_zh_HK,
            @RequestParam(required = false) String custom_string_zh_CN,
            @RequestParam(required = false) String custom_string_en_US,
            @RequestParam int price,
            @RequestParam(defaultValue = "0") int custom_price,
            @RequestParam int quantity, 
            @RequestParam String table_name) {
        return orderService.CreateOrder(item_name_zh_HK, item_name_zh_CN, item_name_en_US, 
                                      custom_string_zh_HK, custom_string_zh_CN, custom_string_en_US,
                                      price, custom_price, quantity, table_name);
    }
}