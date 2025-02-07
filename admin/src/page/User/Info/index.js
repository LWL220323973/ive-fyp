import React, { useState } from "react";
import {
  Form,
  Input,
  Layout,
  Typography,
  Button,
  Row,
  Col,
  message,
  Modal,
} from "antd";
import { ClearOutlined, UserAddOutlined } from "@ant-design/icons";
import Sider from "../../layout/Sider";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import intl from "react-intl-universal";
import "./index.css";
import { registerAdmin, getLatestAdmin } from "../../../api/Admin";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const title = (status) => {
    if (status === "add") {
      return intl.get("addUser");
    } else {
      return intl.get("editUser");
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = async (values) => {
    if (status === "add") {
      const { name_en, name_cn, email, phone_number, address_en, address_cn } =
        values;
      registerAdmin(
        name_en,
        name_cn,
        email,
        phone_number,
        address_en,
        address_cn
      );
      message.success(intl.get("addSuccess"));
      sessionStorage.setItem(
        "latestUserName",
        (await getLatestAdmin()).data.username
      );
      sessionStorage.setItem(
        "latestUserPassword",
        (await getLatestAdmin()).data.username.substring(0, 3) +
          phone_number.substring(4, 8)
      );
      setOpen(!open);
    }
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
      <Form form={form} name="form" layout="vertical" onFinish={onFinish}>
        <Row gutter={[48, 24]}>
          <Col span={12}>
            <Form.Item
              label={intl.get("name_en")}
              name="name_en"
              rules={[
                {
                  required: true,
                  message: intl.get("pleaseEnterValidName"),
                },
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
            <Form.Item
              label={intl.get("name_cn")}
              name="name_cn"
              rules={[
                {
                  required: true,
                  message: intl.get("pleaseEnterValidName"),
                },
              ]}
            >
              <Input size="large" id="name_cn" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[48, 24]}>
          <Col span={12}>
            <Form.Item
              label={intl.get("email")}
              name="email"
              rules={[
                {
                  required: true,
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
              rules={[
                {
                  required: true,
                  pattern: /^[0-9]{8}$/,
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
              rules={[
                {
                  required: true,
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
              rules={[
                {
                  required: true,
                  pattern: /^[a-zA-Z0-9\s\p{P}]*$/u,
                  message: intl.get("pleaseEnterValidAddress"),
                },
              ]}
            >
              <Input size="large" id="address_en" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[48, 24]} justify="center">
          <Col span={10}></Col>
          <Col span={2}>
            <Button icon={<ClearOutlined />} onClick={() => onReset()}>
              {intl.get("reset")}
            </Button>
          </Col>
          <Col span={12}>
            <Button icon={<UserAddOutlined />} type="primary" htmlType="submit">
              {intl.get("submit")}
            </Button>
          </Col>
        </Row>
      </Form>
      <Modal
        open={open}
        onCancel={() => {
          sessionStorage.removeItem("latestUserName");
          sessionStorage.removeItem("latestUserPassword");
          setOpen(!open);
          navigate("..");
        }}
        onOk={() => {
          sessionStorage.removeItem("latestUserName");
          sessionStorage.removeItem("latestUserPassword");
          setOpen(!open);
          navigate("..");
        }}
        title={intl.get("addSuccess")}
      >
        <p>
          {intl.get("userName") +
            ":" +
            sessionStorage.getItem("latestUserName")}
        </p>
        <p>
          {intl.get("password") +
            ":" +
            sessionStorage.getItem("latestUserPassword")}
        </p>
      </Modal>
    </Layout.Content>
  );
}

export default AddUser;
