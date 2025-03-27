package com.server.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.server.model.MenuItemCustomOption;

@Mapper
public interface MenuItemCustomOptionsMapper {

    int deleteMenuItemCustomOptionByMenuItemId(int menuItemId);

    int deleteMenuItemCustomOptionByCustomOptionId(int customOptiond);

    List<MenuItemCustomOption> getMenuItemCustomOptionByMenuItemId(int menuItemId);

    int insertMenuItemCustomOption(MenuItemCustomOption menuItemCustomOption);
}
