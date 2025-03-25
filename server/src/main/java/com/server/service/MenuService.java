package com.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.mapper.MenuMapper;
import com.server.model.Menu;

@Service
public class MenuService {

    @Autowired
    private MenuMapper mapper;

    public List<Menu> findInMenu(Menu menu) {
        return mapper.findInMenu(menu);
    }

    public int insertMenu(Menu menu) {
        return mapper.insertMenu(menu);
    }

    public int updateMenu(Menu menu) {
        return mapper.updateMenu(menu);
    }

    public int deleteMenu(Menu menu) {
        return mapper.deleteMenu(menu);
    }

    public Menu getLastMenu() {
        return mapper.getLastMenu();
    }
}
