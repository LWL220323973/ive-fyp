import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import { Card, Row, Col, Button, Modal, message } from 'antd'; // Import UI components from antd
import { useTranslation } from 'react-i18next'; // Import translation hook for internationalization
import { useSearchParams } from 'react-router-dom'; // Import hook to access URL search parameters
import '../style/menu.css'; // Import custom CSS styles
import { findInMenu } from '../api/Menu'; // Import API function to fetch menu items
import { getDishesType } from '../api/DishesType'; // Import API function to fetch dish categories
import { DeleteOutlined } from '@ant-design/icons'; // Import delete icon from antd icons
import { createOrder } from '../api/CreateOrder'; // Import createOrder API function

const MenuScreen = () => {
  // Initialize translation hook (t for translation function and i18n for language info)
  const { t, i18n } = useTranslation();

  // Get URL search parameters
  const [searchParams] = useSearchParams();

  // State to control the visibility of the scanning failure modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  // State to manage the selected category for filtering; default is 'all'
  const [selectedCategory, setSelectedCategory] = useState('all');

  // State to store all fetched menu items from the API
  const [menuItems, setMenuItems] = useState([]);

  // State to store fetched dish categories from the API
  const [categories, setCategories] = useState([]);

  // State to store menu items after applying the selected category filter
  const [filteredItems, setFilteredItems] = useState([]);

  // State to store the table number, retrieved from localStorage if available
  const [tableNumber, setTableNumber] = useState(localStorage.getItem('tableNumber') || '');

  // State to store the currently selected menu item for detail view
  const [selectedItem, setSelectedItem] = useState(null);

  // State to control the visibility of the item detail modal
  const [itemDetailVisible, setItemDetailVisible] = useState(false);

  // State to store cart items, initializing from localStorage if present
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // State to control the visibility of the cart modal
  const [cartModalVisible, setCartModalVisible] = useState(false);

  // State to manage the quantity selected for a menu item in the detail modal
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  // useEffect to handle table number from URL search parameters and localStorage
  useEffect(() => {
    const urlTableNumber = searchParams.get('table');
    if (urlTableNumber === '0') {
      // If URL parameter table equals '0', clear tableNumber and cart from localStorage and state, then show the modal
      localStorage.removeItem('tableNumber');
      localStorage.removeItem('cart');
      setTableNumber('');
      setCart([]);
      setIsModalVisible(true);
    } else if (urlTableNumber) {
      // If a valid table number exists in the URL, store it in localStorage and update state
      localStorage.setItem('tableNumber', urlTableNumber);
      setTableNumber(urlTableNumber);
    } else if (!tableNumber) {
      // If no table number is found, show the scanning failure modal
      setIsModalVisible(true);
    }
  }, [searchParams, tableNumber]);

  // useEffect to fetch menu items and dish categories from API when component mounts
  useEffect(() => {
    // Async function to fetch menu items from API
    const fetchMenuItems = async () => {
      try {
        const response = await findInMenu('', '', '', '', '', '');
        setMenuItems(response.data);
        setFilteredItems(response.data); // Initially, no filter applied so filteredItems equals all menuItems
      } catch (error) {
        console.error('Failed to fetch menu items:', error);
      }
    };

    // Async function to fetch dish categories from API
    const fetchCategories = async () => {
      try {
        const response = await getDishesType();
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    // Invoke both API calls
    fetchMenuItems();
    fetchCategories();
  }, []);

  // useEffect to update filteredItems whenever selectedCategory or menuItems change
  useEffect(() => {
    let items = menuItems;
    // If a specific category is selected (other than 'all'), filter the menuItems accordingly
    if (selectedCategory !== 'all') {
      items = items.filter(item => item.type === selectedCategory);
    }
    setFilteredItems(items);
  }, [selectedCategory, menuItems]);

  // useEffect to update localStorage whenever the cart state changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Group the filtered menu items by their type (category) for display purposes
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {});

  // Handler for clicking on a menu item; opens the detail modal for the selected item
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setSelectedQuantity(1); // Reset quantity each time a new item is selected
    setItemDetailVisible(true);
  };

  // Handler to add the selected item (with chosen quantity) to the cart
  const handleAddToCart = () => {
    if (!selectedItem) return;

    // Check if the item already exists in the cart
    const existingItem = cart.find(item => item.id === selectedItem.id);
    if (existingItem) {
      // If it exists, update its quantity by adding the selected quantity
      setCart(cart.map(item =>
        item.id === selectedItem.id
          ? { ...item, quantity: item.quantity + selectedQuantity }
          : item
      ));
    } else {
      // If it does not exist, add it as a new item in the cart
      setCart([...cart, { ...selectedItem, quantity: selectedQuantity }]);
    }

    // Show a success message and close the item detail modal
    message.success(t('added_to_cart'));
    setItemDetailVisible(false);
  };

  // Handler to update the quantity of an item already in the cart (delta can be positive or negative)
  const handleUpdateQuantity = (itemId, delta) => {
    setCart(cart.map(item => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + delta;
        // Return the updated item if newQuantity is positive; otherwise, mark it for removal
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    }).filter(Boolean)); // Remove any null entries (items with zero or negative quantity)
  };

  // Handler to update the quantity in the item detail modal
  const handleDetailQuantityChange = (delta) => {
    const newQuantity = selectedQuantity + delta;
    if (newQuantity > 0) {
      setSelectedQuantity(newQuantity);
    }
  };

  // Function to calculate the total price of items in the cart
  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  // Function to calculate the total count of items in the cart
  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  // Handler to clear the cart after confirming with the user via a modal
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

  // Handler to confirm and place the order
  const handleConfirmOrder = async () => {
    Modal.confirm({
      title: t('confirm_order_title'),
      content: t('confirm_order_content'),
      onOk: async () => {
        try {
          for (const item of cart) {
            await createOrder(item.id, item.quantity, tableNumber);
          }
          message.success(t('order_placed_successfully'));
          setCart([]); // Clear the cart after successful order placement
          setCartModalVisible(false); // Close the cart modal
        } catch (error) {
          message.error(t('order_placement_failed'));
          console.error('Failed to place order:', error);
        }
      },
      okButtonProps: {
        style: { background: '#b22222' }
      }
    });
  };

  return (
    <div className="menu-screen">
      {/* Scanning failure modal displayed when table number is missing or invalid */}
      <Modal
        title="掃描失敗"
        open={isModalVisible}
        footer={null}
        closable={false}
        centered
      >
        <p>掃描失敗，請重新再試！</p>
      </Modal>

      {/* Section for search and filter buttons */}
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

      {/* Display the current table number */}
      <div className="table-number">
        <span className="table-label">{t('table_number')}:</span>
        <span className="table-value">{tableNumber || 'N/A'}</span>
      </div>

      {/* Modal for displaying item details */}
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
            {/* Display item image */}
            <img
              src={selectedItem.image}
              alt={selectedItem[`Name_${i18n.language === 'en' ? 'en_US' : (i18n.language === 'zh_CN' ? 'zh_CN' : 'zh_HK')}`]}
              className="item-detail-image"
            />
            <div className="item-detail-description">
              {/* Display item name */}
              {<h2>{selectedItem[`name_${i18n.language === 'en' ? 'en_US' : (i18n.language === 'zh_CN' ? 'zh_CN' : 'zh_HK')}`]}</h2>}
            </div>
            {/* Display item price */}
            <div className="item-detail-price">
              ${selectedItem.price.toFixed(2)}
            </div>

            {/* Quantity selector within the detail modal */}
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

            {/* Display total price for the selected quantity */}
            <div className="item-detail-total">
              {t('cart_total')}: ${(selectedItem.price * selectedQuantity).toFixed(2)}
            </div>

            {/* Button to add the current item to the cart */}
            <Button className="add-to-cart-button" onClick={handleAddToCart}>
              {t('add_to_cart')}
            </Button>
          </>
        )}
      </Modal>

      {/* Render menu items grouped by category */}
      {Object.keys(groupedItems).map(category => (
        <div key={category}>
          {/* Display category title */}
          <h2 className="category-title">
            {categories.find(cat => cat.id === category)?.[`name_${i18n.language === 'en' ? 'Us_En' : (i18n.language === 'zh_CN' ? 'Zh_CN' : 'Zh_HK')}`]}
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
                      {/* Display item name */}
                      <h4>{item[`name_${i18n.language === 'en' ? 'en_US' : (i18n.language === 'zh_CN' ? 'zh_CN' : 'zh_HK')}`]}</h4>
                      {/* Display item price */}
                      <p className="card-meta-description">{t('price')}: ${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}

      {/* Floating cart button that appears when there are items in the cart */}
      {cart.length > 0 && (
        <div className="floating-cart" onClick={() => setCartModalVisible(true)}>
          <span className="cart-count">{getTotalItems()} {t('cart_items')}</span>
          <span className="cart-total">${getTotalPrice().toFixed(2)}</span>
        </div>
      )}

      {/* Cart modal to display items in the cart */}
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
                {/* Icon button to clear the cart */}
                <DeleteOutlined
                  className="clear-cart-icon"
                  onClick={handleClearCart}
                />
              </div>
            )}
          </div>
        }
        className="cart-modal"
        style={{ top: 20 }} /* Adjust the position of the modal */
      >
        <div className="cart-items-container">
          {cart.length === 0 ? (
            // Display when cart is empty
            <div style={{ textAlign: 'center', padding: '20px' }}>
              {t('empty_cart')}
            </div>
          ) : (
            // List all cart items
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
              onClick={handleConfirmOrder} // Call handleConfirmOrder on click
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