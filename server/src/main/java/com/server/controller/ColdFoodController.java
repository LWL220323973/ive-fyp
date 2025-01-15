package com.server.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.server.model.ColdFood;
import com.server.service.ColdFoodService;

@RestController
public class ColdFoodController {

    @Autowired
    private ColdFoodService service;

    @PostMapping("/api/menu/getColdFood")
    public List<ColdFood> getColdFood(@RequestBody ColdFood coldFood) {
        return service.getColdFood(coldFood);
    }
}