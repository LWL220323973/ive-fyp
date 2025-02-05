package com.server.controller;

import com.server.model.Admin;
import com.server.service.AdminService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminController {

    @Autowired
    private AdminService service;

    @PostMapping("/api/admin/adminLogin")
    public boolean getAdmin(@RequestBody Admin admin) {
        return service.getAdmin(admin.getUsername(), admin.getPassword());
    }

    @PostMapping("/api/admin/findInAdmin")
    public List<Admin> findInAdmin(@RequestBody Admin admin) {
        return service.findInAdmin(admin);
    }
}