package com.server.mapper;

import com.server.model.SystemsProfile;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SystemsProfileMapper {
    SystemsProfile getSystemsProfile();
}