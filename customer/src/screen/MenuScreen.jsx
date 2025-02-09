import React, { useState, useEffect } from 'react';
import { Input, Card, Row, Col, Button, Popover, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import '../style/menu.css';
import { findInMenu } from '../api/Menu';
import { getDishesType } from '../api/DishesType';

const MenuScreen = () => {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchInputVisible, setSearchInputVisible] = useState(false);
  const [tempSearch, setTempSearch] = useState('');
  const [tableNumber, setTableNumber] = useState(localStorage.getItem('tableNumber') || '');

  useEffect(() => {
    const urlTableNumber = searchParams.get('table');
    if (urlTableNumber) {
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
    if (searchTerm) {
      const langKey = i18n.language === 'en' ? 'Name_en_US' : (i18n.language === 'zh_CN' ? 'Name_zh_CN' : 'Name_zh_HK');
      items = items.filter(item => item[langKey]?.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredItems(items);
  }, [searchTerm, selectedCategory, i18n.language, menuItems]);

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {});

  const handleSearchButtonClick = () => {
    setSearchInputVisible(!searchInputVisible);
    if (!searchInputVisible) {
      setTempSearch('');
      setSearching(false);
    }
  };

  const handleSearchConfirm = () => {
    if (tempSearch.trim() === '') {
      setSearchInputVisible(false);
      return;
    }
    setSearchTerm(tempSearch);
    setSearching(true);
    setSearchInputVisible(false);
  };

  const handleCancelSearch = () => {
    setSearchInputVisible(false);
    setSearchTerm('');
    setSearching(false);
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
        <Popover
          open={searchInputVisible}
          placement="bottomRight"
          content={
            <div className="search-popup">
              <Input
                placeholder={t('search_placeholder')}
                value={tempSearch}
                onChange={e => setTempSearch(e.target.value)}
                style={{ width: 200 }}
              />
              <Button type="primary" onClick={handleSearchConfirm} style={{ marginLeft: 8, background: '#fff', color: '#000' }}>🔍</Button>
            </div>
          }
          trigger="click"
          onOpenChange={setSearchInputVisible}
        >
          <Button
            type={searching ? 'danger' : 'default'}
            className={searching ? 'searching-button' : 'search-button'}
            onClick={handleSearchButtonClick}
            style={{ background: '#fff' }}
          >
            {searching ? (
              <>
                {searchTerm.length > 3 ? `${searchTerm.slice(0, 3)}...` : searchTerm}
                <Button type="text" onClick={handleCancelSearch} size="small" style={{ marginLeft: 5 }}>X</Button>
              </>
            ) : (
              <span>🔍</span>
            )}
          </Button>
        </Popover>
        <div className="search-category-separator"></div>
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
      <div className="table-number">{t('table_number')}: {tableNumber || 'N/A'}</div>

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
                  cover={<img alt={item[`Name_${i18n.language === 'en' ? 'en_US' : (i18n.language === 'zh_CN' ? 'zh_CN' : 'zh_HK')}`]} src={item.image} />}
                  className="menu-item-card"
                >
                  <Card.Meta
                    title={<h3>{item[`name_${i18n.language === 'en' ? 'en_US' : (i18n.language === 'zh_CN' ? 'zh_CN' : 'zh_HK')}`]}</h3>}
                    description={<p className="card-meta-description">{t('price')}: ${item.price.toFixed(2)}</p>}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </div>
  );
};

export default MenuScreen;