package com.server.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.model.DishesType;
import com.server.service.DishesTypeService;

@RestController
public class DishesTypeController {

    @Autowired
    private DishesTypeService service;

    @GetMapping("/api/dishesType/getAllDishesType")
    public List<DishesType> getAllDishesType() {
        return service.getAllDishesType();
    }
}