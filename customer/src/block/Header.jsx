import React, { useState, useEffect } from 'react';
import { Layout, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import '../style/header.css';
import { getSystemsProfile } from '../api/GetSystemsProfile';

const { Header } = Layout;
const { Option } = Select;

function AppHeader() {
  const { i18n, t } = useTranslation();
  const [systemProfile, setSystemProfile] = useState(null);

  useEffect(() => {
    const fetchSystemProfile = async () => {
      try {
        const response = await getSystemsProfile();
        setSystemProfile(response.data);
      } catch (error) {
        console.error('Error fetching system profile:', error);
      }
    };

    fetchSystemProfile();
  }, []);

  const handleChange = (value) => {
    i18n.changeLanguage(value);
  };

  const getRestaurantName = () => {
    if (!systemProfile) return t('app_title');

    switch (i18n.language) {
      case 'zh_TW':
        return systemProfile.restaurantNameZhHK;
      case 'zh_CN':
        return systemProfile.restaurantNameZhCN;
      case 'en':
        return systemProfile.restaurantNameUsEN;
      default:
        return systemProfile.restaurantNameZhHK;
    }
  };

  return (
    <Header className="app-header">
      <div className="logo">{getRestaurantName()}</div>
      <Select
        className="language-select"
        defaultValue={i18n.language}
        style={{ width: 120 }}
        onChange={handleChange}
      >
        <Option value="zh_TW">繁體中文</Option>
        <Option value="zh_CN">简体中文</Option>
        <Option value="en">English</Option>
      </Select>
    </Header>
  );
}

export default AppHeader;