package com.server.controller;

import com.server.model.SystemsProfile;
import com.server.service.SystemsProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    
    @PutMapping("systemsProfile/updateRestaurantName")
    public ResponseEntity<SystemsProfile> updateRestaurantName(@RequestBody SystemsProfile systemsProfile) {
        systemsProfileService.updateRestaurantName(systemsProfile);
        return ResponseEntity.ok(systemsProfileService.getSystemsProfile());
    }

    @PutMapping("systemsProfile/updateSystemSettings")
    public ResponseEntity<SystemsProfile> updateSystemSettings(@RequestBody SystemsProfile systemsProfile) {
        systemsProfileService.updateSystemSettings(systemsProfile);
        return ResponseEntity.ok(systemsProfileService.getSystemsProfile());
    }
}