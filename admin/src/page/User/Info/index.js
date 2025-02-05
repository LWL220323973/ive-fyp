import React, { useEffect, useState } from "react";
import { Row, Form, Input, Layout, Typography, Col, Button, Flex } from "antd";
import { ClearOutlined } from "@ant-design/icons";
import Sider from "../../layout/Sider";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import intl from "react-intl-universal";

function AddUser() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider />
      <Layout>
        <Header />
        <UserInfoContent />
        <Footer />
      </Layout>
    </Layout>
  );
}

function UserInfoContent() {
  const status = sessionStorage.getItem("userInfoStatus");
  const [form] = Form.useForm();
  const title = (status) => {
    console.log(status);
    if (status === "add") {
      return intl.get("addUser");
    } else {
      return intl.get("editUser");
    }
  };
  const onReset = () => {
    form.resetFields();
  };
  return (
    <Layout.Content
      style={{
        margin: "12px",
        padding: 12,
        height: "auto",
        width: "auto",
        overflow: "auto",
      }}
    >
      <Form form={form} name="userInfo" layout="vertical">
        <Row gutter={[16, 24]} align="middle">
          <Col span={10}></Col>
          <Col span={4}>
            <Typography.Title level={1}>{title(status)}</Typography.Title>
          </Col>
          <Col span={10}></Col>
        </Row>
        <Row gutter={[16, 24]} align="middle">
          <Col span={2}></Col>
          <Col span={8}>
            <Form.Item label={intl.get("name_en")} name="name_en">
              <Input size="large" id="name_en" />
            </Form.Item>
          </Col>
          <Col span={2}></Col>
          <Col span={8}>
            <Form.Item label={intl.get("name_cn")} name="name_cn">
              <Input size="large" id="name_cn" />
            </Form.Item>
          </Col>
          <Col span={2}></Col>
        </Row>
        <Row align="middle" gutter={[16, 24]}>
          <Col span={2}></Col>
          <Col span={8}>
            <Form.Item label={intl.get("email")} name="email">
              <Input size="large" id="email" />
            </Form.Item>
          </Col>
          <Col span={2}></Col>
          <Col span={8}>
            <Form.Item label={intl.get("phoneNumber")} name="phone_number">
              <Input size="large" id="phone_number" />
            </Form.Item>
          </Col>
          <Col span={2}></Col>
        </Row>
        <Row align="middle" gutter={[16, 24]}>
          <Col span={2}></Col>
          <Col span={8}>
            <Form.Item label={intl.get("address_cn")} name="address_cn">
              <Input size="large" id="address_cn" />
            </Form.Item>
          </Col>
          <Col span={2}></Col>
          <Col span={8}>
            <Form.Item label={intl.get("address_en")} name="address_en">
              <Input size="large" id="address_en" />
            </Form.Item>
          </Col>
          <Col span={2}></Col>
        </Row>
        <Row align="middle" gutter={[16, 24]}>
          <Col span={2}></Col>

          <Col span={8}></Col>
          <Col span={2}>
            <Button icon={<ClearOutlined />} onClick={() => onReset()}>
              {intl.get("reset")}
            </Button>
          </Col>
          <Col span={2}>
            <Button type="primary" htmlType="submit">
              {intl.get("submit")}
            </Button>
          </Col>
          <Col span={8}></Col>
          <Col span={2}></Col>
        </Row>
      </Form>
    </Layout.Content>
  );
}

export default AddUser;
