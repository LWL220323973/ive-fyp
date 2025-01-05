package com.server.mapper;


import org.apache.ibatis.annotations.Mapper;

import com.server.model.Admin;

@Mapper
public interface AdminMapper {

    Admin findAdmin(String username, String password);
}