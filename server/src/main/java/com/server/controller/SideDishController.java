package com.server.controller;

import com.server.model.SideDish;
import com.server.service.SideDishService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SideDishController {

    @Autowired
    private SideDishService service;

    @PostMapping("/api/menu/getSideDish")
    public List<SideDish> getSideDish(@RequestBody SideDish sideDish) {
        return service.getSideDish(sideDish);
    }
}