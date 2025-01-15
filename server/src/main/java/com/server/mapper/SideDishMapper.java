package com.server.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.server.model.SideDish;

@Mapper
public interface SideDishMapper {
    List<SideDish> getSideDish(SideDish sideDish);
}