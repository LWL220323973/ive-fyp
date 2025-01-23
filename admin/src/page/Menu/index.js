import React, { useEffect, useState } from "react";
import { Layout, Button, Flex, Tooltip } from "antd";
import Sider from "../layout/Sider";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { getDishesType } from "../../api/DishesType";
import intl from "react-intl-universal";
import { useNavigate } from "react-router-dom";
import "./index.css";

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
  const [dishesType, setDishesType] = useState([]);

  const navigator = useNavigate();
  useEffect(() => {
    getDishesType().then((res) => {
      const data = res.data;
      if (localStorage.getItem("locale") === "zh-HK") {
        setDishesType(
          data.map((item) => (
            <Tooltip title={item.name_Zh_HK} key={item.id}>
              <Button
                type="primary"
                color="primary"
                variant="outlined"
                style={{ flex: 1, height: "100%", fontSize: "16px" }}
              >
                {item.name_Zh_HK}
              </Button>
            </Tooltip>
          ))
        );
      } else {
        console.log(data);
        setDishesType(
          data.map((item) => (
            <Tooltip title={item.name_Us_En} key={item.id}>
              <Button
                type="primary"
                color="primary"
                variant="outlined"
                style={{ flex: 1, height: "100%", fontSize: "16px" }}
              >
                {item.name_Us_En}
              </Button>
            </Tooltip>
          ))
        );
      }
    });
  }, [navigator]);
  return (
    <Layout.Content
      style={{
        margin: "12px",
        padding: 12,
      }}
    >
      <Flex wrap gap="middle">
        {dishesType}
      </Flex>
    </Layout.Content>
  );
}

export default Menu;
