package com.server.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.server.model.OrderStatus;

@Mapper
public interface OrderStatusMapper {
    List<OrderStatus> findAllOrderStatus();
    OrderStatus getOrderStatusById(Integer id);
}