import React from "react";
import intl from "react-intl-universal";
import { Form, Input, Layout, Radio, Flex, Table, Button } from "antd";
import { ClearOutlined } from "@ant-design/icons";

function Drink() {
  const [form] = Form.useForm();
  const onClear = () => {
    form.resetFields();
  };

  return (
    <Layout>
      <h1>{intl.get("drinks")}</h1>
      <Form layout="vertical" form={form}>
        <Flex wrap gap={20} justify="center">
          <Form.Item label={intl.get("name")} name="name">
            <Input size="large" />
          </Form.Item>
          <Form.Item label={intl.get("price")} name="price">
            <Input size="large" />
          </Form.Item>
          <Form.Item label={intl.get("status")} name="status">
            <Radio.Group>
              <Radio value="Y">{intl.get("active")}</Radio>
              <Radio value="N">{intl.get("inactive")}</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="&nbsp;">
            <Button icon={<ClearOutlined />} onClick={onClear}>
              {intl.get("reset")}
            </Button>
          </Form.Item>
          <Form.Item label="&nbsp;">
            <Button type="primary">{intl.get("submit")}</Button>
          </Form.Item>
        </Flex>
      </Form>
      <Table />
    </Layout>
  );
}

export default Drink;
