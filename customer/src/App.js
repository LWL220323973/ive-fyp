import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuScreen from './screen/MenuScreen';
import OrderScreen from './screen/OrderScreen';
import AppHeader from './block/Header';
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
          <Route path="/orders" element={< OrderScreen />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;