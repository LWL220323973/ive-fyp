package com.server.model;

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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStaff_id() {
        return staff_id;
    }

    public void setStaff_id(String staff_Id) {
        this.staff_id = staff_Id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName_en() {
        return name_en;
    }

    public void setName_en(String name_en) {
        this.name_en = name_en;
    }

    public String getName_cn() {
        return name_cn;
    }

    public void setName_cn(String name_cn) {
        this.name_cn = name_cn;
    }

    public String getAddress_cn() {
        return address_cn;
    }

    public void setAddress_cn(String address_cn) {
        this.address_cn = address_cn;
    }

    public String getAddress_en() {
        return address_en;
    }

    public void setAddress_en(String address_en) {
        this.address_en = address_en;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public String toString(){
        return "Admin [ staff_id=" + staff_id + ", username=" + username + ", password=" + password + ", name_en=" + name_en + ", name_cn=" + name_cn + ", phone_number=" + phone_number + ", address_cn=" + address_cn + ", address_en=" + address_en + ", email=" + email + "]";
    }
}
