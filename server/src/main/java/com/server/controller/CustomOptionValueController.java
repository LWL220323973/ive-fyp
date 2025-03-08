package com.server.controller;

import com.server.model.CustomOptionValue;
import com.server.service.CustomOptionValueService;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class CustomOptionValueController {

    @Autowired
    private CustomOptionValueService service;

    @PostMapping("/api/customOptionValue/getCustomOptionValue")
    public List<CustomOptionValue> getCustomOptionsValue(@RequestBody CustomOptionValue customOptionValue) {
        return service.getCustomOptionValue(customOptionValue.getCustom_option_id());
    }
}
