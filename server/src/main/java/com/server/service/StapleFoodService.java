package com.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.mapper.StapleFoodMapper;
import com.server.model.StapleFood;


@Service
public class StapleFoodService {

    @Autowired
    private StapleFoodMapper stapleFoodMapper;

    public List<StapleFood> getStapleFood(StapleFood stapleFood) {
        return stapleFoodMapper.getStapleFood(stapleFood);
    }
}