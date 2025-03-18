package com.server.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.mapper.CustomOptionMapper;
import com.server.model.CustomOption;
import com.server.model.CustomOptionValue;

@Service
public class CustomOptionService {

    @Autowired
    private CustomOptionMapper mapper;

    public List<CustomOption> getAllCustomOptions() {
        return mapper.getAllCustomOptions();
    }

    public int editCustomOption(CustomOption customOption) {
        return mapper.editCustomOption(customOption);
    }

    public int deleteCustomOption(int id) {
        return mapper.deleteCustomOption(id);
    }

    public int insertCustomOption(CustomOption customOption) {
        return mapper.insertCustomOption(customOption);
    }

    public int getLastCustomOptionID(){
        return mapper.getLastCustomOptionID();
    }

    /**
     * 獲取指定菜單項的所有自定義選項
     * @param menuId 菜單ID
     * @return 自定義選項列表
     */
    public List<CustomOption> getCustomOptionsByMenuId(int menuId) {
        return mapper.getCustomOptionsByMenuId(menuId);
    }
    
    /**
     * 獲取指定自定義選項的所有可選值
     * @param customOptionId 自定義選項ID
     * @return 自定義選項值列表
     */
    public List<CustomOptionValue> getCustomOptionValuesByOptionId(int customOptionId) {
        return mapper.getCustomOptionValuesByOptionId(customOptionId);
    }
    
    /**
     * 獲取指定菜單項的所有自定義選項及其值（一次性查詢）
     * @param menuId 菜單ID
     * @return 自定義選項及其值的列表
     */
    public List<Map<String, Object>> getCustomOptionsAndValuesByMenuId(int menuId) {
        return mapper.getCustomOptionsAndValuesByMenuId(menuId);
    }
}