import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Breadcrumb, message } from "antd";
import Sider from "./layout/Sider";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const messageDisplayed = sessionStorage.getItem("messageDisplayed");
    if (sessionStorage.getItem("user") === null && !messageDisplayed) {
      message.error("Please login first", 1);
      sessionStorage.setItem("messageDisplayed", "true");
      navigate("/");
    }
  }, [navigate]);

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
    >
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb>
    </Layout.Content>
  );
}

export default Home;
