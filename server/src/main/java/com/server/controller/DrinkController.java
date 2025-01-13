package com.server.controller;

import com.server.model.Drink;
import com.server.service.DrinkService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DrinkController {

    @Autowired
    private DrinkService drinkService;

    @PostMapping("/api/menu/getDrink")
    public List<Drink> getDrink(@RequestBody Drink drink) {
        return drinkService.getDrink(drink);
    }
}