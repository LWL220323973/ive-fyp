import { useState } from "react";
import { Layout, Menu, Image } from "antd";
import {
  HomeOutlined,
  MenuOutlined,
  SettingOutlined,
  UserOutlined,
  BarsOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import intl from "react-intl-universal";

function Sider() {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
    sessionStorage.setItem("siderCollapsed", collapsed);
  };
  const selectedKey = location.pathname.startsWith("/menu")
    ? "/menu"
    : location.pathname;

  const menuItems = () => {
    if (sessionStorage.getItem("userRole") === "admin") {
      return [
        {
          key: "/home",
          icon: <HomeOutlined />,
          label: intl.get("home"),
          onClick: () => navigate("/home"),
        },
        {
          key: "/menu",
          icon: <MenuOutlined />,
          label: intl.get("menu"),
          onClick: () => navigate("/menu"),
        },
        {
          key: "/user",
          icon: <UserOutlined />,
          label: intl.get("user"),
          onClick: () => navigate("/user"),
        },
        {
          key: "/Manage",
          label: intl.get("manage"),
          icon: <SettingOutlined />,
          children: [
            {
              key: "/manageCustomization",
              label: intl.get("specialItem"),
              icon: <StarOutlined />,
              onClick: () => navigate("/manage/customization"),
            },
            {
              key: "/manageDishesType",
              label: intl.get("DishesType"),
              icon: <BarsOutlined />,
              onClick: () => navigate("/manage/dishesType"),
            },
          ],
        },
      ];
    } else {
      return [
        {
          key: "/home",
          icon: <HomeOutlined />,
          label: intl.get("home"),
          onClick: () => navigate("/home"),
        },
        {
          key: "/menu",
          icon: <MenuOutlined />,
          label: intl.get("menu"),
          onClick: () => navigate("/menu"),
        },
      ];
    }
  };

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      style={{
        minHeight: "100vh",
      }}
    >
      <Image src="../../images/logo.png" alt="Logo" preview={false} />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItems()}
      />
    </Layout.Sider>
  );
}

export default Sider;
