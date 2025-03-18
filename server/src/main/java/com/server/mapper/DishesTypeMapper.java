package com.server.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.server.model.DishesType;

@Mapper
public interface DishesTypeMapper {

    List<DishesType> getAllDisheType();

    int editDishesType(DishesType dishesType);

    int deleteDishesType(String id);

    int insertDishesType(DishesType dishesType);
}
