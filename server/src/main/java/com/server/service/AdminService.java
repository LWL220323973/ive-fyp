package com.server.service;

import java.util.List;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.mapper.AdminMapper;
import com.server.model.Admin;

@Service
public class AdminService {

    @Autowired
    private AdminMapper mapper;

    // Login
    public Boolean getAdmin(String username, String password) {
        List<Admin> account = mapper.getAdmin(username, password);
        if (account.size() == 0) {
            return false;
        }
        for (Admin admin : account) {
            if (BCrypt.checkpw(password, admin.getPassword())) {
                return true;
            }
        }
        return false;
    }

    // User searching
    public List<Admin> findInAdmin(Admin admin) {
        return mapper.findAdmin(admin);
    }

    // User registration
    public int registerAdmin(Admin admin) {
        admin.setStaff_id(checkExistingStaffID());
        admin.setUsername(generateUserName(admin.getName_en()));
        admin.setPassword(generatePassword(admin));
        return mapper.registerAdmin(admin);
    }

    // Get Latest UserInfo
    public Admin getLatestAdmin() {
        return mapper.getLatestAdmin();
    }

    // Generate staffID
    public String generateStaffID() {
        int min = 10000000;
        int max = 99999999;
        int staffID = (int) (Math.random() * (max - min + 1) + min);
        return String.valueOf(staffID);
    }

    // Check if staffID already exists
    public String checkExistingStaffID() {
        List<Admin> existingAccount = mapper.findAdmin(new Admin());
        String staffID = generateStaffID();
        for (Admin account : existingAccount) {
            if (account.getStaff_id().equals(staffID)) {
                checkExistingStaffID();
            }
        }
        return staffID;
    }

    // Generate password
    public String generatePassword(Admin admin) {
        String password = admin.getUsername().substring(0, 3) + admin.getPhone_number().substring(4, 8);
        System.out.println(password);
        return BCrypt.hashpw(password.toString(), BCrypt.gensalt());
    }

    // Generate username
    public String generateUserName(String name) {
        String[] nameSplit = name.split(" ");
        if (nameSplit.length > 2) {
            String username = "";
            for (int i = 1; i < nameSplit.length; i++) {
                username += nameSplit[i];
            }
            username += nameSplit[0];
            int repeatCount = 0;
            for (Admin account : mapper.findAdmin(null)) {
                if (account.getUsername().contains(username.toLowerCase())) {
                    repeatCount++;
                }
            }
            if (repeatCount > 0) {
                return (username += ("0" + repeatCount)).toLowerCase();
            } else {
                return username.toLowerCase();
            }
        } else {
            String username = nameSplit[1] + nameSplit[0];
            int repeatCount = 0;
            for (Admin account : mapper.findAdmin(null)) {
                if (account.getUsername().contains(username.toLowerCase())) {
                    repeatCount++;
                }
            }
            if (repeatCount > 0) {
                return (username += ("0" + repeatCount)).toLowerCase();
            } else {
                return username.toLowerCase();
            }
        }
    }

}