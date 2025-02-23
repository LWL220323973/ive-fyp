import React, { useEffect, useState } from 'react';
import { getOrderDetailByTableName } from '../api/Order';
import { useTranslation } from 'react-i18next';
import '../style/order.css'; // Import CSS file for styling

const OrderScreen = () => {
    const { t, i18n } = useTranslation();
    const [orders, setOrders] = useState([]);
    const tableName = localStorage.getItem('tableNumber') || ''; // Get table name from local storage

    const fetchOrders = async () => {
        try {
            const response = await getOrderDetailByTableName(tableName);
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        if (tableName) {
            fetchOrders();
        }
    }, [tableName]);

    const getMenuName = (menu) => {
        switch (i18n.language) {
            case 'zh_TW':
                return menu.name_zh_HK;
            case 'zh_CN':
                return menu.name_zh_CN;
            case 'en':
            default:
                return menu.name_en_US;
        }
    };

    const calculateTotalPrice = () => {
        return orders
            .filter(order => order.orderStatusId === 1)
            .reduce((total, order) => total + order.menu.price * order.quantity, 0)
            .toFixed(2);
    };

    const calculateTotalItems = () => {
        return orders
            .filter(order => order.orderStatusId === 1)
            .reduce((total, order) => total + order.quantity, 0);
    };

    const filteredOrders = orders.filter(order => order.orderStatusId === 1);

    return (
        <div className="order-screen">
            <h1 className="title">{t('orders')}</h1>
            {filteredOrders.length > 0 ? (
                <>
                    <ul className="order-list">
                        {filteredOrders.map((order) => (
                            <li className="order-item" key={order.id}>
                                <div className="order-info">
                                    <span className="menu-name">{getMenuName(order.menu)}</span>
                                    <span className="quantity">x{order.quantity}</span>
                                </div>
                                <span className="price-quantity">${(order.menu.price * order.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="total-price-container">
                        <span>{calculateTotalItems()} {t('total_items')} </span>
                        <span>{t('total_price')}: ${calculateTotalPrice()}</span>
                    </div>
                </>
            ) : (
                <div className="no-orders">{t('no_orders')}</div>
            )}
        </div>
    );
};

export default OrderScreen;