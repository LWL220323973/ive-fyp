package com.server.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.server.model.Order;

@Mapper
public interface OrderMapper {
    List<Order> findAllOrders();
    
    List<Order> findOrdersByTableName(String tableName);
}