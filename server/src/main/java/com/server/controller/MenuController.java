package com.server.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.server.model.Menu;
import com.server.service.MenuService;

@RestController
public class MenuController {

    @Autowired
    private MenuService service;
    
    @PostMapping("/api/menu/findInMenu")
    public List<Menu> findInMenu(@RequestBody Menu menu) {
        System.out.println(menu.toString());
        return service.findInMenu(menu);
    }

}