import React, { useEffect, useState } from "react";
import { Button, Layout, message, Table, Typography } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import Sider from "../../../layout/Sider";
import Footer from "../../../layout/Footer";
import Header from "../../../layout/Header";
import intl from "react-intl-universal";
import { useNavigate } from "react-router-dom";
import { getAllCustomOption } from "../../../../api/CustomOption";
import "./index.css";

function ManageCustomization() {
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

  const [data, setData] = useState([]);

  useEffect(() => {
    getAllCustomOption().then((res) => {
      setData(res.data);
    });
  }, []);

  const columns = () => {
    if (localStorage.getItem("locale") === "en-US") {
      return [
        {
          title: intl.get("en-us"),
          dataIndex: "name_us_en",
          key: "name_us_en",
          sorter: (a, b) => a.name_us_en.localeCompare(b.name_us_en),
        },
        {
          title: intl.get("zh-hk"),
          dataIndex: "name_zh_hk",
          key: "name_zh_hk",
          sorter: (a, b) => a.name_zh_hk.localeCompare(b.name_zh_hk),
        },
        {
          title: intl.get("zh-cn"),
          dataIndex: "name_zh_cn",
          key: "name_zh_cn",
          sorter: (a, b) => a.name_zh_cn.localeCompare(b.name_zh_cn),
        },
      ];
    } else {
      return [
        {
          title: intl.get("zh-hk"),
          dataIndex: "name_zh_hk",
          key: "name_zh_hk",
          sorter: (a, b) => a.name_zh_hk.localeCompare(b.name_zh_hk),
        },
        {
          title: intl.get("zh-cn"),
          dataIndex: "name_zh_cn",
          key: "name_zh_cn",
          sorter: (a, b) => a.name_zh_cn.localeCompare(b.name_zh_cn),
        },
        {
          title: intl.get("en-us"),
          dataIndex: "name_us_en",
          key: "name_us_en",
          sorter: (a, b) => a.name_us_en.localeCompare(b.name_us_en),
        },
      ];
    }
  };

  return (
    <Layout.Content style={style}>
      <Typography.Title level={1}>
        {intl.get("specialItem")}
        <Button
          type="primary"
          style={{ float: "right" }}
          icon={<PlusCircleOutlined />}
          onClick={() => {
            navigate("info", { state: { status: "add" } });
          }}
        >
          {intl.get("add")}
        </Button>
      </Typography.Title>
      <Table
        id="customizationTable"
        dataSource={Array.isArray(data) ? data : []}
        pagination={{
          position: ["bottomCenter"],
        }}
        virtual
        row
        bordered={true}
        columns={columns()}
        rowKey={(record) => record.id}
        onRow={(record) => {
          return {
            onClick: () => {
              navigate("./info", { state: { record: record, status: "edit" } });
            },
          };
        }}
      />
    </Layout.Content>
  );
}

export default ManageCustomization;
