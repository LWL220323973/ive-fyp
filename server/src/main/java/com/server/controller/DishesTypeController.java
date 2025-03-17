package com.server.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.server.model.DishesType;
import com.server.service.DishesTypeService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class DishesTypeController {

    @Autowired
    private DishesTypeService service;

    @GetMapping("/api/dishesType/getAllDishesType")
    public List<DishesType> getAllDishesType() {
        return service.getAllDishesType();
    }

    @PostMapping("/api/dishesType/insertDishesType")
    public int insertDishesType(@RequestBody DishesType dishesType) {
        try {
            log.info("Inserting Dishes Type " + dishesType.toString());
            int result = service.insertDishesType(dishesType);
            if (result == 1) {
                log.info("Dishes Type inserted successfully");
            }
            return result;
        } catch (Exception e) {
            log.error("Error inserting Dishes Type " + dishesType.toString(), e);
            return 0;
        }
    }

    @PostMapping("/api/dishesType/editDishesType")
    public int editDishesType(@RequestBody DishesType dishesType) {
        try {
            log.info("Editing Dishes Type (" + dishesType.getId() + ") " + dishesType.toString());
            int result = service.editDishesType(dishesType);
            if (result == 1) {
                log.info("Dishes Type (" + dishesType.getId() + ") edited successfully");
            }
            return result;
        } catch (Exception e) {
            log.error("Error editing Dishes Type (" + dishesType.getId() + ") " + dishesType.toString(), e);
            return 0;
        }
    }

    @PostMapping("/api/dishesType/deleteDishesType")
    public int deleteDishesType(@RequestBody DishesType dishesType) {
        log.info("Deleting Dishes Type (" + dishesType.getId() + ") " + dishesType.toString());
        int result = service.deleteDishesType(dishesType.getId());
        if (result == 1) {
            log.info("Dishes Type (" + dishesType.getId() + ") deleted successfully");
        }
        return result;
    }
}