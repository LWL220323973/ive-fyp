package com.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.server.model.StirFry;
import com.server.service.StirFryService;

@RestController
public class StirFryController {

    @Autowired
    private StirFryService stapleFoodService;

    @PostMapping("/api/menu/getStirFry")
    public List<StirFry> getStirFry(@RequestBody StirFry striFry) {
        return stapleFoodService.getStirFry(striFry);
    }
}