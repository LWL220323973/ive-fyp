import React from 'react';
import { Button } from 'antd';
import { AppstoreOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import '../style/bottomnav.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function BottomNav() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="bottom-nav">
      <Button type="primary" icon={<AppstoreOutlined />} onClick={() => navigate('/')}>
        {t('menu')}
      </Button>
      <Button type="primary" icon={<ShoppingCartOutlined />} onClick={() => navigate('/orders')}>
        {t('orders')}
      </Button>
    </div>
  );
}

export default BottomNav;