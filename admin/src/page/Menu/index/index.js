import React, { useEffect, useState, useCallback } from "react";
import {
  Layout,
  Button,
  Tooltip,
  Form,
  Input,
  Radio,
  Typography,
  Table,
  InputNumber,
  Space,
} from "antd";
import { ClearOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Sider from "../../layout/Sider";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import { getDishesType } from "../../../api/DishesType";
import { searchInMenu } from "../../../api/Menu";
import intl from "react-intl-universal";
import { useNavigate } from "react-router-dom";
import "./index.css";

function Menu() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider />
      <Layout>
        <Header />
        <MenuContent />
        <Footer />
      </Layout>
    </Layout>
  );
}

function MenuContent() {
  const [dishesType, setDishesType] = useState([]); //the list of dishes type
  const [type, setType] = useState(""); //the type of dishes
  const [data, setData] = useState([]); //the list of dishes
  const navigate = useNavigate();
  const [menuForm] = Form.useForm();

  const style = {
    padding: 12,
    height: "auto",
    width: "auto",
    overflow: "auto",
    backgroundColor: "#E2E2E2",
  };

  const dishTypeList = () => {
    if (localStorage.getItem("locale") === "en-US") {
      return dishesType.map((item) => {
        return (
          <Tooltip title={item.name_Us_EN} key={item.name_Us_EN}>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                type === item.id ? setType("") : setType(item.id);
              }}
            >
              {item.name_Us_EN}
            </Button>
          </Tooltip>
        );
      });
    } else {
      return dishesType.map((item) => {
        return (
          <Tooltip title={item.name_Zh_HK} key={item.name_Zh_HK}>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                type === item.id ? setType("") : setType(item.id);
              }}
            >
              {item.name_Zh_HK}
            </Button>
          </Tooltip>
        );
      });
    }
  };

  const onSearch = useCallback(async () => {
    const { Name_zh_HK, Name_zh_CN, Name_en_US, price, onSale } =
      menuForm.getFieldsValue();
    const res = await searchInMenu(
      Name_zh_HK,
      Name_zh_CN,
      Name_en_US,
      price,
      onSale,
      type
    );
    setData(res.data);
  }, [menuForm, type]);

  const formItem = () => {
    const variableFormItem = [
      {
        label: intl.get("zh-hk"),
        name: "name_zh_HK",
        rules: [
          {
            pattern: /^[\u4e00-\u9fa5]+$/,
            message: intl.get("pleaseEnterChinese"),
          },
        ],
      },
      {
        label: intl.get("zh-cn"),
        name: "name_zh_CN",

        rules: [
          {
            pattern: /^[\u4e00-\u9fa5]+$/,
            message: intl.get("pleaseEnterChinese"),
          },
        ],
      },
      {
        label: intl.get("en-us"),
        name: "name_en_US",
        rules: [
          {
            pattern: /^[A-Za-z\s]+$/,
            message: intl.get("pleaseEnterEnglish"),
          },
        ],
      },
    ];
    const sortedVariableFormItem =
      localStorage.getItem("locale") === "en-US"
        ? variableFormItem.sort((a) => (a.name === "name_en_US" ? -1 : 1))
        : variableFormItem;

    return (
      <Space>
        {sortedVariableFormItem.map((item) => (
          <Form.Item
            key={item.name}
            label={item.label}
            name={item.name}
            rules={item.rules}
          >
            <Input size="large" />
          </Form.Item>
        ))}
        <Form.Item label={intl.get("price")} name="price">
          <InputNumber size="large" />
        </Form.Item>
        <Form.Item label={intl.get("status")} name="onSale">
          <Radio.Group id="onSale">
            <Radio value="Y">{intl.get("active")}</Radio>
            <Radio value="N">{intl.get("inactive")}</Radio>
          </Radio.Group>
        </Form.Item>
        <Space size="middle" id="formControlButtonGrp">
          <Button icon={<ClearOutlined />} htmlType="reset">
            {intl.get("reset")}
          </Button>
          <Button type="primary" onClick={() => onSearch()}>
            {intl.get("submit")}
          </Button>
        </Space>
      </Space>
    );
  };

  const columns = () => {
    const defaultColumns = [
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
    const variableColumns = [
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
    ];
    const sortedVariableColumns =
      localStorage.getItem("locale") === "en-US"
        ? variableColumns.sort((a) => (a.dataIndex === "name_en_US" ? -1 : 1))
        : variableColumns;
    return [...sortedVariableColumns, ...defaultColumns];
  };

  useEffect(() => {
    getDishesType().then((res) => {
      setDishesType(res.data);
    });
    onSearch();
  }, [onSearch]);

  return (
    <Layout.Content style={style}>
      <Typography.Title level={2}>
        {intl.get("menu")}
        <Button
          id="menuAddBtn"
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={() => {
            navigate("info", { state: { status: "add" } });
          }}
        >
          {intl.get("add")}
        </Button>
      </Typography.Title>
      <Space size="middle" id="buttonGroup">
        {dishTypeList()}
      </Space>
      <Form form={menuForm} layout="inline" id="menuForm">
        {formItem()}
      </Form>
      <Typography.Title level={3} style={{ marginTop: 20 }}>
        {dishesType.map((item) => {
          return item.id === type
            ? localStorage.getItem("locale") === "en-US"
              ? item.name_Us_EN
              : item.name_Zh_HK
            : null;
        })}
      </Typography.Title>
      <Table
        id="menuTable"
        dataSource={Array.isArray(data) ? data : []}
        scroll={{
          scrollToFirstRowOnChange: true,
          y: window.innerHeight - 300,
        }}
        virtual
        rowKey={(record) => record.id}
        columns={columns()}
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
          position: ["bottomCenter"],
        }}
        onRow={(record) => ({
          onClick: () => {
            navigate("./info", { state: { record: record, status: "edit" } });
          },
        })}
      />
    </Layout.Content>
  );
}

export default Menu;
