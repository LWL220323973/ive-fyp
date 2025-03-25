import { useState } from "react";
import { Layout, Menu, Image } from "antd";
import {
  HomeOutlined,
  MenuOutlined,
  SettingOutlined,
  UserOutlined,
  BarsOutlined,
  StarOutlined,
  ShoppingCartOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import intl from "react-intl-universal";

function Sider() {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("siderCollapsed") === "true"
  );
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
    localStorage.setItem("siderCollapsed", collapsed);
  };

  const selectedKey = () => {
    if (location.pathname.startsWith("/menu")) {
      return "/menu";
    } else if (location.pathname.startsWith("/manage")) {
      return "/manage";
    } else if (location.pathname.startsWith("/order")) {
      return "/order";
    } else {
      return location.pathname;
    }
  };

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
          key: "/order",
          icon: <ShoppingCartOutlined />,
          label: intl.get("orders"),
          onClick: () => navigate("/order"),
        },
        {
          key: "/user",
          icon: <UserOutlined />,
          label: intl.get("user"),
          onClick: () => navigate("/user"),
        },
        {
          key: "/manage",
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
            {
              key: "/systemSettings",
              label: intl.get("systemSettings"),
              icon: <ToolOutlined />,
              onClick: () => navigate("/manage/systemSettings"),
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
        {
          key: "/order",
          icon: <ShoppingCartOutlined />,
          label: intl.get("orders"),
          onClick: () => navigate("/order"),
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
        selectedKeys={[selectedKey()]}
        items={menuItems()}
      />
    </Layout.Sider>
  );
}

export default Sider;
