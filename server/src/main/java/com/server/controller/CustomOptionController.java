package com.server.controller;


import com.server.model.CustomOption;
import com.server.service.CustomOptionService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomOptionController {

    @Autowired
    private CustomOptionService service;

    @GetMapping("/api/customOption/getAllCustomOptions")
    public List<CustomOption> getAllCustomOptions() {
        return service.getAllCustomOptions();
    }
}