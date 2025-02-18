import React, { useEffect, useState } from 'react';
import { getOrdersByTable } from '../api/Order';

const OrderScreen = () => {
    const [orders, setOrders] = useState([]);
    const tableName = localStorage.getItem('tableNumber');

    useEffect(() => {
        if (tableName) {
            getOrdersByTable(tableName)
                .then(response => {
                    setOrders(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the orders!', error);
                });
        }
    }, [tableName]);


    return (
        <div>
            <h1>Orders for Table: {tableName}</h1>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        Order ID: {order.id}, Status ID: {order.order_status_id}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderScreen;
