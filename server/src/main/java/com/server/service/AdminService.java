package com.server.service;

import java.util.List;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.mapper.AdminMapper;
import com.server.model.Admin;

@Service
public class AdminService {

    @Autowired
    private AdminMapper mapper;

    //Login
    public Boolean getAdmin(String username, String password) {
        List<Admin> account = mapper.getAdmin(username, password);
        if (account.size() == 0) {
            return false;
        }
        for (Admin admin : account) {
            if (BCrypt.checkpw(password, admin.getPassword())) {
                return true;
            }
        }
        return false;
    }

    //User searching
    public List<Admin> findInAdmin(Admin admin) {
        return mapper.findAdmin(admin);
    }

}