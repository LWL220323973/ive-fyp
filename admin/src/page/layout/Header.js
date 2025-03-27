import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Layout,
  message,
  Avatar,
  Modal,
  Tooltip,
  Typography,
  Flex,
  Input,
  Form,
  Space,
} from "antd";
import Icon, {
  UserOutlined,
  TranslationOutlined,
  EditOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import intl from "react-intl-universal";
import {
  getSystemsProfile,
  updateRestaurantName,
} from "../../api/GetSystemsProfile";
import { checkPassword, changePasswordAndInfo } from "../../api/Admin";
import "./layout.css";

function Header() {
  const LogoutSvg = () => (
    <svg
      t="1735564006064"
      className="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2547"
      width="24"
      height="24"
    >
      <path
        d="M972.8 512l-307.2-256 0 153.6-358.4 0 0 204.8 358.4 0 0 153.6 307.2-256zM153.6 153.6l409.6 0 0-102.4-409.6 0c-56.32 0-102.4 46.08-102.4 102.4l0 716.8c0 56.32 46.08 102.4 102.4 102.4l409.6 0 0-102.4-409.6 0 0-716.8z"
        fill="#000000"
        p-id="2548"
      ></path>
    </svg>
  );
  const navigate = useNavigate();
  const [openLogout, setOpenLogout] = useState(false);
  const messageDisplayedRef = useRef(false);
  const [systemProfile, setSystemProfile] = useState(null);
  const [openRestaurantNameModal, setOpenRestaurantNameModal] = useState(false);
  const [openPersonalInfo, setOpenPersonalInfo] = useState(false);
  const [editRestaurantNameForm] = Form.useForm();
  const [personalInfoForm] = Form.useForm();
  useEffect(() => {
    const fetchSystemProfile = async () => {
      try {
        const response = await getSystemsProfile();
        setSystemProfile(response.data);
      } catch (error) {
        console.error("Error fetching system profile:", error);
      }
    };

    fetchSystemProfile();
  }, []);

  const onLogout = () => {
    sessionStorage.clear();
    message.success(intl.get("logoutSuccess"), 1);
    navigate("/");
  };

  useEffect(() => {
    if (
      sessionStorage.getItem("user") === null &&
      !messageDisplayedRef.current
    ) {
      message.error("Please login first", 1);
      messageDisplayedRef.current = true;
      navigate("/");
    }
  }, [navigate]);

  const changeLocale = () => {
    const newLocale =
      intl.getInitOptions().currentLocale === "en-US" ? "zh-HK" : "en-US";
    localStorage.setItem("locale", newLocale);
    window.location.reload();
  };

  const getRestaurantName = () => {
    if (!systemProfile) return "Restaurant";

    const currentLocale = intl.getInitOptions().currentLocale;
    switch (currentLocale) {
      case "zh-HK":
        return systemProfile.restaurantNameZhHK;
      case "en-US":
        return systemProfile.restaurantNameUsEN;
      default:
        return systemProfile.restaurantNameZhHK;
    }
  };

  const handleEditRestaurantName = () => {
    if (systemProfile) {
      editRestaurantNameForm.setFieldsValue({
        restaurantNameZhHK: systemProfile.restaurantNameZhHK,
        restaurantNameZhCN: systemProfile.restaurantNameZhCN,
        restaurantNameUsEN: systemProfile.restaurantNameUsEN,
      });
      setOpenRestaurantNameModal(true);
    }
  };

  const handleUpdateRestaurantName = async () => {
    try {
      const values = await editRestaurantNameForm.validateFields();
      const updatedProfile = {
        id: systemProfile.id,
        restaurantNameZhHK: values.restaurantNameZhHK,
        restaurantNameZhCN: values.restaurantNameZhCN,
        restaurantNameUsEN: values.restaurantNameUsEN,
      };

      const response = await updateRestaurantName(updatedProfile);
      setSystemProfile(response.data);
      message.success(intl.get("updateSuccess") || "Updated successfully");
      setOpenRestaurantNameModal(false);
    } catch (error) {
      console.error("Failed to update restaurant name:", error);
      message.error(intl.get("updateFailed") || "Update failed");
    }
  };

  const record = JSON.parse(sessionStorage.getItem("user"));

  const passwordInputCheck = (newPassword) => {
    const rules = [
      /^.{8,16}$/, // Length between 8 and 16 characters
      /^(?=.*[A-Z])/, // At least 1 uppercase alphabet
      /^(?=.*[a-z])/, // At least 1 lowercase alphabet
      /^(?=.*[0-9])/, // At least 1 digit
      /^(?=.*[!@_-])/, // At least 1 special character (!, @, _, -)
      /^(?!.*\s)/, // No spaces
    ];

    const ruleMessages = [
      intl.get("passwordRule1"),
      intl.get("passwordRule2"),
      intl.get("passwordRule3"),
      intl.get("passwordRule4"),
      intl.get("passwordRule5"),
      intl.get("passwordRule6"),
    ];

    const updatedRules = rules.map((rule, index) => ({
      rule,
      message: rule.test(newPassword) ? (
        <Typography.Text type="success" key={index}>
          <CheckCircleOutlined />
          {ruleMessages[index]}
        </Typography.Text>
      ) : (
        <Typography.Text type="danger" key={index}>
          <CloseCircleOutlined />
          {ruleMessages[index]}
        </Typography.Text>
      ),
    }));

    return updatedRules; // 返回規則數組
  };
  const [passwordRules, setPasswordRules] = useState(passwordInputCheck(""));

  const formItem = () => {
    return (
      <>
        <Typography.Title level={5}>
          {intl.get("staffId") + ": " + record.staff_id}
        </Typography.Title>
        <Typography.Title level={5}>
          {intl.get("username") + ": " + record.username}
        </Typography.Title>

        <Form.Item
          label={intl.get("email")}
          name="email"
          initialValue={record.email}
          rules={[
            {
              required: true,
              type: "email",
              message: intl.get("pleaseEnterValidEmail"),
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label={intl.get("phoneNumber")}
          name="phone_number"
          initialValue={record.phone_number}
          rules={[
            {
              required: true,
              pattern: /^[0-9]{1,8}$/,
              message: intl.get("pleaseEnterValidPhoneNumber"),
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label={intl.get("oldPassword")}
          name="oldPassword"
          rules={[
            {
              required: true,
              message: intl.get("pleaseEnterValidInfo"),
            },
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>
        <Form.Item
          label={intl.get("newPassword")}
          name="newPassword"
          rules={[
            {
              required: true,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@_-])[A-Za-z0-9!@_-]{8,16}$/,
              message: intl.get("passwordRuleReminder"),
            },
          ]}
        >
          <Input.Password
            size="large"
            onChange={(e) => {
              const newPassword = e.target.value;
              setPasswordRules(passwordInputCheck(newPassword));
            }}
          />
        </Form.Item>
        <Space direction="vertical" size="small">
          {passwordRules.map((rule) => rule.message)}
        </Space>
        <Space size="middle" id="personalInfoButton">
          <Button onClick={() => setOpenPersonalInfo(false)}>
            {intl.get("cancel")}
          </Button>
          <Button type="primary" htmlType="submit">
            {intl.get("save")}
          </Button>
        </Space>
      </>
    );
  };

  const onSubmit = async () => {
    console.log(personalInfoForm.getFieldsValue());
    const { oldPassword, newPassword, email, phone_number } =
      personalInfoForm.getFieldsValue();
    const staff_id = record.staff_id;
    const id = record.id;
    const result = await checkPassword(staff_id, oldPassword);
    console.log(result.data);
    if (result.data) {
      const response = await changePasswordAndInfo(
        id,
        staff_id,
        email,
        phone_number,
        newPassword
      );
      if (response.data === 1) {
        message.success(intl.get("updatePasswordAndInfoSuccess"));
        setOpenPersonalInfo(false);
        setTimeout(() => {
          onLogout();
        }, 1000); // 1 second delay before logout
      } else {
        message.error(intl.get("updatePasswordAndInfoFailed"));
      }
    } else {
      message.error(intl.get("oldPasswordIncorrect"));
    }
  };

  return (
    <Layout.Header id="header">
      <Flex align="center">
        <Typography.Title level={1}>{getRestaurantName()}</Typography.Title>
        <Tooltip
          title={intl.get("editRestaurantName") || "Edit Restaurant Name"}
        >
          <Button
            type="link"
            icon={<EditOutlined style={{ fontSize: "18px" }} />}
            onClick={handleEditRestaurantName}
          />
        </Tooltip>
      </Flex>
      <Flex justify="center" align="middle" gap={20}>
        <Tooltip title={intl.get("translate")}>
          <Button type="link" id="headerBtn" onClick={changeLocale}>
            <TranslationOutlined style={{ fontSize: "24px" }} />
          </Button>
        </Tooltip>
        <Tooltip title={intl.get("checkToView")}>
          <Avatar
            size={40}
            icon={<UserOutlined />}
            id="headerBtn"
            onClick={() => setOpenPersonalInfo(true)}
          />
        </Tooltip>
        <Tooltip title={intl.get("logout")}>
          <Button
            type="link"
            id="headerBtn"
            onClick={() => setOpenLogout(!openLogout)}
          >
            <Icon component={LogoutSvg} />
          </Button>
        </Tooltip>
      </Flex>
      <Modal
        title={intl.get("logout")}
        open={openLogout}
        onOk={onLogout}
        onCancel={() => setOpenLogout(false)}
      >
        <p>{intl.get("logoutConfirm")}</p>
      </Modal>

      <Modal
        title={intl.get("editRestaurantName") || "Edit Restaurant Name"}
        open={openRestaurantNameModal}
        onOk={handleUpdateRestaurantName}
        onCancel={() => setOpenRestaurantNameModal(false)}
        okText={intl.get("save") || "Save"}
        cancelText={intl.get("cancel") || "Cancel"}
      >
        <Form form={editRestaurantNameForm} layout="vertical">
          <Form.Item
            name="restaurantNameZhHK"
            label={"繁體中文"}
            rules={[
              { required: true, message: intl.get("fieldRequired") },
              {
                pattern: /^[\u4e00-\u9fa5（）()]+$/,
                message: intl.get("pleaseEnterChinese"),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="restaurantNameZhCN"
            label={"簡體中文"}
            rules={[
              { required: true, message: intl.get("fieldRequired") },
              {
                pattern: /^[\u4e00-\u9fa5（）()]+$/,
                message: intl.get("pleaseEnterChinese"),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="restaurantNameUsEN"
            label={"English"}
            rules={[
              { required: true, message: intl.get("fieldRequired") },
              {
                pattern: /^[A-Za-z\s()]+$/,
                message: intl.get("pleaseEnterEnglish"),
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={
          <Typography.Title level={3}>
            {intl.get("personalInfo")}
          </Typography.Title>
        }
        open={openPersonalInfo}
        footer={null}
      >
        <Form layout="vertical" form={personalInfoForm} onFinish={onSubmit}>
          {formItem()}
        </Form>
      </Modal>
    </Layout.Header>
  );
}

export default Header;
