import React, { useEffect, useState } from 'react';
import { getOrderDetailByTableName } from '../api/GetOrderDetailByTableName';
import { getSystemsProfile } from '../api/GetSystemsProfile';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'antd'; // 引入 Ant Design 組件
import { useNavigate } from 'react-router-dom'; // 用於導航
import '../style/order.css'; // Import CSS file for styling

const OrderScreen = () => {
    const { t, i18n } = useTranslation();
    const [orders, setOrders] = useState([]);
    const tableName = localStorage.getItem('tableNumber') || '';
    // State to store the table number, retrieved from localStorage if available
    const [tableNumber, setTableNumber] = useState(localStorage.getItem('tableNumber') || '');
    const [serviceChargeRequired, setServiceChargeRequired] = useState(false);
    const [noOrderModalVisible, setNoOrderModalVisible] = useState(false); // 控制模態框顯示
    const [isLoading, setIsLoading] = useState(true); // 添加載入狀態
    const [expandedItems, setExpandedItems] = useState({}); // 新增：追蹤展開項目的狀態
    const navigate = useNavigate(); // 用於頁面導航

    const fetchOrders = async () => {
        setIsLoading(true); // 開始載入
        try {
            const response = await getOrderDetailByTableName(tableName);
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setIsLoading(false); // 無論成功或失敗都標記載入完成
        }
    };

    useEffect(() => {
        if (tableName) {
            fetchOrders();
        } else {
            setIsLoading(false); // 如果沒有 tableName，也標記為載入完成
        }
    }, [tableName]);

    // 在訂單資料載入後檢查是否有有效訂單
    useEffect(() => {
        // 只有在載入完成後才檢查是否顯示模態框
        if (!isLoading) {
            const activeOrders = orders.filter(order => order.orderStatusId === 1);
            setNoOrderModalVisible(activeOrders.length === 0);
        }
    }, [orders, isLoading]);

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

    // 前往菜單頁面
    const goToMenu = () => {
        navigate('/menu');
    };

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

    // 切換訂單項目的展開/折疊狀態
    const toggleItemExpansion = (orderId) => {
        setExpandedItems(prevState => ({
            ...prevState,
            [orderId]: !prevState[orderId]
        }));
    };

    // 計算自定義選項中冒號的數量來確定有多少個自定義項
    const countCustomOptions = (customString) => {
        if (!customString) return 0;
        return (customString.match(/:/g) || []).length;
    };

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
                            <li 
                                className={`order-item ${getCustomString(order) ? 'has-custom-options' : ''}`} 
                                key={order.id}
                                onClick={() => getCustomString(order) && toggleItemExpansion(order.id)}
                            >
                                <div className="order-info">
                                    <div className="name-and-options">
                                        <span className="menu-name">{getMenuName(order)}</span>
                                        {getCustomString(order) && (
                                            <div className="custom-indicator">
                                                {expandedItems[order.id] 
                                                    ? '▼' 
                                                    : `+${countCustomOptions(getCustomString(order))}`}
                                            </div>
                                        )}
                                    </div>
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
                                {getCustomString(order) && expandedItems[order.id] && (
                                    <div className="custom-options-container">
                                        <span className="custom-options">{getCustomString(order)}</span>
                                    </div>
                                )}
                            </li>
                        ))}
                        {serviceChargeRequired && (
                            <li className="order-item service-charge-item">
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

            {/* 無訂單模態框 - 只有在載入完成後且沒有訂單時顯示 */}
            <Modal
                title={t('no_orders')}
                open={noOrderModalVisible && !isLoading}
                closable={false}
                maskClosable={false}
                footer={[
                    <Button key="submit" type="primary" onClick={goToMenu}>
                        {t('go_to_menu')}
                    </Button>
                ]}
            >
                <p>{t('no_orders_message')}</p>
            </Modal>
        </div>
    );
};

export default OrderScreen;