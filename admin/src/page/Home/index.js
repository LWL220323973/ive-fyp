import React from "react";
import { Layout } from "antd";
import Sider from "../layout/Sider";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import "./Home.css";

function Home() {
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
        margin: "12px 8px",
        padding: 24,
      }}
    ></Layout.Content>
  );
}

export default Home;
