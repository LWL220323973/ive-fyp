package com.server.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.server.model.StirFry;

@Mapper
public interface StirFryMapper {
    List<StirFry> getStirFry(StirFry striFry);
}