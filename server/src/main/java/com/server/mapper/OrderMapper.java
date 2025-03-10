package com.server.mapper;

import com.server.model.Order;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface OrderMapper {
    List<Order> getOrderDetailByTableName(@Param("tableName") String tableName);
    int CreateOrder(Map<String, Object> params);
}