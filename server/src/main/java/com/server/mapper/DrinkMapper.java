package com.server.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.server.model.Drink;

@Mapper
public interface DrinkMapper {
    List<Drink> getDrink(String name_zh_HK, String name_en_US, String name_zh_CN, String price, String onSale);
}