package com.server.controller;

import com.server.model.SystemsProfile;
import com.server.service.SystemsProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api")
public class SystemsProfileController {

    private final SystemsProfileService systemsProfileService;

    @Autowired
    public SystemsProfileController(SystemsProfileService systemsProfileService) {
        this.systemsProfileService = systemsProfileService;
    }

    @GetMapping("systemsProfile")
    public SystemsProfile getSystemsProfile() {
        return systemsProfileService.getSystemsProfile();
    }
}