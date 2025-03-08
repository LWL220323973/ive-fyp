package com.server.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.server.model.CustomOptionValue;

@Mapper
public interface CustomOptionValueMapper {
    List<CustomOptionValue> getCustomOptionValue(int custom_option_id);
}