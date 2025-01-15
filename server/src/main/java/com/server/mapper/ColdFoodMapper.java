package com.server.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.server.model.ColdFood;

@Mapper
public interface ColdFoodMapper {
    List<ColdFood> getColdFood(ColdFood coldFood);
}