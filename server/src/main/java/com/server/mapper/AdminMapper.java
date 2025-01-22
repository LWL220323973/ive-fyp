package com.server.mapper;


import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.server.model.Admin;

@Mapper
public interface AdminMapper {

    List<Admin> findAdmin(String username, String password);
}