package com.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.mapper.StirFryMapper;
import com.server.model.StirFry;

@Service
public class StirFryService {

    @Autowired
    private StirFryMapper mapper;

    public List<StirFry> getStirFry(StirFry striFry) {
        return mapper.getStirFry(striFry);
    }
}