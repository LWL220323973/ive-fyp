import React from "react";
import { Layout } from "antd";
import Sider from "../../layout/Sider";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";

function MenuInfo() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider />
      <Layout>
        <Header />
        <MenuInfoContent />
        <Footer />
      </Layout>
    </Layout>
  );
}
function MenuInfoContent() {
  return <Layout.Content></Layout.Content>;
}

export default MenuInfo;
