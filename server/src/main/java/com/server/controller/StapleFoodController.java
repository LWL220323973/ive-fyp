package com.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.server.model.StapleFood;
import com.server.service.StapleFoodService;

@RestController
public class StapleFoodController {

    @Autowired
    private StapleFoodService stapleFoodService;

    @PostMapping("/api/menu/getStapleFood")
    public List<StapleFood> getStapleFood(@RequestBody StapleFood stapleFood) {
        return stapleFoodService.getStapleFood(stapleFood);
    }
}