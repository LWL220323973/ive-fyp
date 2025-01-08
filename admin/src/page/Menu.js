import React, { useEffect, useState } from "react";
import { Layout, Breadcrumb, Button, Row, Table, Flex } from "antd";
import Sider from "./layout/Sider";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import intl from "react-intl-universal";
import { getAllDish } from "../api/DishesList";

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
  const breadcrumbItems = [
    {
      title: intl.get("menu"),
    },
  ];
  const [dishes, setDishes] = useState([]);

  const dishesList = async () => {
    if (localStorage.getItem("locale") === "zh-HK") {
      try {
        const response = await getAllDish();
        setDishes(response.data.map((dish) => dish.translate));
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await getAllDish();
        setDishes(response.data.map((dish) => dish.dishes));
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    dishesList();
  }, []);

  return (
    <Layout.Content
      style={{
        margin: "12px",
        padding: 12,
      }}
    >
      <Breadcrumb items={breadcrumbItems} />
      <Flex>
        {dishes.map((dish, index) => {
          return (
            <Button
              key={index}
              type="primary"
              style={{ margin: "12px", flex: "1 1 auto" }}
            >
              {dish}
            </Button>
          );
        })}
      </Flex>
    </Layout.Content>
  );
}
export default Menu;
