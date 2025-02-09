import React from 'react';
import { Layout, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import '../style/header.css';

const { Header } = Layout;
const { Option } = Select;

function AppHeader() {
  const { i18n, t } = useTranslation();

  const handleChange = (value) => {
    i18n.changeLanguage(value);
  };

  return (
    <Header className="app-header">
      <div className="logo">{t('app_title')}</div>
      <Select
        className="language-select" /* Add this line */
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