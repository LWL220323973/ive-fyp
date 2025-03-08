package com.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.mapper.CustomOptionValueMapper;
import com.server.model.CustomOptionValue;

@Service
public class CustomOptionValueService {

    @Autowired
    private CustomOptionValueMapper mapper;

    public List<CustomOptionValue> getCustomOptionValue(int custom_option_id) {
        return mapper.getCustomOptionValue(custom_option_id);
    }
}