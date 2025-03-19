package com.server.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.server.model.CustomOption;
import com.server.model.CustomOptionValue;
import com.server.service.CustomOptionService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class CustomOptionController {

    @Autowired
    private CustomOptionService service;

    @GetMapping("/api/customOption/getAllCustomOptions")
    public List<CustomOption> getAllCustomOptions() {
        return service.getAllCustomOptions();
    }

    @PostMapping("/api/customOption/editCustomOption")
    public int editCustomOption(@RequestBody CustomOption customOption) {
        try {
            log.info("Editing Custom Option (" + customOption.getId() + ") " + customOption.toString());
            int result = service.editCustomOption(customOption);
            if (result == 1) {
                log.info("Custom Option (" + customOption.getId() + ") edited successfully");
            }
            return result;
        } catch (Exception e) {
            log.error("Error editing Custom Option (" + customOption.getId() + ") " + customOption.toString(), e);
            return 0;
        }
    }

    @PostMapping("/api/customOption/deleteCustomOption")
    public int deleteCustomOption(@RequestBody CustomOption customOption) {
        log.info("Deleting Custom Option (" + customOption.getId() + ") " + customOption.toString());
        int result = service.deleteCustomOption(customOption.getId());
        if (result == 1) {
            log.info("Custom Option (" + customOption.getId() + ") deleted successfully");
        }
        return result;
    }

    @PostMapping("/api/customOption/insertCustomOption")
    public int insertCustomOption(@RequestBody CustomOption customOption) {
        try {
            log.info("Inserting Custom Option " + customOption.toString());
            return service.insertCustomOption(customOption);
        } catch (Exception e) {
            log.error("Error inserting Custom Option " + customOption.toString(), e);
            return 0;
        }
    }

    @GetMapping("/api/customOption/getLastCustomOptionID")
    public int getLastCustomOptionID() {
        return service.getLastCustomOptionID();
    }

    /**
     * 獲取指定菜單項的所有自定義選項
     * @param menuId 菜單ID
     * @return 自定義選項列表
     */
    @GetMapping("/api/customOption/getByMenuId")
    public List<CustomOption> getCustomOptionsByMenuId(@RequestParam int menuId) {
        log.info("Getting custom options for menu ID: " + menuId);
        return service.getCustomOptionsByMenuId(menuId);
    }
    
    /**
     * 獲取指定自定義選項的所有可選值
     * @param customOptionId 自定義選項ID
     * @return 自定義選項值列表
     */
    @GetMapping("/api/customOption/getValuesByOptionId")
    public List<CustomOptionValue> getCustomOptionValuesByOptionId(@RequestParam int customOptionId) {
        log.info("Getting values for custom option ID: " + customOptionId);
        return service.getCustomOptionValuesByOptionId(customOptionId);
    }
    
    /**
     * 獲取指定菜單項的所有自定義選項及其值（一次性查詢）
     * @param menuId 菜單ID
     * @return 自定義選項及其值的列表
     */
    @GetMapping("/api/customOption/getOptionsAndValuesByMenuId")
    public List<Map<String, Object>> getCustomOptionsAndValuesByMenuId(@RequestParam int menuId) {
        log.info("Getting custom options and values for menu ID: " + menuId);
        return service.getCustomOptionsAndValuesByMenuId(menuId);
    }
}
