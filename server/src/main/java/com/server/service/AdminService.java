package com.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.mapper.AdminMapper;
import com.server.model.Admin;

@Service
public class AdminService {

    @Autowired
    private AdminMapper mapper;

    public Admin getAdmin(String username, String password) {
        return mapper.findAdmin(username, password);
    }
}