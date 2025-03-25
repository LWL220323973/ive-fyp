import React, { useEffect, useMemo, useState } from "react";
import {
  Layout,
  Form,
  Typography,
  Input,
  Checkbox,
  Radio,
  Image,
  InputNumber,
  Select,
  Space,
  Flex,
  Button,
  Upload,
} from "antd";
import {
  UploadOutlined,
  ReloadOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import Sider from "../../layout/Sider";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import { useNavigate, useLocation } from "react-router-dom";
import intl from "react-intl-universal";
import { getAllCustomOption } from "../../../api/CustomOption";
import { getDishesType } from "../../../api/DishesType";
import { getMenuItemCustomOptionByMenuItemId } from "../../../api/MenuItemCustomOptions";
import "./index.css";

function MenuInfo() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider />
      <Layout>
        <Header />
        <MenuInfoContent />
        <Footer />
      </Layout>
    </Layout>
  );
}
function MenuInfoContent() {
  const style = {
    padding: 12,
    height: "auto",
    width: "auto",
    overflow: "auto",
    backgroundColor: "#E2E2E2",
  };

  const navigate = useNavigate();
  const location = useLocation();
  const [customOptionList, setCustomOptionList] = useState([]);
  const [dishesTypeList, setDishesTypeList] = useState([]);

  const record = useMemo(
    () => (location.state && location.state.record) || {},
    [location]
  );

  const status = useMemo(
    () => (location.state && location.state.status) || "",
    [location]
  );
  useEffect(() => {
    getAllCustomOption().then((res) => {
      setCustomOptionList(res.data);
    });
    getDishesType().then((res) => {
      setDishesTypeList(res.data);
    });
    console.log(record.id);
  }, [record, status]);

  const formItem = () => {
    const variableFormItem = [
      {
        label: intl.get("zh-hk"),
        name: "name_zh_HK",
        initialValue: record.name_zh_HK,
        rules: [
          {
            pattern: /^[\u4e00-\u9fa5]+$/,
            message: intl.get("pleaseEnterChinese"),
          },
        ],
      },
      {
        label: intl.get("zh-cn"),
        name: "name_zh_CN",
        initialValue: record.name_zh_CN,
        rules: [
          {
            pattern: /^[\u4e00-\u9fa5]+$/,
            message: intl.get("pleaseEnterChinese"),
          },
        ],
      },
      {
        label: intl.get("en-us"),
        name: "name_en_US",
        initialValue: record.name_en_US,
        rules: [
          {
            pattern: /^[A-Za-z\s]+$/,
            message: intl.get("pleaseEnterEnglish"),
          },
        ],
      },
    ];

    const sortedVariableFormItem =
      localStorage.getItem("locale") === "en-US"
        ? variableFormItem.sort((a) => (a.name === "name_en_US" ? -1 : 1))
        : variableFormItem;

    return (
      <>
        <Flex id="menuInfoFormInfo" justify="space-between">
          <Flex vertical>
            <Image src={record.image} width={300} height={300} />
            <Upload accept=".png,.jpg" maxCount={1}>
              <Button
                type="primary"
                size="large"
                icon={<UploadOutlined />}
                style={{ width: 300, marginTop: "16px" }}
              >
                {intl.get("uploadImage")}
              </Button>
            </Upload>
          </Flex>

          <Flex vertical style={{ marginLeft: "16px", flex: 1 }}>
            {sortedVariableFormItem.map((item) => (
              <Form.Item
                key={item.name}
                label={item.label}
                name={item.name}
                rules={item.rules}
                initialValue={item.initialValue}
              >
                <Input size="large" />
              </Form.Item>
            ))}
            <Space size="large" wrap>
              <Form.Item
                label={intl.get("price")}
                name="price"
                initialValue={record.price}
              >
                <InputNumber size="large" min={0} style={{ width: 100 }} />
              </Form.Item>
              <Form.Item
                label={intl.get("DishesType")}
                name="dishesType"
                initialValue={record.type}
              >
                <Select size="large" style={{ width: 200 }}>
                  {dishesTypeList.map((item, index) => (
                    <Select.Option key={index} value={item.id}>
                      {localStorage.getItem("locale") === "en-US"
                        ? item.name_Us_EN
                        : item.name_Zh_HK}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label={intl.get("status")}
                name="status"
                initialValue={record.onSale}
              >
                <Radio.Group>
                  <Radio value={"Y"}>{intl.get("active")}</Radio>
                  <Radio value={"N"}>{intl.get("inactive")}</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label={intl.get("specialItem")} name="customOption">
                <Checkbox.Group>
                  {customOptionList.map((item, index) => (
                    <Checkbox key={index} value={item.id}>
                      {localStorage.getItem("locale") === "en-US"
                        ? item.name_us_en
                        : item.name_zh_hk}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </Form.Item>
            </Space>
          </Flex>
        </Flex>
        <Space id="menuInfoFormButton" size="large">
          <Button
            id="cancelButton"
            type="primary"
            onClick={() => {
              navigate("..");
            }}
          >
            {intl.get("cancel")}
          </Button>
          <Button
            htmlType="reset"
            color="primary"
            variant="outlined"
            icon={<ReloadOutlined />}
          >
            {intl.get("reset")}
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            icon={status === "edit" ? <EditOutlined /> : <PlusCircleOutlined />}
          >
            {status === "edit" ? intl.get("edit") : intl.get("add")}
          </Button>
        </Space>
      </>
    );
  };

  return (
    <Layout.Content style={style}>
      <Typography.Title level={2}>
        {status === "edit"
          ? intl.get("editMenu") +
            (localStorage.getItem("locale") === "en-US"
              ? record.name_en_US
              : record.name_zh_HK)
          : intl.get("addMenu")}
      </Typography.Title>
      <Form layout="vertical" id="menuInfoForm">
        {formItem()}
      </Form>
    </Layout.Content>
  );
}
export default MenuInfo;
