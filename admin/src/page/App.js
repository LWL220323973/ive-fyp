import "../style/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Menu from "./Menu";
import User from "./User/index";
import UserInfo from "./User/Info";
import ManageDishesType from "./Manage/manageDishesType";
import ManageCustomization from "./Manage/manageCustomization/index";
import ManageCustomizationInfo from "./Manage/manageCustomization/info";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="user/">
            <Route index element={<User />} />
            <Route path="userInfo" element={<UserInfo />} />
          </Route>
          <Route path="manage/">
            <Route path="customization">
              <Route index element={<ManageCustomization />} />
              <Route path="info" element={<ManageCustomizationInfo />} />
            </Route>
            <Route path="dishesType"  element={<ManageDishesType/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
