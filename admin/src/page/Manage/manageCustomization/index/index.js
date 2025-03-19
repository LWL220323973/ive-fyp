import React, { useEffect, useState } from "react";
import { Button, Layout, message, Table, Typography, Space, Modal } from "antd";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import Sider from "../../../layout/Sider";
import Footer from "../../../layout/Footer";
import Header from "../../../layout/Header";
import intl from "react-intl-universal";
import { useNavigate } from "react-router-dom";
import { deleteCustomOptionValueByCustomOptionID } from "../../../../api/CustomOptionValue";
import {
  getAllCustomOption,
  deleteCustomOption,
} from "../../../../api/CustomOption";
import { deleteMenuItemCustomOptionByCustomOptionId } from "../../../../api/MenuItemCustomOptions";
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
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [record, setRecord] = useState({});
  useEffect(() => {
    getAllCustomOption().then((res) => {
      setData(res.data);
    });
  }, []);

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
                  onEdit(record);
                }}
              >
                {intl.get("edit")}
              </Button>
              <Button
                color="danger"
                variant="solid"
                icon={<DeleteOutlined />}
                onClick={() => {
                  setIsOpenConfirm(true);
                  setRecord(record);
                }}
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
          dataIndex: "name_zh_hk",
          key: "name_Zh_HK",
        },
        {
          title: intl.get("zh-cn"),
          dataIndex: "name_zh_cn",
          key: "name_Zh_CN",
        },
        {
          title: intl.get("en-us"),
          dataIndex: "name_us_en",
          key: "name_Us_EN",
        },
      ];
      return [...variableColumns, ...defaultColumns];
    }
  };

  const onEdit = (record) => {
    navigate("./info", { state: { record: record, status: "edit" } });
  };

  const onDelete = async (record) => {
    await deleteCustomOptionValueByCustomOptionID(record.id);
    await deleteMenuItemCustomOptionByCustomOptionId(record.id);
    const result = await deleteCustomOption(record.id);
    if (result.data === 1) {
      message.success(intl.get("deleteSuccess"));
      setTimeout(() => {
        window.location.reload();
      }, 500);
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
      />
      <Modal
        open={isOpenConfirm}
        title={intl.get("deleteCustomOption")}
        okText={intl.get("yes")}
        cancelText={intl.get("no")}
        onCancel={() => setIsOpenConfirm(false)}
        onOk={() => onDelete(record)}
      >
        <Typography.Text>{intl.get("ConfirmDelete")}</Typography.Text>
      </Modal>
      ;
    </Layout.Content>
  );
}

export default ManageCustomization;
