package com.server.controller;

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
        log.info("deleteMenuItemCustomOptionByCustomOptionId: customOptionId={" + menuItemCustomOption.getCustomOptionId() + "}");
        return service.deleteMenuItemCustomOptionByCustomOptionId(menuItemCustomOption.getCustomOptionId());
    }

    @PostMapping("/api/menuItemCustomOptions/deleteMenuItemCustomOptionByMenuItemId")
    public int deleteMenuItemCustomOptionByMenuItemId(@RequestBody MenuItemCustomOption menuItemCustomOption) {
        log.info("deleteMenuItemCustomOptionByMenuItemId: menuItemId={" + menuItemCustomOption.getMenuItemId() + "}");
        return service.deleteMenuItemCustomOptionByMenuItemId(menuItemCustomOption.getMenuItemId());
    }
}
