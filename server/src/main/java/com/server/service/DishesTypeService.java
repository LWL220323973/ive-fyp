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
}