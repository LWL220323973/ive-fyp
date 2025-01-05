import { useState } from "react";
import { Layout, Menu, Image } from "antd";
import { HomeOutlined, MenuOutlined } from "@ant-design/icons";
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
  const selectedKey = location.pathname;
  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      style={{
        minHeight: "100vh",
      }}
    >
      <Image src="images/logo.png" alt="Logo" preview={false} />
      <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]}>
        <Menu.Item
          key="/home"
          icon={<HomeOutlined />}
          onClick={() => {
            navigate("/home");
          }}
        >
          {intl.get("home")}
        </Menu.Item>
        <Menu.Item
          key="/menu"
          icon={<MenuOutlined />}
          onClick={() => {
            navigate("/menu");
          }}
        >
          {intl.get("menu")}
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
}

export default Sider;
