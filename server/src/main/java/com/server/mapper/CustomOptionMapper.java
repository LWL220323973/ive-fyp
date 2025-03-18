package com.server.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.server.model.CustomOption;
import com.server.model.CustomOptionValue;

@Mapper
public interface CustomOptionMapper {
    List<CustomOption> getAllCustomOptions();

    int deleteCustomOption(int id);

    int editCustomOption(CustomOption customOption);

    int insertCustomOption(CustomOption customOption);

    int getLastCustomOptionID();
    
    // 獲取指定menu ID的所有custom options
    List<CustomOption> getCustomOptionsByMenuId(@Param("menuId") int menuId);
    
    // 獲取指定custom option的所有values
    List<CustomOptionValue> getCustomOptionValuesByOptionId(@Param("customOptionId") int customOptionId);
    
    // 獲取指定menu ID的所有custom options及其values (一次性獲取)
    List<Map<String, Object>> getCustomOptionsAndValuesByMenuId(@Param("menuId") int menuId);
}