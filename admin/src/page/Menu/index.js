import React, { useEffect, useState } from "react";
import { Layout, Button, Flex, Tooltip, Form, Input, Radio } from "antd";
import { ClearOutlined } from "@ant-design/icons";
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
  const [form] = Form.useForm(); // 確保 form 已正確初始化

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

  const onReset = () => {
    form.resetFields();
  };
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
      <Flex wrap gap="middle">
        <Form form={form} name="form" layout="vertical">
          <Flex wrap gap={20} justify="center">
            <Form.Item
              label={intl.get("name")}
              name="name_zh_HK"
            >
              <Input size="large" id="name_zh_HK" />
            </Form.Item>
            <Form.Item
              label={intl.get("nameCN")}
              name="name_zh_CN"
            >
              <Input size="large" id="name_zh_CN" />
            </Form.Item>
            <Form.Item
              label={intl.get("nameEN")}
              name="name_en_US"
            >
              <Input size="large" id="name_en_US" />
            </Form.Item>
            <Form.Item
              label={intl.get("price")}
              name="price"
              style={{ order: 4 }}
            >
              <Input size="large" id="price" />
            </Form.Item>
            <Form.Item
              label={intl.get("status")}
              name="onSale"
              style={{ order: 5 }}
            >
              <Radio.Group id="onSale">
                <Radio value="Y">{intl.get("active")}</Radio>
                <Radio value="N">{intl.get("inactive")}</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="&nbsp;" style={{ order: 6 }}>
              <Button icon={<ClearOutlined />} onClick={() => onReset()}>
                {intl.get("reset")}
              </Button>
            </Form.Item>
            <Form.Item label="&nbsp;" style={{ order: 7 }}>
              <Button type="primary" htmlType="submit">
                {intl.get("submit")}
              </Button>
            </Form.Item>
          </Flex>
        </Form>
      </Flex>
    </Layout.Content>
  );
}

export default Menu;
