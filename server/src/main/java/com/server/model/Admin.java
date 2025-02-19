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
    private String address_cn;
    private String address_en;
    private String email;

    public String toString(){
        return "Admin [ staff_id=" + staff_id + ", username=" + username + ", password=" + password + ", name_en=" + name_en + ", name_cn=" + name_cn + ", phone_number=" + phone_number + ", address_cn=" + address_cn + ", address_en=" + address_en + ", email=" + email + "]";
    }
}
