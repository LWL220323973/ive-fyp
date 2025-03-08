package com.server.model;

import lombok.Data;

@Data
public class Admin {
    private int id;
    private String staff_id;
    private String username;
    private String password;
    private String name_en;
    private String name_cn;
    private String phone_number;
    private String userRole;
    private String email;

    @Override
    public String toString() {
        return "Admin [ staff_id=" + staff_id + ", username=" + username + ", password=" + password + ", name_en="
                + name_en + ", name_cn=" + name_cn + ", phone_number=" + phone_number + " email=" + email
                + ", User Role=" + userRole + "]";
    }
}
