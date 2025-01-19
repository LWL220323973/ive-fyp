import React, { useState, useEffect } from "react";
import intl from "react-intl-universal";
import { Form, Input, Layout, Radio, Flex, Table, Button } from "antd";
import { ClearOutlined } from "@ant-design/icons";
import { getStirFry } from "../../../api/Menu";
import "./index.css";

function Drink() {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStirFry("", "", "", "", "");
        response.data.forEach((item) => {
          item.key = item.id;
        });
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const onReset = async () => {
    form.resetFields();
    const response = await getStirFry("", "", "", "", "");
    setData(response.data.map((item, index) => ({ ...item, key: index })));
  };

  const onSearch = async (values) => {
    try {
      console.log(values);
      const response = await getStirFry(
        values.name_zh_HK,
        values.name_en_US,
        values.name_zh_CN,
        values.price,
        values.onSale
      );
      response.data.forEach((item) => {
        item.key = item.id;
      });
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFieldsChange = async (changedFields, allFields) => {
    const values = form.getFieldsValue();
    await onSearch(values);
  };
  return (
    <Layout>
      <h1>{intl.get("stirFry")}</h1>
      <Form
        layout="vertical"
        form={form}
        onFinish={onSearch}
        name="drinkForm"
        onFieldsChange={handleFieldsChange}
      >
        <Flex wrap gap={20} justify="center">
          <Form.Item label={intl.get("name")} name="name_zh_HK">
            <Input size="large" id="name_zh_HK" />
          </Form.Item>
          <Form.Item label={intl.get("nameCN")} name="name_zh_CN">
            <Input size="large" id="name_zh_CN" />
          </Form.Item>
          <Form.Item label={intl.get("nameEN")} name="name_en_US">
            <Input size="large" id="name_en_US" />
          </Form.Item>
          <Form.Item label={intl.get("price")} name="price">
            <Input size="large" id="price" />
          </Form.Item>
          <Form.Item label={intl.get("status")} name="onSale">
            <Radio.Group id="onSale">
              <Radio value="Y">{intl.get("active")}</Radio>
              <Radio value="N">{intl.get("inactive")}</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="&nbsp;">
            <Button icon={<ClearOutlined />} onClick={() => onReset()}>
              {intl.get("reset")}
            </Button>
          </Form.Item>
          <Form.Item label="&nbsp;">
            <Button type="primary" htmlType="submit">
              {intl.get("submit")}
            </Button>
          </Form.Item>
        </Flex>
      </Form>
      <Table
        dataSource={Array.isArray(data) ? data : []}
        scroll={{
          y: 400,
        }}
        virtual
        rowKey={(record) => record.key}
        columns={[
          {
            title: intl.get("name"),
            dataIndex: "name_zh_HK",
            key: "name_zh_HK",
            sorter: (a, b) => a.name_zh_HK.localeCompare(b.name_zh_HK),
          },
          {
            title: intl.get("nameCN"),
            dataIndex: "name_zh_CN",
            key: "name_zh_CN",
            sorter: (a, b) => a.name_zh_CN.localeCompare(b.name_zh_CN),
          },
          {
            title: intl.get("nameEN"),
            dataIndex: "name_en_US",
            key: "name_en_US",
            sorter: (a, b) => a.name_en_US.localeCompare(b.name_en_US),
          },
          {
            title: intl.get("price"),
            dataIndex: "price",
            key: "price",
            sorter: (a, b) => a.price - b.price,
          },
          {
            title: intl.get("status"),
            dataIndex: "onSale",
            key: "onSale",
            sorter: (a, b) => (a.onSale > b.onSale ? 1 : -1),
            render: (onSale) => {
              return onSale === "Y" ? intl.get("active") : intl.get("inactive");
            },
          },
        ]}
      />
    </Layout>
  );
}

export default Drink;
