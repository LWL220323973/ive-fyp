package com.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.mapper.MenuItemCustomOptionsMapper;

@Service
public class MenuItemCustomOptionsService {

    @Autowired
    private MenuItemCustomOptionsMapper menuItemCustomOptionMapper;

    public int deleteMenuItemCustomOptionByMenuItemId(int menuItemId) {
        return menuItemCustomOptionMapper.deleteMenuItemCustomOptionByMenuItemId(menuItemId);
    }

    public int deleteMenuItemCustomOptionByCustomOptionId(int customOptionId) {
        return menuItemCustomOptionMapper.deleteMenuItemCustomOptionByCustomOptionId(customOptionId);
    }
}
