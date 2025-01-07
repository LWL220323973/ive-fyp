import React, { useEffect, useState } from "react";
import { Layout, Breadcrumb, Button } from "antd";
import Sider from "./layout/Sider";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import intl from "react-intl-universal";
import { getAllDish } from "../api/DishesList";

function Menu() {
  const [dishes, setDishes] = useState([]);

  const dishesList = async () => {
    try {
      const response = await getAllDish();
      setDishes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dishesList();
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider />
      <Layout>
        <Header />
        <Content dishes={dishes} />
        <Footer />
      </Layout>
    </Layout>
  );
}

function Content({ dishes }) {
  const breadcrumbItems = [
    {
      title: intl.get("menu"),
    },
  ];

  return (
    <Layout.Content
      style={{
        margin: "12px",
        padding: 12,
      }}
    >
      <Breadcrumb items={breadcrumbItems} />
      {dishes.map((dish) => {
        if (localStorage.getItem("locale") === "zh-HK") {
          return (
            <Button type="primary" key={dish.dishes} style={{ margin: "12px" }}>
              {dish.translate}
            </Button>
          );
        } else {
          return (
            <Button type="primary" key={dish.dishes} style={{ margin: "12px" }}>
              {dish.dishes}
            </Button>
          );
        }
      })}
    </Layout.Content>
  );
}
export default Menu;
