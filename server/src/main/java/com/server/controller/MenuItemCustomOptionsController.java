package com.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.server.model.MenuItemCustomOption;
import com.server.service.MenuItemCustomOptionsService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class MenuItemCustomOptionsController {

    @Autowired
    private MenuItemCustomOptionsService service;

    @PostMapping("/api/menuItemCustomOptions/deleteMenuItemCustomOptionByCustomOptionId")
    public int deleteMenuItemCustomOptionByCustomOptionId(@RequestBody MenuItemCustomOption menuItemCustomOption) {
        log.info("deleteMenuItemCustomOptionByCustomOptionId: customOptionId={" + menuItemCustomOption.getCustom_option_id() + "}");
        return service.deleteMenuItemCustomOptionByCustomOptionId(menuItemCustomOption.getCustom_option_id());
    }

    @PostMapping("/api/menuItemCustomOptions/deleteMenuItemCustomOptionByMenuItemId")
    public int deleteMenuItemCustomOptionByMenuItemId(@RequestBody MenuItemCustomOption menuItemCustomOption) {
        log.info("deleteMenuItemCustomOptionByMenuItemId: menuItemId={" + menuItemCustomOption.getMenu_item_id() + "}");
        return service.deleteMenuItemCustomOptionByMenuItemId(menuItemCustomOption.getMenu_item_id());
    }

    @PostMapping("/api/menuItemCustomOptions/getMenuItemCustomOptionByMenuItemId")
    public List<MenuItemCustomOption> getMenuItemCustomOptionByMenuItemId(@RequestBody MenuItemCustomOption menuItemCustomOption) {
        log.info("getMenuItemCustomOptionByMenuItemId: menuItemId={" +menuItemCustomOption.getMenu_item_id() + "}");
        return service.getMenuItemCustomOptionByMenuItemId(menuItemCustomOption.getMenu_item_id());
    }

    @PostMapping("/api/menuItemCustomOptions/insertMenuItemCustomOption")
    public int insertMenuItemCustomOption(@RequestBody MenuItemCustomOption menuItemCustomOption) {
        log.info("insertMenuItemCustomOption: menuItemId={" + menuItemCustomOption.getMenu_item_id() + "}, customOptionId={" + menuItemCustomOption.getCustom_option_id() + "}");
        return service.insertMenuItemCustomOption(menuItemCustomOption);
    }
}
