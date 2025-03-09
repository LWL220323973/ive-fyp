package com.server.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MenuItemCustomOptionsMapper {

    int deleteMenuItemCustomOptionByMenuItemId(int menuItemId);

    int deleteMenuItemCustomOptionByCustomOptionId(int customOptiond);
}
