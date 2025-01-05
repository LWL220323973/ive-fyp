import React from "react";
import { Form, Input, Button, Space, message } from "antd";
import "../style/Login.css";
import { useNavigate } from "react-router-dom";
import { login } from "../api/Login";

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function Login() {
  sessionStorage.removeItem("messageDisplayed");
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const { username, password } = values;
    const response = await login(username, password);
    if (response.data != "") {
      sessionStorage.setItem("user", JSON.stringify(response.data));
      message.success("Login successful!", 1);
      setTimeout(() => {
        navigate("/home");
      }, 1200);
    } else {
      message.error("Login failed!");
      form.resetFields();
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
