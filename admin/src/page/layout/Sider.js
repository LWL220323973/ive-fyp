import { useState } from "react";
import { Layout, Menu, Image } from "antd";
import { HomeOutlined, MenuOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

function Sider() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const selectedKey = location.pathname;
  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
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
          Home
        </Menu.Item>
        <Menu.Item
          key="/menu"
          icon={<MenuOutlined />}
          onClick={() => {
            navigate("/menu");
          }}
        >
          Menu  
        </Menu.Item>

        <Menu.Item key="3">Option 3</Menu.Item>
      </Menu>
    </Layout.Sider>
  );
}

export default Sider;
