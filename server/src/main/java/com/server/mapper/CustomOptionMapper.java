package com.server.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.server.model.CustomOption;

@Mapper
public interface CustomOptionMapper {
    List<CustomOption> getAllCustomOptions();
}