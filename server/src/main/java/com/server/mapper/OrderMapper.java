package com.server.mapper;

import com.server.model.Order;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface OrderMapper {
    List<Order> getOrderDetailByTableName(String tableName);

    int CreateOrder(@Param("item_id") int item_id,
                    @Param("quantity") int quantity,
                    @Param("table_name") String table_name);
}