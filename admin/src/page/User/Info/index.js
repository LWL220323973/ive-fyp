import React from "react";
import { Form, Input, Layout, Typography, Button, Row, Col } from "antd";
import { ClearOutlined, UserAddOutlined } from "@ant-design/icons";
import Sider from "../../layout/Sider";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import intl from "react-intl-universal";
import "./index.css";
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
      <Row gutter={[48, 24]}>
        <Col span={10}></Col>
        <Col span={4}>
          <Typography.Title level={1}>{title(status)}</Typography.Title>
        </Col>
        <Col span={10}></Col>
      </Row>
      <Form form={form} name="form" layout="vertical">
        <Row gutter={[48, 24]}>
          <Col span={12}>
            <Form.Item
              label={intl.get("name_en")}
              name="name_en"
              required
              rules={[
                {
                  pattern: /^[a-zA-Z\s]*$/,
                  message: intl.get("pleaseEnterValidName"),
                },
              ]}
            >
              <Input size="large" id="name_en" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={intl.get("name_cn")} name="name_cn">
              <Input size="large" id="name_cn" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[48, 24]}>
          <Col span={12}>
            <Form.Item
              label={intl.get("email")}
              name="email"
              required
              rules={[
                {
                  type: "email",
                  message: intl.get("pleaseEnterValidEmail"),
                },
              ]}
            >
              <Input size="large" id="email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={intl.get("phoneNumber")}
              name="phone_number"
              required
              rules={[
                {
                  pattern: /^[0-9]*$/,
                  message: intl.get("pleaseEnterValidPhoneNumber"),
                },
              ]}
            >
              <Input size="large" id="phone_number" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[48, 24]}>
          <Col span={12}>
            <Form.Item
              label={intl.get("address_cn")}
              name="address_cn"
              required
              rules={[
                {
                  pattern: /^[\u4e00-\u9fa5\d\p{P}]*$/u,
                  message: intl.get("pleaseEnterValidAddress"),
                },
              ]}
            >
              <Input size="large" id="address_cn" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={intl.get("address_en")}
              name="address_en"
              required
              rules={[
                {
                  pattern: /^[a-zA-Z0-9\s\p{P}]*$/u,
                  message: intl.get("pleaseEnterValidAddress"),
                },
              ]}
            >
              <Input size="large" id="address_en" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Row gutter={[48, 24]} justify="center">
        <Col span={10}></Col>
        <Col span={2}>
          <Button icon={<ClearOutlined />} onClick={() => onReset()}>
            {intl.get("reset")}
          </Button>
        </Col>
        <Col span={12}>
          <Button icon={<UserAddOutlined />} type="primary">
            {intl.get("submit")}
          </Button>
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default AddUser;
