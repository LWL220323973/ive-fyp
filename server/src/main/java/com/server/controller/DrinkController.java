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
        System.out.println("DrinkController: getDrink");
        return drinkService.getDrink(drink.getName_zh_HK(), drink.getName_en_US(), drink.getName_zh_CN(),
                String.valueOf(drink.getPrice()), drink.getOnSale());
    }
}