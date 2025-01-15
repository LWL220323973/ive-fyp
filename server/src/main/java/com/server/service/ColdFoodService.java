package com.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.mapper.ColdFoodMapper;
import com.server.model.ColdFood;

@Service
public class ColdFoodService {

    @Autowired
    private ColdFoodMapper mapper;

    public List<ColdFood> getColdFood(ColdFood coldFood) {
        return mapper.getColdFood(coldFood);
    }
}