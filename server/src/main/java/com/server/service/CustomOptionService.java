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

    public int editCustomOption(CustomOption customOption) {
        return mapper.editCustomOption(customOption);
    }

    public int deleteCustomOption(int id) {
        return mapper.deleteCustomOption(id);
    }

    public int insertCustomOption(CustomOption customOption) {
        return mapper.insertCustomOption(customOption);
    }

    public int getLastCustomOptionID(){
        return mapper.getLastCustomOptionID();
    }
}