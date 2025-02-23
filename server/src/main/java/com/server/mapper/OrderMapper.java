package com.server.mapper;

import com.server.model.Order;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface OrderMapper {
    List<Order> getOrderDetailByTableName(String tableName);
}