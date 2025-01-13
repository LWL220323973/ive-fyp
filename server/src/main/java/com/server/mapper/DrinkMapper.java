package com.server.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.server.model.Drink;

@Mapper
public interface DrinkMapper {
    List<Drink> getDrink(Drink drink);
}