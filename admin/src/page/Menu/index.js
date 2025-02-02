import React, { useEffect, useState } from "react";
import {
  Layout,
  Button,
  Flex,
  Tooltip,
  Form,
  Input,
  Radio,
  Typography,
  Table,
} from "antd";
import { ClearOutlined } from "@ant-design/icons";
import Sider from "../layout/Sider";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { getDishesType } from "../../api/DishesType";
import { findInMenu } from "../../api/Menu";
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
  const [dishesType, setDishesType] = useState([]); //the list of dishes type
  const [type, setType] = useState(""); //the selected dishes type
  const [data, setData] = useState([]); //the list of dishes
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
                value={item.id}
                onClick={() => {
                  setType(item.name_Zh_HK);
                  form.setFieldsValue({ type: item.id });
                  onSearch({ type: item.id });
                }}
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
                value={item.id}
                onClick={() => {
                  setType(item.name_Us_En);
                  form.setFieldsValue({ type: item.id });
                  onSearch({ type: item.id });
                }}
                style={{ flex: 1, height: "100%", fontSize: "16px" }}
              >
                {item.name_Us_En}
              </Button>
            </Tooltip>
          ))
        );
      }
    });
  }, [navigator, form]);

  useEffect(() => {
    onSearch({});
  }, []);

  const onReset = () => {
    setType("");
    form.resetFields();
    onSearch({});
  };

  //set the ordering of the form items by local storge language
  const formItem = (local) => {
    if (local === "zh-HK") {
      return (
        <>
          <Form.Item label={intl.get("name")} name="Name_zh_HK">
            <Input size="large" id="name_zh_HK" />
          </Form.Item>
          <Form.Item label={intl.get("nameCN")} name="Name_zh_CN">
            <Input size="large" id="name_zh_CN" />
          </Form.Item>
          <Form.Item label={intl.get("nameEN")} name="Name_en_US">
            <Input size="large" id="name_en_US" />
          </Form.Item>
        </>
      );
    } else {
      return (
        <>
          <Form.Item label={intl.get("nameEN")} name="name_en_US">
            <Input size="large" id="name_en_US" />
          </Form.Item>
          <Form.Item label={intl.get("name")} name="Name_en_US">
            <Input size="large" id="name_zh_HK" />
          </Form.Item>
          <Form.Item label={intl.get("nameCN")} name="Name_zh_CN">
            <Input size="large" id="name_zh_CN" />
          </Form.Item>
        </>
      );
    }
  };

  const onSearch = async (values) => {
    const res = await findInMenu(
      values.Name_zh_HK,
      values.Name_zh_CN,
      values.Name_en_US,
      values.price,
      values.onSale,
      values.type
    );
    setData(res.data);
  };

  const columns = () => {
    if (localStorage.getItem("locale") === "zh-HK") {
      return [
        {
          title: intl.get("name"),
          dataIndex: "name_zh_HK",
          key: "name_zh_HK",

          sorter: (a, b) => a.name_zh_HK.localeCompare(b.name_zh_HK),
        },
        {
          title: intl.get("nameCN"),
          dataIndex: "name_zh_CN",
          key: "name_zh_CN",

          sorter: (a, b) => a.name_zh_CN.localeCompare(b.name_zh_CN),
        },
        {
          title: intl.get("nameEN"),
          dataIndex: "name_en_US",
          key: "name_en_US",
          sorter: (a, b) => a.name_en_US.localeCompare(b.name_en_US),
        },
        {
          title: intl.get("price"),
          dataIndex: "price",
          key: "price",
          sorter: (a, b) => a.price - b.price,
        },
        {
          title: intl.get("status"),
          dataIndex: "onSale",
          key: "onSale",
          sorter: (a, b) => (a.onSale > b.onSale ? 1 : -1),
          render: (onSale) => {
            return onSale === "Y" ? intl.get("active") : intl.get("inactive");
          },
        },
      ];
    } else {
      return [
        {
          title: intl.get("nameEN"),
          dataIndex: "name_en_US",
          key: "name_en_US",
          sorter: (a, b) => a.name_en_US.localeCompare(b.name_en_US),
        },
        {
          title: intl.get("name"),
          dataIndex: "name_zh_HK",
          key: "name_zh_HK",
          sorter: (a, b) => a.name_zh_HK.localeCompare(b.name_zh_HK),
        },
        {
          title: intl.get("nameCN"),
          dataIndex: "name_zh_CN",
          key: "name_zh_CN",
          sorter: (a, b) => a.name_zh_CN.localeCompare(b.name_zh_CN),
        },

        {
          title: intl.get("price"),
          dataIndex: "price",
          key: "price",
          sorter: (a, b) => a.price - b.price,
        },
        {
          title: intl.get("status"),
          dataIndex: "onSale",
          key: "onSale",
          sorter: (a, b) => (a.onSale > b.onSale ? 1 : -1),
          render: (onSale) => {
            return onSale === "Y" ? intl.get("active") : intl.get("inactive");
          },
        },
      ];
    }
  };

  return (
    <Layout.Content
      style={{
        margin: "12px",
        padding: 12,
        height: "auto",
        width: "auto",
      }}
    >
      <Flex wrap gap="middle">
        {dishesType}
      </Flex>
      <Flex wrap gap="middle">
        <Form form={form} name="form" layout="vertical" onFinish={onSearch}>
          <Flex wrap gap={20} justify="center">
            {formItem(localStorage.getItem("locale"))}
            <Form.Item
              label={intl.get("price")}
              name="price"
              style={{ order: 4 }}
            >
              <Input size="large" id="price" type="number" />
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
            <Form.Item label="&nbsp;" style={{ order: 8 }} name="type" hidden>
              <Input size="large" id="type" value={""} />
            </Form.Item>
          </Flex>
        </Form>
      </Flex>
      <Flex wrap gap="middle">
        <Typography.Title level={3}>{type}</Typography.Title>
        <Table
          dataSource={Array.isArray(data) ? data : []}
          scroll={{
            scrollToFirstRowOnChange: true,
            y: 400,
          }}
          virtual
          rowKey={(record) => record.id}
          columns={columns()}
          name="table"
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
            position: ["bottomCenter"],
          }}
        />
      </Flex>
    </Layout.Content>
  );
}

export default Menu;
