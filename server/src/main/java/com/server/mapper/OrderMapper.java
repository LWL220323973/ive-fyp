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
    List<Order> getAllOrders();
    int updateOrderStatus(@Param("orderId") int orderId, @Param("orderStatusId") int orderStatusId);
    int updateOrderTable(@Param("orderId") int orderId, @Param("newTableName") String newTableName);
    int updateAllOrdersTables(@Param("oldTableName") String oldTableName, @Param("newTableName") String newTableName);
}