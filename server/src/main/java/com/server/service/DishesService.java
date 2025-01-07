package com.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.mapper.DishesMapper;
import com.server.model.Dishes;

@Service
public class DishesService {

    @Autowired
    private DishesMapper dishesMapper;

    public List<Dishes> getAllDishes() {
        return dishesMapper.getAllDishes();
    }
}