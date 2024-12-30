import React from "react";
import { Form, Input, Button, Space } from "antd";
import axios from "axios";
import "../style/Login.css";

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function Login() {
  const [form] = Form.useForm();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const response = await axios.post("http://localhost:5555/login", {
        username,
        password,
      });
      if (response.status === 200) {
        alert("Login successful");
      }
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  const onCancel = () => {
    form.resetFields();
  };

  return (
    <div id="Login">
      <Form form={form} id="login-form" onFinish={onSubmit}>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <Button htmlType="button" onClick={onCancel}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
