package com.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.mapper.SideDishMapper;
import com.server.model.SideDish;

@Service
public class SideDishService {

    @Autowired
    private SideDishMapper mapper;

    public List<SideDish> getSideDish(SideDish sideDish) {
        return mapper.getSideDish(sideDish);
    }
}