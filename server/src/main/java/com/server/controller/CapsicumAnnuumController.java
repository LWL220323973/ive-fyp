package com.server.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.server.model.CapsicumAnnuum;
import com.server.service.CapsicumAnnuumService;

@RestController
public class CapsicumAnnuumController {

    @Autowired
    private CapsicumAnnuumService service;

    @PostMapping("/api/menu/getCapsicumAnnuum")
    public List<CapsicumAnnuum> getCapsicumAnnuum(@RequestBody CapsicumAnnuum capsicumAnnuum) {
        return service.getCapsicumAnnuum(capsicumAnnuum);
    }
}