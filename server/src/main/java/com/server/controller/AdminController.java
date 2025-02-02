package com.server.controller;

import com.server.model.Admin;
import com.server.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminController {

    @Autowired
    private AdminService service;

    @PostMapping("/api/adminLogin")
    public boolean getAdmin(@RequestBody Admin admin) {
        return service.getAdmin(admin.getUsername(), admin.getPassword());
    }
}