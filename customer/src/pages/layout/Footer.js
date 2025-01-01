import React from "react";
import { Layout } from "antd";

function Footer() {
  return (
    <Layout.Footer style={{ textAlign: "center" }}>
      ©{new Date().getFullYear()} Created by Baosi Chongqing Paper Bag Fish
    </Layout.Footer>
  );
}

export default Footer;
