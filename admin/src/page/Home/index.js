import React from "react";
import { Flex, Layout, Statistic } from "antd";
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
  const style = {
    padding: 12,
    height: "auto",
    width: "auto",
    overflow: "auto",
    backgroundColor: "#E2E2E2",
  };
  return (
    <Layout.Content style={style}>
      <Flex wrap="wrap" justify="end" gap="middle">
        <Statistic title="Active Users" value={112893} />
      </Flex>
    </Layout.Content>
  );
}

export default Home;
