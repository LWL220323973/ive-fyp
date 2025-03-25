package com.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.server.model.Menu;
import com.server.service.MenuService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class MenuController {

    @Autowired
    private MenuService service;

    @PostMapping("/api/menu/findInMenu")
    public List<Menu> findInMenu(@RequestBody Menu menu) {
        return service.findInMenu(menu);
    }

    @PostMapping("/api/menu/insertMenu")
    public int insertMenu(@RequestBody Menu menu) {
        try {
            log.info("menu: " + menu);
            return service.insertMenu(menu);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @PostMapping("/api/menu/updateMenu")
    public int updateMenu(@RequestBody Menu menu) {
        return service.updateMenu(menu);
    }

    @PostMapping("/api/menu/deleteMenu")
    public int deleteMenu(@RequestBody Menu menu) {
        return service.deleteMenu(menu);
    }

    @PostMapping("/api/menu/getLastMenu")
    public int getLastMenu() {
        Menu menu = service.getLastMenu();
        return menu.getId();
    }
}
