package com.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.mapper.DrinkMapper;

@Service
public class DrinkService {

    @Autowired
    private DrinkMapper drinkMapper;

    
}