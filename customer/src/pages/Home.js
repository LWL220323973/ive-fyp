import React from "react";
import { Layout } from "antd";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

function Home() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Footer />
    </Layout>
  );
}

export default Home;