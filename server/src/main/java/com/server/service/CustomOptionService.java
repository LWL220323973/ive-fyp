package com.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.mapper.CustomOptionMapper;
import com.server.model.CustomOption;

@Service
public class CustomOptionService {

    @Autowired
    private CustomOptionMapper mapper;

    public List<CustomOption> getAllCustomOptions() {
        return mapper.getAllCustomOptions();
    }
}