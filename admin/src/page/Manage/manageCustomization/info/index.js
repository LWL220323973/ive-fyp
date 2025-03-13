import React, { useEffect, useMemo, useState } from "react";
import {
  Form,
  Layout,
  message,
  Row,
  Typography,
  Input,
  Table,
  InputNumber,
  Button,
  Modal,
} from "antd";
import {
  RedoOutlined,
  SendOutlined,
  PlusCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Sider from "../../../layout/Sider";
import Footer from "../../../layout/Footer";
import Header from "../../../layout/Header";
import intl from "react-intl-universal";
import { useNavigate, useLocation } from "react-router-dom";
import "./index.css";
import { useForm } from "antd/es/form/Form";
import {
  getCustomOptionValue,
  addCustomOptionValue,
  deleteCustomOptionValueByCustomOptionID,
} from "../../../../api/CustomOptionValue";
import {
  editCustomOption,
  deleteCustomOption,
  insertCustomOption,
  getLastCustomOptionID,
} from "../../../../api/CustomOption";
import { deleteMenuItemCustomOptionByCustomOptionId } from "../../../../api/MenuItemCustomOptions";

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
  const [customOptionValue, setCustomOptionValue] = useState([]); // option value
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const record = useMemo(
    () => (location.state && location.state.record) || {},
    [location]
  );

  const status = useMemo(
    () => (location.state && location.state.status) || "",
    [location]
  );

  const [optionBasicInfoForm] = useForm();

  const columns = () => {
    const defaultPart = [
      {
        title: intl.get("priceAdjustment"),
        dataIndex: "price_adjustment",
        key: "price_adjustment",
        render: (text, record) => {
          return (
            <Form.Item
              name={["data", record.id, "price_adjustment"]}
              initialValue={text}
            >
              <InputNumber />
            </Form.Item>
          );
        },
      },
      {
        title: "",
        render: (record, _, index) => {
          if (index === 0) return null;
          return (
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              onClick={() => {
                const newData = customOptionValue
                  .filter((item) => item.id !== record.id)
                  .map((item, index) => ({
                    ...item,
                    id: index,
                  }));
                console.log(newData);
                setCustomOptionValue(newData);
              }}
            >
              {intl.get("delete")}
            </Button>
          );
        },
      },
    ];
    if (localStorage.getItem("locale") === "en-US") {
      const variablePart = [
        {
          title: intl.get("en-us"),
          dataIndex: "value_us_en",
          key: "value_us_en",
          render: (text, record) => {
            return (
              <Form.Item
                name={["data", record.id, "value_us_en"]}
                initialValue={text}
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
              >
                <Input allowClear />
              </Form.Item>
            );
          },
        },
        {
          title: intl.get("zh-hk"),
          dataIndex: "value_zh_hk",
          key: "value_zh_hk",
          render: (text, record) => {
            return (
              <Form.Item
                name={["data", record.id, "value_zh_hk"]}
                initialValue={text}
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
              >
                <Input allowClear />
              </Form.Item>
            );
          },
        },
        {
          title: intl.get("zh-cn"),
          dataIndex: "value_zh_cn",
          key: "value_zh_cn",
          render: (text, record) => {
            return (
              <Form.Item
                name={["data", record.id, "value_zh_cn"]}
                initialValue={text}
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
              >
                <Input allowClear />
              </Form.Item>
            );
          },
        },
      ];
      return [...variablePart, ...defaultPart];
    } else {
      const variablePart = [
        {
          title: intl.get("zh-hk"),
          dataIndex: "value_zh_hk",
          key: "value_zh_hk",
          render: (text, record) => {
            return (
              <Form.Item
                name={["data", record.id, "value_zh_hk"]}
                initialValue={text}
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
              >
                <Input allowClear />
              </Form.Item>
            );
          },
        },
        {
          title: intl.get("zh-cn"),
          dataIndex: "value_zh_cn",
          key: "value_zh_cn",
          render: (text, record) => {
            return (
              <Form.Item
                name={["data", record.id, "value_zh_cn"]}
                initialValue={text}
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
              >
                <Input allowClear />
              </Form.Item>
            );
          },
        },
        {
          title: intl.get("en-us"),
          dataIndex: "value_us_en",
          key: "value_us_en",
          render: (text, record) => {
            return (
              <Form.Item
                name={["data", record.id, "value_us_en"]}
                initialValue={text}
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
              >
                <Input allowClear />
              </Form.Item>
            );
          },
        },
      ];
      return [...variablePart, ...defaultPart];
    }
  };

  const optionBasicInfo = () => {
    if (localStorage.getItem("locale") === "en-US") {
      return (
        <>
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
        </>
      );
    } else {
      return (
        <>
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
        </>
      );
    }
  };

  const onRest = () => {
    window.location.reload();
  };

  const onAdd = () => {
    const newData = {
      id: customOptionValue.length,
      value_zh_hk: "",
      value_zh_cn: "",
      value_us_en: "",
      price_adjustment: 0,
    };
    setCustomOptionValue([...customOptionValue, newData]);
  };

  const onSubmit = async () => {
    const optionBasicInfo = optionBasicInfoForm.getFieldsValue();
    const { name_us_en, name_zh_hk, name_zh_cn, data } = optionBasicInfo;
    if (data === undefined) {
      message.error(intl.get("emptyCustomOptionValue"));
      onAdd();
      return;
    }
    var count = 0;
    if (status === "edit") {
      const customOptionResult = await editCustomOption(name_us_en, name_zh_hk, name_zh_cn, record.id);
      if (customOptionResult.data !== 1) {
        message.warning(intl.get("customOptionExist"));
        return;
      }
      const oldData = await getCustomOptionValue(record.id);
      const res = await deleteCustomOptionValueByCustomOptionID(record.id);

      if (res.data > 0) {
        const optionValue = data
          .filter((item) => item)
          .map((item) => {
            return {
              value_us_en: item.value_us_en,
              value_zh_hk: item.value_zh_hk,
              value_zh_cn: item.value_zh_cn,
              price_adjustment: item.price_adjustment,
              custom_option_id: record.id,
            };
          });
        for (const element of optionValue) {
          const result = await addCustomOptionValue(element);
          if (result.data !== 1) {
            console.log(oldData);
            await deleteCustomOptionValueByCustomOptionID(record.id);
            for (const item of oldData.data) {
              await addCustomOptionValue(item);
            }
            setCustomOptionValue(
              optionValue.map((item, index) => ({
                ...item,
                id: index,
              }))
            );
            message.error(intl.get("customOptionValueExist"));
            return;
          }
        }
      }
    } else {
      const result = await insertCustomOption(
        name_us_en,
        name_zh_hk,
        name_zh_cn
      );
      if (result.data === 1) {
        const id = (await getLastCustomOptionID()).data;
        const optionValue = data
          .filter((item) => item)
          .map((item) => {
            return {
              value_us_en: item.value_us_en,
              value_zh_hk: item.value_zh_hk,
              value_zh_cn: item.value_zh_cn,
              price_adjustment: item.price_adjustment,
              custom_option_id: id,
            };
          });
        count = 0;
        for (const element of optionValue) {
          const r = (await addCustomOptionValue(element)).data;
          if (r === 1) {
            count++;
          }
        }
        if (count === optionValue.length) {
          message.success(intl.get("addSuccess"));
          setTimeout(() => {
            navigate("..");
          }, 2000);
        } else {
          message.error(intl.get("customOptionValueExist"));
          await deleteCustomOptionValueByCustomOptionID(id);
          await deleteCustomOption(id);
          return;
        }
      } else {
        message.warning(intl.get("customOptionExist"));
      }
    }
  };

  const onDelete = async () => {
    const res = await deleteCustomOptionValueByCustomOptionID(record.id);
    if (res.data > 0) {
      const result = await deleteMenuItemCustomOptionByCustomOptionId(
        record.id
      );
      if (result.data > 0) {
        const result = await deleteCustomOption(record.id);
        if (result.data === 1) {
          message.success(intl.get("deleteSuccess"));
          setTimeout(() => {
            navigate("..");
          }, 2000);
        }
      }
    }
  };

  const onCancel = () => {
    navigate("..");
  };

  useEffect(() => {
    if (status === "edit") {
      getCustomOptionValue(record.id).then((res) => {
        const dataWithId = res.data.map((item, index) => ({
          ...item,
          id: index,
        }));
        setCustomOptionValue(dataWithId);
      });
    }
  }, [status, record]);

  return (
    <Layout.Content style={style}>
      <Row>
        <Typography.Title level={2}>
          {status === "edit"
            ? intl.get("editCustomOption")
            : intl.get("addCustomOption")}
        </Typography.Title>
      </Row>
      <Form
        name="optionBasicInfo"
        form={optionBasicInfoForm}
        onFinish={onSubmit}
      >
        {optionBasicInfo()}
        <Table
          id="optionDetail"
          dataSource={Array.isArray(customOptionValue) ? customOptionValue : []}
          pagination={{
            position: ["bottomCenter"],
          }}
          virtual
          row
          bordered={true}
          columns={columns()}
          rowKey={(record) => record.id}
        />
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          id="btnAdd"
          onClick={onAdd}
        >
          {intl.get("add")}
        </Button>
        <Button
          type="primary"
          id="btnSubmit"
          icon={<SendOutlined />}
          htmlType="submit"
        >
          {intl.get("submit")}
        </Button>
        <Button
          id="btnDelete"
          icon={<DeleteOutlined />}
          onClick={() => setIsOpenConfirm(true)}
          disabled={status === "add"}
        >
          {intl.get("delete")}
        </Button>
        <Button id="btnReset" icon={<RedoOutlined />} onClick={onRest}>
          {intl.get("reset")}
        </Button>
        <Button
          id="btnCancel"
          icon={<CloseCircleOutlined />}
          onClick={onCancel}
        >
          {intl.get("cancel")}
        </Button>
      </Form>
      <Modal
        open={isOpenConfirm}
        title={intl.get("deleteCustomOption")}
        okText={intl.get("yes")}
        cancelText={intl.get("no")}
        onCancel={() => setIsOpenConfirm(false)}
        onOk={() => onDelete()}
      >
        <Typography.Text>{intl.get("ConfirmDelete")}</Typography.Text>
      </Modal>
    </Layout.Content>
  );
}

export default ManageCustomizationInfo;
