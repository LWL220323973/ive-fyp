package com.server.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.server.model.Menu;

@Mapper
public interface MenuMapper {

    List<Menu> findInMenu(Menu menu);

    int insertMenu(Menu menu);

    int updateMenu(Menu menu);

    int deleteMenu(Menu menu);

    Menu getLastMenu();
}
