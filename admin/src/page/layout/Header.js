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
} from "antd";
import Icon, { 
  UserOutlined, 
  TranslationOutlined, 
  EditOutlined 
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import intl from "react-intl-universal";
import { getSystemsProfile, updateRestaurantName } from "../../api/GetSystemsProfile";

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
  const [editRestaurantNameForm] = Form.useForm();

  useEffect(() => {
    const fetchSystemProfile = async () => {
      try {
        const response = await getSystemsProfile();
        setSystemProfile(response.data);
      } catch (error) {
        console.error('Error fetching system profile:', error);
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
      case 'zh-HK':
        return systemProfile.restaurantNameZhHK;
      case 'en-US':
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

  return (
    <Layout.Header
      style={{
        background: "#fff",
        padding: "0 16px",
        textAlign: "center",
        fontSize: "60px",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Flex align="center">
        <Typography.Title level={1}>{getRestaurantName()}</Typography.Title>
        <Tooltip title={intl.get("editRestaurantName") || "Edit Restaurant Name"}>
          <Button 
            type="link" 
            icon={<EditOutlined style={{ fontSize: "18px" }} />} 
            onClick={handleEditRestaurantName}
          />
        </Tooltip>
      </Flex>
      <Flex justify="center" align="middle" gap={20}>
        <Tooltip title={intl.get("translate")}>
          <Button
            type="link"
            style={{ marginLeft: "16px" }}
            onClick={changeLocale}
          >
            <TranslationOutlined style={{ fontSize: "24px" }} />
          </Button>
        </Tooltip>
        <Tooltip title={intl.get("checkToView")}>
          <Avatar
            size={40}
            icon={<UserOutlined />}
            style={{ marginLeft: "16px" }}
            // onClick={() => setOpenPersonalInfo(true)}
          />
        </Tooltip>
        <Tooltip title={intl.get("logout")}>
          <Button
            type="link"
            style={{ marginLeft: "16px" }}
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
        okText={intl.get("yes")}
        cancelText={intl.get("no")}
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
            rules={[{ required: true, message: intl.get("fieldRequired") || "This field is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="restaurantNameZhCN"
            label={"簡體中文"}
            rules={[{ required: true, message: intl.get("fieldRequired") || "This field is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="restaurantNameUsEN"
            label={"English"}
            rules={[{ required: true, message: intl.get("fieldRequired") || "This field is required" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Layout.Header>
  );
}

export default Header;
