import { useState } from "react";
import { Layout, Menu, Image } from "antd";
import { HomeOutlined } from "@ant-design/icons";

function Sider() {
  const [collapsed, setCollapsed] = useState(false);
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
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="2">Option 2</Menu.Item>
        <Menu.Item key="3">Option 3</Menu.Item>
      </Menu>
    </Layout.Sider>
  );
}

export default Sider;
