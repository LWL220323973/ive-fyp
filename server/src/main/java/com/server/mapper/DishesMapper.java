package com.server.mapper;


import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.server.model.Dishes;


@Mapper
public interface DishesMapper {

    List<Dishes> getAllDishes();
}