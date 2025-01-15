package com.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.mapper.DrinkMapper;
import com.server.model.Drink;

@Service
public class DrinkService {

    @Autowired
    private DrinkMapper drinkMapper;

    public List<Drink> getDrink(String name_zh_HK, String name_en_US, String name_zh_CN, String price, String onSale) {
        return drinkMapper.getDrink(name_zh_HK, name_en_US, name_zh_CN, price, onSale);
    }
}