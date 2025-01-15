package com.server.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.server.model.StapleFood;

@Mapper
public interface StapleFoodMapper {
    List<StapleFood> getStapleFood(StapleFood stapleFood);
}