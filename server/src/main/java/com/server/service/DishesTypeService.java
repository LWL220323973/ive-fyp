package com.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.mapper.DishesTypeMapper;
import com.server.model.DishesType;

@Service
public class DishesTypeService {

    @Autowired
    private DishesTypeMapper mapper;

    public List<DishesType> getAllDishesType() {
        return mapper.getAllDisheType();
    }

    public int editDishesType(DishesType dishesType) {
        return mapper.editDishesType(dishesType);
    }

    public int deleteDishesType(String id) {
        return mapper.deleteDishesType(id);
    }

    public int insertDishesType(DishesType dishesType) {
        return mapper.insertDishesType(dishesType);
    }
}