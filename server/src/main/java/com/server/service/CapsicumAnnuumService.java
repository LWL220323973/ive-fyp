package com.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.mapper.CapsicumAnnuumMapper;
import com.server.model.CapsicumAnnuum;

@Service
public class CapsicumAnnuumService {

    @Autowired
    private CapsicumAnnuumMapper mapper;

    public List<CapsicumAnnuum> getCapsicumAnnuum(CapsicumAnnuum drink) {
        return mapper.getCapsicumAnnuum(drink);
    }
}