package com.server.mapper;


import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.server.model.Admin;

@Mapper
public interface AdminMapper {

    List<Admin> getAdmin(String username, String password);

    List<Admin> findAdmin(Admin admin);

    int registerAdmin(Admin admin);
}