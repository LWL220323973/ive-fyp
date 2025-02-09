import React from 'react';
import { Layout } from 'antd';
import '../style/footer.css';

const { Footer } = Layout;

function AppFooter() {
  return (
    <Footer className="app-footer">
      © 2025 中餐廳 POS 系統
    </Footer>
  );
}

export default AppFooter;
