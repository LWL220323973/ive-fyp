import "../style/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Menu from "./Menu/index";
import MenuInfo from "./Menu/info";
import User from "./User/index";
import UserInfo from "./User/Info";
import Order from "./Order/index";
import ManageDishesType from "./Manage/manageDishesType/index";
import ManageDishesTypeInfo from "./Manage/manageDishesType/info";
import ManageCustomization from "./Manage/manageCustomization/index";
import ManageCustomizationInfo from "./Manage/manageCustomization/info";
import SystemSettings from "./Manage/systemSettings/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="menu/">
            <Route index element={<Menu />} />
            <Route path="info" element={<MenuInfo />} />
          </Route>
          <Route path="user/">
            <Route index element={<User />} />
            <Route path="userInfo" element={<UserInfo />} />
          </Route>
          <Route path="order/">
            <Route index element={<Order />} />
          </Route>
          <Route path="manage/">
            <Route path="customization">
              <Route index element={<ManageCustomization />} />
              <Route path="info" element={<ManageCustomizationInfo />} />
            </Route>
            <Route path="dishesType">
              <Route index element={<ManageDishesType />} />
              <Route path="info" element={<ManageDishesTypeInfo />} />
            </Route>
            <Route path="systemSettings" element={<SystemSettings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
