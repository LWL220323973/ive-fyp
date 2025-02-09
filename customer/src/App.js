import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuScreen from './screen/MenuScreen';
import Test from './screen/test';
import AppHeader from './block/Header';
import AppFooter from './block/Footer';
import BottomNav from './block/BottomNav';
import './i18n'; // 初始化 i18n

function App() {
  return (
    <Router>
      <div className="app-container" style={{ paddingTop: '64px', paddingBottom: '60px' }}>
        <AppHeader />
        <Routes>
          <Route path="/" element={<MenuScreen />} />
          <Route path="/menu" element={<MenuScreen />} />
          <Route path="/orders" element={<div style={{ padding: '20px', textAlign: 'center' }}>訂單頁面（待實現）</div>} />
          <Route path="/test" element={<Test />} />
        </Routes>
        <AppFooter />
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;