package com.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.server.model.CustomOption;
import com.server.service.CustomOptionService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class CustomOptionController {

    @Autowired
    private CustomOptionService service;

    @GetMapping("/api/customOption/getAllCustomOptions")
    public List<CustomOption> getAllCustomOptions() {
        return service.getAllCustomOptions();
    }

    @PostMapping("/api/customOption/editCustomOption")
    public int editCustomOption(@RequestBody CustomOption customOption) {
        try {
            log.info("Editing Custom Option (" + customOption.getId() + ") " + customOption.toString());
            int result = service.editCustomOption(customOption);
            if (result == 1) {
                log.info("Custom Option (" + customOption.getId() + ") edited successfully");
            }
            return result;
        } catch (Exception e) {
            log.error("Error editing Custom Option (" + customOption.getId() + ") " + customOption.toString(), e);
            return 0;
        }
    }

    @PostMapping("/api/customOption/deleteCustomOption")
    public int deleteCustomOption(@RequestBody CustomOption customOption) {
        log.info("Deleting Custom Option (" + customOption.getId() + ") " + customOption.toString());
        int result = service.deleteCustomOption(customOption.getId());
        if (result == 1) {
            log.info("Custom Option (" + customOption.getId() + ") deleted successfully");
        }
        return result;
    }

    @PostMapping("/api/customOption/insertCustomOption")
    public int insertCustomOption(@RequestBody CustomOption customOption) {
        try {
            log.info("Inserting Custom Option " + customOption.toString());
            return service.insertCustomOption(customOption);
        } catch (Exception e) {
            log.error("Error inserting Custom Option " + customOption.toString(), e);
            return 0;
        }
    }

    @GetMapping("/api/customOption/getLastCustomOptionID")
    public int getLastCustomOptionID() {
        return service.getLastCustomOptionID();
    }
}
