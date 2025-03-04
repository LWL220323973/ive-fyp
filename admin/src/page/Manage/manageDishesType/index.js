import React from "react";
import { Layout, message } from "antd";
import Sider from "../../layout/Sider";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import intl from "react-intl-universal";
import { useNavigate } from "react-router-dom";
function ManageDishesType() {
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

  if(sessionStorage.getItem("userRole") !== "admin"){
    message.error(intl.get("noPermission"));
    setTimeout(() => {
      navigate("../../home")
    }, 1000);
  }
  const navigate = useNavigate();
//   const form = Form.useForm();

  return (
    <Layout.Content style={style}>
      
    </Layout.Content>
  );
}

export default ManageDishesType;
