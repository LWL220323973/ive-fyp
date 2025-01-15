package com.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.mapper.DrinkMapper;
import com.server.model.Drink;

@Service
public class DrinkService {

    @Autowired
    private DrinkMapper mapper;

    public List<Drink> getDrink(Drink drink) {
        return mapper.getDrink(drink);
    }
}