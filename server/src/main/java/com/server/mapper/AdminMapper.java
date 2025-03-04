package com.server.mapper;


import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.server.model.Admin;

@Mapper
public interface AdminMapper {

    List<Admin> getAdmin(String username);

    List<Admin> findAdmin(Admin admin);

    int registerAdmin(Admin admin);

    Admin getLatestAdmin();

    int editAdmin(Admin admin);

    int deleteAdminById(int id);
}