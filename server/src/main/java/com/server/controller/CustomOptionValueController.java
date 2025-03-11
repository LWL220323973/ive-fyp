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

    @PostMapping("/api/customOptionValue/deleteCustomOptionValueByCustomOptionID")
    public int deleteCustomOptionValueByCustomOptionID(@RequestBody CustomOptionValue customOptionValue) {
        int result = service.deleteCustomOptionValueByCustomOptionID(customOptionValue);
        if (result > 0) {
            log.info("Custom Option Value [custom_option_id=" + customOptionValue.getCustom_option_id() + "] deleted successfully");
        }
        return result;
    }

    @PostMapping("/api/customOptionValue/addCustomOptionValue")
    public int addCustomOptionValue(@RequestBody CustomOptionValue customOptionValue) {
        try {
            log.info("Adding " + customOptionValue.toString());
            return service.addCustomOptionValue(customOptionValue);
        } catch (Exception e) {
            log.error("Error adding " + customOptionValue.toString(), e);
            return 0;
        }

    }
}
