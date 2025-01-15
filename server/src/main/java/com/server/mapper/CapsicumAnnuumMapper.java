package com.server.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.server.model.CapsicumAnnuum;

@Mapper
public interface CapsicumAnnuumMapper {
    List<CapsicumAnnuum> getCapsicumAnnuum(CapsicumAnnuum capsicumAnnuum);
}