import React from "react";
import { Form, Input, Button, Space, message } from "antd";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { login, findCurrentAdmin } from "../../api/Admin";
import intl from "react-intl-universal";

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
    if (response.data) {
      sessionStorage.setItem("user", findCurrentAdmin(username).data);
      sessionStorage.setItem("siderCollapsed", false);
      message.success(intl.get("loginSuccess"),1);
      setTimeout(() => {
        navigate("/home");
      }, 1200);
    } else {
      message.error(intl.get("loginFail"));
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
          label={intl.get("userName")}
          name="username"
          rules={[
            {
              required: true,
              message: intl.get("usernameRequired"),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={intl.get("password")}
          name="password"
          rules={[
            {
              required: true,
              message: intl.get("passwordRequired"),
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              {intl.get("login")}
            </Button>
            <Button htmlType="button" onClick={onCancel}>
              {intl.get("cancel")}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
