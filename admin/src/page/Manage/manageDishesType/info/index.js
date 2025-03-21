import React, { useMemo } from "react";
import { Button, Layout, message, Form, Typography, Input, Space } from "antd";
import {
  ReloadOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import Sider from "../../../layout/Sider";
import Footer from "../../../layout/Footer";
import Header from "../../../layout/Header";
import intl from "react-intl-universal";
import { useNavigate, useLocation } from "react-router-dom";
import { insertDishesType, editDishesType } from "../../../../api/DishesType";
import "./index.css";
function ManageDishesTypeInfo() {
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

  if (sessionStorage.getItem("userRole") !== "admin") {
    message.error(intl.get("noPermission"));
    setTimeout(() => {
      navigate("../../../home");
    }, 1000);
  }
  const navigate = useNavigate();
  const location = useLocation();
  const status = useMemo(
    () => (location.state && location.state.status) || "",
    [location]
  );
  const record = useMemo(
    () => location.state && location.state.record,
    [location]
  );
  const [form] = Form.useForm();
  const onFinish = async () => {
    if (status === "edit") {
      const { name_Us_EN, name_Zh_CN, name_Zh_HK } = form.getFieldsValue();
      const result = await editDishesType(
        name_Zh_HK,
        name_Zh_CN,
        name_Us_EN,
        record.id
      );
      if (result.data === 1) {
        message.success(intl.get("editDishesTypeSuccess"));
        setTimeout(() => {
          navigate("..");
        }, 1500);
      } else {
        message.error(intl.get("editDishesTypeFailed"));
      }
    }else{
      const { name_Us_EN, name_Zh_CN, name_Zh_HK } = form.getFieldsValue();
      const result = await insertDishesType(name_Zh_HK, name_Zh_CN, name_Us_EN);
      if (result.data === 1) {
        message.success(intl.get("addDishesTypeSuccess"));
        setTimeout(() => {
          navigate("..");
        }, 1500);
      } else {
        message.error(intl.get("addDishesTypeFailed"));
      }
    }
  };
  const formItem = () => {
    const formItems = [
      {
        label: intl.get("zh-hk"),
        name: "name_Zh_HK",
        initialValue: record && record.name_Zh_HK,
        rules: [
          {
            required: true,
            message: intl.get("pleaseEnterValidInfo"),
          },
          {
            pattern: /^[\u4e00-\u9fa5]+$/,
            message: intl.get("pleaseEnterChinese"),
          },
        ],
      },
      {
        label: intl.get("zh-cn"),
        name: "name_Zh_CN",
        initialValue: record && record.name_Zh_CN,
        rules: [
          {
            required: true,
            message: intl.get("pleaseEnterValidInfo"),
          },
          {
            pattern: /^[\u4e00-\u9fa5]+$/,
            message: intl.get("pleaseEnterChinese"),
          },
        ],
      },
      {
        label: intl.get("en-us"),
        name: "name_Us_EN",
        initialValue: record && record.name_Us_EN,
        rules: [
          {
            required: true,
            message: intl.get("pleaseEnterValidInfo"),
          },
          {
            pattern: /^[A-Za-z\s]+$/,
            message: intl.get("pleaseEnterEnglish"),
          },
        ],
      },
    ];

    const sortedFormItems =
      localStorage.getItem("locale") === "en-US"
        ? formItems.sort((a, b) => (a.name === "name_Us_EN" ? -1 : 1))
        : formItems;
    return (
      <>
        {sortedFormItems.map((item) => (
          <Form.Item
            key={item.name}
            label={item.label}
            name={item.name}
            initialValue={item.initialValue}
            rules={item.rules}
          >
            <Input size="large" allowClear />
          </Form.Item>
        ))}
        <Button
          id="cancelButton"
          type="primary"
          onClick={() => {
            navigate("..");
          }}
        >
          {intl.get("cancel")}
        </Button>
        <Space size="middle" id="buttonGroup">
          <Button
            htmlType="reset"
            color="primary"
            variant="outlined"
            icon={<ReloadOutlined />}
          >
            {intl.get("reset")}
          </Button>

          <Button
            type="primary"
            htmlType="submit"
            icon={status === "edit" ? <EditOutlined /> : <PlusCircleOutlined />}
          >
            {status === "edit"
              ? intl.get("editDishesType")
              : intl.get("addDishesType")}
          </Button>
        </Space>
      </>
    );
  };

  return (
    <Layout.Content style={style}>
      <Typography.Title level={2}>
        {status === "edit"
          ? intl.get("editDishesType")
          : intl.get("addDishesType")}
      </Typography.Title>
      <Form
        form={form}
        name="dishTypeInfoForm"
        layout="vertical"
        onFinish={onFinish}
      >
        {formItem}
      </Form>
    </Layout.Content>
  );
}

export default ManageDishesTypeInfo;
