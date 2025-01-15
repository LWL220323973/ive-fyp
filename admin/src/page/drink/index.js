import React, { useState, useEffect } from "react";
import intl from "react-intl-universal";
import { Form, Input, Layout, Radio, Button, Table, Flex } from "antd";
import { ClearOutlined } from "@ant-design/icons";
import { getDrink } from "../../api/Drink";

function Drink() {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getDrink();
      setData(response.data.map((item, index) => ({ ...item, key: index })));
    };
    fetchData();
  }, []);

  const onFinish = async (values) => {
    console.log(values);
    const response = await getDrink(
      values.name_zh_HK,
      values.name_en_US,
      values.name_zh_CN,
      values.price,
      values.onSale
    );
    setData(response.data.map((item, index) => ({ ...item, key: index })));
  };

  return (
    <Layout>
      <h1>{intl.get("drinks")}</h1>
      <Form layout="vertical" form={form} onFinish={onFinish}>
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
            <Button icon={<ClearOutlined />} htmlType="reset">
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
        rowKey={(record) => record.key} // 確保每個子元素都有唯一的 key 屬性
        scroll={{ y: 400 }}
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
            render: (onSale) =>
              onSale ? intl.get("active") : intl.get("inactive"),
          },
        ]}
        pagination={{ pageSize: 10 }}
      />
    </Layout>
  );
}

export default Drink;
