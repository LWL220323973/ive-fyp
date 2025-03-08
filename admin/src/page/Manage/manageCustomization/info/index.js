import React, { useEffect, useMemo, useState } from "react";
import { Form, Layout, message, Row, Typography, Input } from "antd";
import Sider from "../../../layout/Sider";
import Footer from "../../../layout/Footer";
import Header from "../../../layout/Header";
import intl from "react-intl-universal";
import { useNavigate, useLocation } from "react-router-dom";
import "./index.css";
import { useForm } from "antd/es/form/Form";
import { getCustomOptionValue } from "../../../../api/CustomOptionValue";

function ManageCustomizationInfo() {
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
      navigate("../../home");
    }, 1000);
  }
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const record = useMemo(
    () => (location.state && location.state.record) || {},
    [location]
  );
  const staus = useMemo(
    () => (location.state && location.state.status) || "",
    [location]
  );
  const [optionBasicInfoForm] = useForm();
  const [optionDetailForm] = useForm();

  useEffect(() => {
    if (staus === "edit") {
      getCustomOptionValue(record.id).then((res) => {
        setData(Array.isArray(res.data) ? res.data : []);
      });
    }
  }, [staus, record]);
  return (
    <Layout.Content style={style}>
      <Row>
        <Typography.Title level={2}>
          {staus === "edit" ? intl.get("editOption") : intl.get("addOption")}
        </Typography.Title>
      </Row>
      <Form name="optionBasicInfo" form={optionBasicInfoForm}>
        <Form.Item
          label={intl.get("zh-hk")}
          name="name_zh_hk"
          rules={[
            {
              required: true,
              message: intl.get("pleaseEnterValidInfo"),
            },
            {
              pattern: /^[\u4e00-\u9fa5]+$/,
              message: intl.get("pleaseEnterValidInfo"),
            },
          ]}
          initialValue={record.name_zh_hk}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={intl.get("zh-cn")}
          name="name_zh_cn"
          rules={[
            {
              required: true,
              message: intl.get("pleaseEnterValidInfo"),
            },
            {
              pattern: /^[\u4e00-\u9fa5]+$/,
              message: intl.get("pleaseEnterValidInfo"),
            },
          ]}
          initialValue={record.name_zh_cn}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={intl.get("en-us")}
          name="name_us_en"
          rules={[
            {
              required: true,
              message: intl.get("pleaseEnterValidInfo"),
            },
            {
              pattern: /^[A-Za-z\s]+$/,
              message: intl.get("pleaseEnterValidInfo"),
            },
          ]}
          initialValue={record.name_us_en}
        >
          <Input />
        </Form.Item>
      </Form>

      <Form name="optionDetail" form={optionDetailForm}>
        
      </Form>
    </Layout.Content>
  );
}

export default ManageCustomizationInfo;
