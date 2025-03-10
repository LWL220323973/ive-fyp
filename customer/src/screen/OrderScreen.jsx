import React, { useEffect, useState } from 'react';
import { getOrderDetailByTableName } from '../api/GetOrderDetailByTableName';
import { getSystemsProfile } from '../api/GetSystemsProfile';
import { useTranslation } from 'react-i18next';
import '../style/order.css'; // Import CSS file for styling

const OrderScreen = () => {
    const { t, i18n } = useTranslation();
    const [orders, setOrders] = useState([]);
    const tableName = localStorage.getItem('tableNumber') || '';
    // State to store the table number, retrieved from localStorage if available
    const [tableNumber, setTableNumber] = useState(localStorage.getItem('tableNumber') || '');
    const [serviceChargeRequired, setServiceChargeRequired] = useState(false);

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

    useEffect(() => {
        const fetchSystemsProfile = async () => {
            try {
                const response = await getSystemsProfile();
                const profile = response.data;
                setServiceChargeRequired(profile.serviceChargeRequired);
            } catch (error) {
                console.error('Failed to fetch systems profile:', error);
            }
        };

        fetchSystemsProfile();
    }, []);

    const getMenuName = (order) => {
        switch (i18n.language) {
            case 'zh_TW':
                return order.itemNameZhHK;
            case 'zh_CN':
                return order.itemNameZhCN;
            case 'en':
            default:
                return order.itemNameEnUS;
        }
    };

    // Get custom option string based on current language
    const getCustomString = (order) => {
        switch (i18n.language) {
            case 'zh_TW':
                return order.customStringZhHK;
            case 'zh_CN':
                return order.customStringZhCN;
            case 'en':
            default:
                return order.customStringEnUS;
        }
    };

    const calculateTotalPrice = () => {
        const total = orders
            .filter(order => order.orderStatusId === 1)
            .reduce((total, order) => total + (order.price + order.customPrice) * order.quantity, 0);
        return serviceChargeRequired ? (total * 1.1).toFixed(2) : total.toFixed(2);
    };

    const calculateServiceCharge = () => {
        const total = orders
            .filter(order => order.orderStatusId === 1)
            .reduce((total, order) => total + (order.price + order.customPrice) * order.quantity, 0);
        return (total * 0.1).toFixed(1);
    };

    const calculateTotalItems = () => {
        return orders
            .filter(order => order.orderStatusId === 1)
            .reduce((total, order) => total + order.quantity, 0);
    };

    const filteredOrders = orders.filter(order => order.orderStatusId === 1);

    return (
        <div className="order-screen">
            {/* Display the current table number */}
            <div className="table-number">
                <span className="table-label">{t('table_number')}:</span>
                <span className="table-value">{tableNumber || 'N/A'}</span>
            </div>

            <h1 className="title">{t('orders')}</h1>
            {filteredOrders.length > 0 ? (
                <>
                    <ul className="order-list">
                        {filteredOrders.map((order) => (
                            <li className="order-item" key={order.id}>
                                <div className="order-info">
                                    <span className="menu-name">{getMenuName(order)}</span>
                                    {getCustomString(order) && (
                                        <span className="custom-options">{getCustomString(order)}</span>
                                    )}
                                    <span className="quantity">x{order.quantity}</span>
                                </div>
                                <div className="price-container">
                                    <span className="price-quantity">
                                        ${(order.price * order.quantity).toFixed(2)}
                                    </span>
                                    {order.customPrice > 0 && (
                                        <span className="custom-price">(+${(order.customPrice * order.quantity).toFixed(2)})</span>
                                    )}
                                </div>
                            </li>
                        ))}
                        {serviceChargeRequired && (
                            <li className="order-item">
                                <div className="order-info">
                                    <span className="menu-name">{t('service_charge')}</span>
                                </div>
                                <span className="price-quantity">${calculateServiceCharge()}</span>
                            </li>
                        )}
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