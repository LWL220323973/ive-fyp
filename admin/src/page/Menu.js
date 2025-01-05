import React from "react";
import { Layout, Breadcrumb, Button } from "antd";
import Sider from "./layout/Sider";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import intl from "react-intl-universal";
function Menu() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider />
      <Layout>
        <Header />
        <Content />
        <Footer />
      </Layout>
    </Layout>
  );
}

function Content() {
  return (
    <Layout.Content
      style={{
        margin: "12px",
        padding: 12,
      }}
    >
      <Breadcrumb>
        <Breadcrumb.Item>{intl.get("menu")}</Breadcrumb.Item>
      </Breadcrumb>
      <Button></Button>
    </Layout.Content>
  );
}
export default Menu;
