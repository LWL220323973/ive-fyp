import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Layout,
  Typography,
  Button,
  Row,
  Col,
  message,
  Upload,
  Flex,
} from "antd";
import {
  ClearOutlined,
  UserAddOutlined,
  DownloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import Sider from "../../layout/Sider";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import intl from "react-intl-universal";
import "./index.css";
import { registerAdmin, updateAdmin } from "../../../api/Admin";
import { useNavigate, useLocation } from "react-router-dom";

function UserInfo() {
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
  const location = useLocation();
  const { record } = location.state || {};
  const [form] = Form.useForm();
  const navigate = useNavigate();
  // const [open, setOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const title = (status) => {
    if (status === "add") {
      return intl.get("addUser");
    } else {
      return intl.get("editUser");
    }
  };

  const onReset = () => {
    if (status === "edit") {
      form.setFieldsValue({
        name_en: record.name_en,
        name_cn: record.name_cn,
        email: record.email,
        phone_number: record.phone_number,
        address_en: record.address_en,
        address_cn: record.address_cn,
      });
    } else {
      form.resetFields();
    }
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
    } else {
      const { name_en, name_cn, email, phone_number, address_en, address_cn } =
        values;
      const id = record.id;
      const staff_id = record.staff_id;
      if (
        (
          await updateAdmin(
            id,
            staff_id,
            name_en,
            name_cn,
            email,
            phone_number,
            address_en,
            address_cn
          )
        ).data === 1
      ) {
        message.success(intl.get("editSuccess"));
        setTimeout(() => {
          navigate("..");
        }, 3000);
      }
    }
  };

  useEffect(() => {
    if (status === "edit") {
      form.setFieldsValue({
        name_en: record.name_en,
        name_cn: record.name_cn,
        email: record.email,
        phone_number: record.phone_number,
        address_en: record.address_en,
        address_cn: record.address_cn,
      });
      location.state = {};
    }
  }, [record, form, status, location]);

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
        <Col span={6}></Col>
        <Col span={4}>
          {status === "add" ? (
            <Typography.Title level={1}>
              <Button
                onClick={() => {
                  setIsHidden(!isHidden);
                }}
                type="primary"
              >
                {isHidden
                  ? intl.get("AddUserByForm")
                  : intl.get("AddUserByExcel")}
              </Button>
            </Typography.Title>
          ) : null}
        </Col>
      </Row>
      <Form
        form={form}
        name="form"
        layout="vertical"
        onFinish={onFinish}
        hidden={isHidden}
      >
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
                {
                  pattern: /^[\u4e00-\u9fa5\s]*$/,
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
      <Form hidden={!isHidden} name="form" layout="vertical">
        <Flex justify="center">
          <Form.Item>
            <a href="http://localhost:8080/api/admin/downloadExcel/UserInfo.xlsx" download>
              <Button type="primary" icon={<DownloadOutlined />} size="large">
                {intl.get("getTemplate")}
              </Button>
            </a>
          </Form.Item>
        </Flex>
        <Flex justify="center">
          <Form.Item>
            <Upload
              accept=".xlsx"
              maxCount={1}
              action="" // Set your upload endpoint here
            >
              <Button
                type="primary"
                size="large"
                icon={<UploadOutlined />}
                style={{ width: "100%" }}
              >
                {intl.get("uploadExcel")}
              </Button>
            </Upload>
          </Form.Item>
        </Flex>
      </Form>
    </Layout.Content>
  );
}

export default UserInfo;
