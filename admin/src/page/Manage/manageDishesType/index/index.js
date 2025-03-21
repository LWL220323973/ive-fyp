import React, { useEffect, useState } from "react";
import { Button, Layout, message, Space, Table, Typography } from "antd";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import Sider from "../../../layout/Sider";
import Footer from "../../../layout/Footer";
import Header from "../../../layout/Header";
import intl from "react-intl-universal";
import { useNavigate } from "react-router-dom";
import { deleteDishesType, getDishesType } from "../../../../api/DishesType";
import "./index.css";

function ManageDishesType() {
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
  const [dishTypeList, setDishTypeList] = useState([]);

  const columns = () => {
    const defaultColumns = [
      {
        title: "",
        render: (record) => {
          return (
            <Space size="middle">
              <Button
                color="primary"
                variant="outlined"
                onClick={() => {
                  navigate("./info", {
                    state: { record: record, status: "edit" },
                  });
                }}
              >
                {intl.get("edit")}
              </Button>
              <Button
                color="danger"
                variant="solid"
                icon={<DeleteOutlined />}
                onClick={() => onDelete(record)}
              >
                {intl.get("delete")}
              </Button>
            </Space>
          );
        },
      },
    ];
    if (localStorage.getItem("locale") === "en-US") {
      const variableColumns = [
        {
          title: intl.get("en-us"),
          dataIndex: "name_Us_EN",
          key: "name_Us_EN",
        },
        {
          title: intl.get("zh-hk"),
          dataIndex: "name_Zh_HK",
          key: "name_Zh_HK",
        },
        {
          title: intl.get("zh-cn"),
          dataIndex: "name_Zh_CN",
          key: "name_Zh_CN",
        },
      ];
      return [...variableColumns, ...defaultColumns];
    } else {
      const variableColumns = [
        {
          title: intl.get("zh-hk"),
          dataIndex: "name_Zh_HK",
          key: "name_Zh_HK",
        },
        {
          title: intl.get("zh-cn"),
          dataIndex: "name_Zh_CN",
          key: "name_Zh_CN",
        },
        {
          title: intl.get("en-us"),
          dataIndex: "name_Us_EN",
          key: "name_Us_EN",
        },
      ];
      return [...variableColumns, ...defaultColumns];
    }
  };

  const onDelete = async (record) => {
    const { id } = record;
    const res = await deleteDishesType(id);
    if (res.data === 1) {
      message.success(intl.get("deleteDishesTypeSuccess"));
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      message.error(intl.get("deleteDishesTypeFailed"));
    }
  };

  useEffect(() => {
    getDishesType().then((res) => {
      setDishTypeList(res.data);
    });
  }, []);

  return (
    <Layout.Content style={style}>
      <Typography.Title level={2}>
        {intl.get("DishesType")}
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
        id="dishTypeTable"
        dataSource={Array.isArray(dishTypeList) ? dishTypeList : []}
        pagination={{
          position: ["bottomCenter"],
        }}
        virtual
        row
        bordered={true}
        columns={columns()}
        rowKey={(record) => record.id}
      />
    </Layout.Content>
  );
}

export default ManageDishesType;
