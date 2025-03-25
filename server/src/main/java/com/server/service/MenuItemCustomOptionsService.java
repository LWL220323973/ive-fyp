package com.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.mapper.MenuItemCustomOptionsMapper;
import com.server.model.MenuItemCustomOption;

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

    public List<MenuItemCustomOption> getMenuItemCustomOptionByMenuItemId(int menuItemId) {
        return menuItemCustomOptionMapper.getMenuItemCustomOptionByMenuItemId(menuItemId);
    }

    public int insertMenuItemCustomOption(MenuItemCustomOption menuItemCustomOption) {
        return menuItemCustomOptionMapper.insertMenuItemCustomOption(menuItemCustomOption);
    }
}
