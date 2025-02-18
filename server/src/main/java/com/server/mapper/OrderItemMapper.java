package com.server.mapper;

import com.server.model.OrderItem;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface OrderItemMapper {
    List<OrderItem> findOrderItemsByOrderId(Long orderId);
    List<OrderItem> getAllOrderItems();
}