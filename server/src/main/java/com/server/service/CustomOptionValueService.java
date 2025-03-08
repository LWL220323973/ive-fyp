package com.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.mapper.CustomOptionValueMapper;
import com.server.model.CustomOptionValue;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CustomOptionValueService {

    @Autowired
    private CustomOptionValueMapper mapper;

    public List<CustomOptionValue> getCustomOptionValue(int custom_option_id) {
        return mapper.getCustomOptionValue(custom_option_id);
    }

    public int deleteCustomOptionValueByCustomOptionID(CustomOptionValue customOptionValue) {
        return mapper.deleteCustomOptionValueByCustomOptionID(customOptionValue.getCustom_option_id());
    }

    public int addCustomOptionValue(CustomOptionValue customOptionValue) {
        return mapper.addCustomOptionValue(customOptionValue);
    }
}
