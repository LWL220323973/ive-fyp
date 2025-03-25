package com.server.service;

import com.server.mapper.SystemsProfileMapper;
import com.server.model.SystemsProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SystemsProfileService {

    @Autowired
    private SystemsProfileMapper systemsProfileMapper;

    public SystemsProfile getSystemsProfile() {
        return systemsProfileMapper.getSystemsProfile();
    }
    
    public void updateRestaurantName(SystemsProfile systemsProfile) {
        systemsProfileMapper.updateRestaurantName(systemsProfile);
    }

    public void updateSystemSettings(SystemsProfile systemsProfile) {
        systemsProfileMapper.updateSystemSettings(systemsProfile);
    }
}