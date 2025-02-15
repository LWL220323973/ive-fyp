import React, { useEffect, useState } from "react";
import { Layout, Form, Typography, Table, Input, Button, Row, Col } from "antd";
import { ClearOutlined, UserAddOutlined } from "@ant-design/icons";
import intl from "react-intl-universal";
import Sider from "../../layout/Sider";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import { findInAdmin } from "../../../api/Admin";
import { useNavigate } from "react-router-dom";
import "./index.css";

function Menu() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider />
      <Layout>
        <Header />
        <UserContent />
        <Footer />
      </Layout>
    </Layout>
  );
}

function UserContent() {
  const [form] = Form.useForm(); // 確保 form 已正確初始化
  const [data, setData] = useState([]); //the list of dishes
  const navigate = useNavigate();

  const style = {
    padding: 12,
    height: "auto",
    width: "auto",
    overflow: "auto",
    backgroundColor: "#E2E2E2",
  };

  const columns = () => {
    if (localStorage.getItem("locale") === "en-US") {
      return [
        {
          title: intl.get("staffId"),
          dataIndex: "staff_id",
          key: "staff_id",
          sorter: (a, b) => a.staff_id.localeCompare(b.name_zh_HK),
        },
        {
          title: intl.get("name_en"),
          dataIndex: "name_en",
          key: "name_en",
          sorter: (a, b) => a.name_en.localeCompare(b.name_en),
        },
        {
          title: intl.get("name_cn"),
          dataIndex: "name_cn",
          key: "name_cn",
          sorter: (a, b) => a.name_cn.localeCompare(b.name_cn),
        },
        {
          title: intl.get("email"),
          dataIndex: "email",
          key: "email",
          sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
          title: intl.get("phoneNumber"),
          dataIndex: "phone_number",
          key: "phone_number",
          sorter: (a, b) => a.phone_number.localeCompare(b.phone_number),
        },
      ];
    } else {
      return [
        {
          title: intl.get("staffId"),
          dataIndex: "staff_id",
          key: "staff_id",
          sorter: (a, b) => a.staff_id.localeCompare(b.name_zh_HK),
        },
        {
          title: intl.get("name_cn"),
          dataIndex: "name_cn",
          key: "name_cn",
          sorter: (a, b) => a.name_zh_HK.localeCompare(b.name_zh_HK),
        },
        {
          title: intl.get("name_en"),
          dataIndex: "name_en",
          key: "name_en",
          sorter: (a, b) => a.name_zh_HK.localeCompare(b.name_zh_HK),
        },
        {
          title: intl.get("email"),
          dataIndex: "email",
          key: "email",
          sorter: (a, b) => a.name_zh_HK.localeCompare(b.name_zh_HK),
        },
        {
          title: intl.get("phoneNumber"),
          dataIndex: "phone_number",
          key: "phone_number",
          sorter: (a, b) => a.phone_number.localeCompare(b.phone_number),
        },
      ];
    }
  };

  const formItem = (local) => {
    if (local === "en-US") {
      return (
        <>
          <Col span={3}>
            <Form.Item label={intl.get("name_cn")} name="name_cn">
              <Input size="large" id="name_cn" />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item label={intl.get("name_en")} name="name_en">
              <Input size="large" id="name_en" />
            </Form.Item>
          </Col>
        </>
      );
    } else {
      return (
        <>
          <Col span={3}>
            <Form.Item label={intl.get("name_cn")} name="name_cn">
              <Input size="large" id="name_cn" />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item label={intl.get("name_en")} name="name_en">
              <Input size="large" id="name_en" />
            </Form.Item>
          </Col>
        </>
      );
    }
  };

  useEffect(() => {
    onSearch({});
  }, []);

  const onSearch = async (values) => {
    const { staff_id, name_en, name_cn, email, phone_number } = values;
    const res = await findInAdmin(
      staff_id,
      name_en,
      name_cn,
      email,
      phone_number
    );
    setData(res.data);
  };

  const onReset = () => {
    form.resetFields();
    onSearch({});
  };

  return (
    <Layout.Content style={style}>
      <Row justify="space-between" align="middle">
        <Col>
          <Typography.Title level={2}>{intl.get("user")}</Typography.Title>
        </Col>
        <Col>
          <Button
            type="primary"
            name="btnAddUser"
            onClick={() => {
              sessionStorage.setItem("userInfoStatus", "add");
              navigate("userInfo");
            }}
          >
            <UserAddOutlined />
            {intl.get("addUser")}
          </Button>
        </Col>
      </Row>
      <Row justify="space-between" align="middle">
        <Form form={form} name="userForm" layout="vertical" onFinish={onSearch}>
          <Row justify="center" align="middle" gutter={[16, 16]}>
            <Col span={3}>
              <Form.Item label={intl.get("staffId")} name="staff_id">
                <Input size="large" id="staff_id" />
              </Form.Item>
            </Col>
            {formItem(localStorage.getItem("locale"))}
            <Col span={5}>
              <Form.Item label={intl.get("email")} name="email">
                <Input size="large" id="email" />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label={intl.get("phoneNumber")} name="phone_number">
                <Input size="large" id="phone_number" />
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item label="&nbsp;" style={{ order: 6 }}>
                <Button icon={<ClearOutlined />} onClick={() => onReset()}>
                  {intl.get("reset")}
                </Button>
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item label="&nbsp;" style={{ order: 7 }}>
                <Button type="primary" htmlType="submit">
                  {intl.get("submit")}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Row>
      <Row justify="end" align="middle">
        <Table
          dataSource={Array.isArray(data) ? data : []}
          scroll={{
            scrollToFirstRowOnChange: true,
            y: "calc(100vh - 300px)",
          }}
          virtual
          rowKey={(record) => record.id}
          columns={columns()}
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
            position: ["bottomCenter"],
          }}
          bordered={true}
          onRow={(record) => {
            return {
              onClick: () => {
                sessionStorage.setItem("userInfoStatus", "edit");
                navigate("userInfo", { state: { record: record } });
              },
            };
          }}
        />
      </Row>
    </Layout.Content>
  );
}

export default Menu;
