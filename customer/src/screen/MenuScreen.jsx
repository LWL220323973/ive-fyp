import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Modal, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import '../style/menu.css';
import { findInMenu } from '../api/Menu';
import { getDishesType } from '../api/DishesType';
import { DeleteOutlined } from '@ant-design/icons';

const MenuScreen = () => {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [tableNumber, setTableNumber] = useState(localStorage.getItem('tableNumber') || '');
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemDetailVisible, setItemDetailVisible] = useState(false);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [cartModalVisible, setCartModalVisible] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    const urlTableNumber = searchParams.get('table');
    if (urlTableNumber === '0') {
      // Clear all local storage if table=0
      localStorage.removeItem('tableNumber');
      localStorage.removeItem('cart');
      setTableNumber('');
      setCart([]);
      setIsModalVisible(true);
    } else if (urlTableNumber) {
      localStorage.setItem('tableNumber', urlTableNumber);
      setTableNumber(urlTableNumber);
    } else if (!tableNumber) {
      setIsModalVisible(true); // 沒有桌號時顯示遮罩
    }
  }, [searchParams, tableNumber]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await findInMenu('', '', '', '', '', '');
        setMenuItems(response.data);
        setFilteredItems(response.data);
      } catch (error) {
        console.error('Failed to fetch menu items:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await getDishesType();
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchMenuItems();
    fetchCategories();
  }, []);

  useEffect(() => {
    let items = menuItems;
    if (selectedCategory !== 'all') {
      items = items.filter(item => item.type === selectedCategory);
    }
    setFilteredItems(items);
  }, [selectedCategory, menuItems]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {});

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setSelectedQuantity(1); // Reset quantity when opening detail
    setItemDetailVisible(true);
  };

  const handleAddToCart = () => {
    if (!selectedItem) return;

    const existingItem = cart.find(item => item.id === selectedItem.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === selectedItem.id
          ? { ...item, quantity: item.quantity + selectedQuantity }
          : item
      ));
    } else {
      setCart([...cart, { ...selectedItem, quantity: selectedQuantity }]);
    }

    message.success(t('added_to_cart'));
    setItemDetailVisible(false);
  };

  const handleUpdateQuantity = (itemId, delta) => {
    setCart(cart.map(item => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const handleDetailQuantityChange = (delta) => {
    const newQuantity = selectedQuantity + delta;
    if (newQuantity > 0) {
      setSelectedQuantity(newQuantity);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const handleClearCart = () => {
    Modal.confirm({
      title: t('clear_cart_confirm'),
      onOk: () => {
        setCart([]);
        message.success(t('clear_cart'));
      },
      okButtonProps: {
        style: { background: '#b22222' }
      }
    });
  };

  return (
    <div className="menu-screen">
      {/* 遮罩 + 提示框 */}
      <Modal
        title="掃描失敗"
        open={isModalVisible}
        footer={null}
        closable={false}
        centered
      >
        <p>掃描失敗，請重新再試！</p>
      </Modal>

      {/* 搜尋與篩選 */}
      <div className="search-filter">
        <div className="category-buttons">
          <Button
            type={selectedCategory === 'all' ? 'primary' : 'default'}
            onClick={() => setSelectedCategory('all')}
          >
            {t('all_categories')}
          </Button>
          {categories.map(cat => (
            <Button
              key={cat.id}
              type={selectedCategory === cat.id ? 'primary' : 'default'}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {t(cat[`name_${i18n.language === 'en' ? 'Us_En' : (i18n.language === 'zh_CN' ? 'Zh_CN' : 'Zh_HK')}`])}
            </Button>
          ))}
        </div>
      </div>

      {/* 桌號顯示 */}
      <div className="table-number">
        <span className="table-label">{t('table_number')}:</span>
        <span className="table-value">{tableNumber || 'N/A'}</span>
      </div>

      {/* Item Detail Modal */}
      <Modal
        visible={itemDetailVisible}
        onCancel={() => setItemDetailVisible(false)}
        footer={null}
        centered
        className="item-detail-modal"
        title={selectedItem?.[`Name_${i18n.language === 'en' ? 'en_US' : (i18n.language === 'zh_CN' ? 'zh_CN' : 'zh_HK')}`]}
      >
        {selectedItem && (
          <>
            <img
              src={selectedItem.image}
              alt={selectedItem[`Name_${i18n.language === 'en' ? 'en_US' : (i18n.language === 'zh_CN' ? 'zh_CN' : 'zh_HK')}`]}
              className="item-detail-image"
            />
            <div className="item-detail-description">
              {<h2>{selectedItem[`name_${i18n.language === 'en' ? 'en_US' : (i18n.language === 'zh_CN' ? 'zh_CN' : 'zh_HK')}`]}</h2>}
            </div>
            <div className="item-detail-price">
              ${selectedItem.price.toFixed(2)}
            </div>

            <div className="item-detail-quantity">
              <button
                className="quantity-button"
                onClick={() => handleDetailQuantityChange(-1)}
              >
                -
              </button>
              <span>{selectedQuantity}</span>
              <button
                className="quantity-button"
                onClick={() => handleDetailQuantityChange(1)}
              >
                +
              </button>
            </div>

            <div className="item-detail-total">
              {t('cart_total')}: ${(selectedItem.price * selectedQuantity).toFixed(2)}
            </div>

            <Button className="add-to-cart-button" onClick={handleAddToCart}>
              {t('add_to_cart')}
            </Button>
          </>
        )}
      </Modal>

      {/* 菜單內容 */}
      {Object.keys(groupedItems).map(category => (
        <div key={category}>
          <h2 className="category-title">
            {categories.find(cat => cat.id === category)[`name_${i18n.language === 'en' ? 'Us_En' : (i18n.language === 'zh_CN' ? 'Zh_CN' : 'Zh_HK')}`]}
          </h2>
          <Row gutter={[16, 16]} className="menu-items">
            {groupedItems[category].map(item => (
              <Col xs={24} sm={12} md={8} key={item.id}>
                <Card
                  hoverable
                  className="menu-item-card"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="menu-item-content">
                    <div className="menu-item-image-container">
                      {item.image ? (
                        <img alt={item[`path`]} src={item.image} />
                      ) : (
                        <div className="menu-item-placeholder"></div>
                      )}
                    </div>
                    <div className="menu-item-details">
                      <h4>{item[`name_${i18n.language === 'en' ? 'en_US' : (i18n.language === 'zh_CN' ? 'zh_CN' : 'zh_HK')}`]}</h4>
                      <p className="card-meta-description">{t('price')}: ${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <div className="floating-cart" onClick={() => setCartModalVisible(true)}>
          <span className="cart-count">{getTotalItems()} {t('cart_items')}</span>
          <span className="cart-total">${getTotalPrice().toFixed(2)}</span>
        </div>
      )}

      {/* Cart Modal */}
      <Modal
        visible={cartModalVisible}
        onCancel={() => setCartModalVisible(false)}
        footer={null}
        title={
          <div style={{ position: 'relative' }}>
            {t('cart')}
            <div className="cart-table-number">
              {t('table_number')}: {tableNumber || 'N/A'}
            </div>
            {cart.length > 0 && (
              <div className="cart-header-actions">
                <DeleteOutlined
                  className="clear-cart-icon"
                  onClick={handleClearCart}
                />
              </div>
            )}
          </div>
        }
        className="cart-modal"
        style={{ top: 20 }} /* 調整模態框位置 */
      >
        <div className="cart-items-container">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              {t('empty_cart')}
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item[`Name_${i18n.language === 'en' ? 'en_US' : (i18n.language === 'zh_CN' ? 'zh_CN' : 'zh_HK')}`]}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <div>{item[`name_${i18n.language === 'en' ? 'en_US' : (i18n.language === 'zh_CN' ? 'zh_CN' : 'zh_HK')}`]}</div>
                  <div>${(item.price * item.quantity).toFixed(2)}</div>
                </div>
                <div className="cart-item-quantity">
                  <button className="quantity-button" onClick={() => handleUpdateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="quantity-button" onClick={() => handleUpdateQuantity(item.id, 1)}>+</button>
                </div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-amount">
              {t('cart_total')}: ${getTotalPrice().toFixed(2)}
            </div>
            <Button
              type="primary"
              style={{ background: '#b22222', width: '100%' }}
              onClick={() => {/* TODO: Implement checkout */ }}
            >
              {t('checkout')}
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MenuScreen;