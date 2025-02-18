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
    
    public Menu getMenuById(Long id) {
        return mapper.getMenuById(id);
    }
}