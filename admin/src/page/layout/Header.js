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
  Row,
  Col,
} from "antd";
import Icon, { UserOutlined, TranslationOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import intl from "react-intl-universal";

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

  const onLogout = () => {
    sessionStorage.clear();
    message.success("Logout successful!", 1);
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
      <Row justify="center" align="middle" style={{ width: "100%" }}>
        <Col span={24}>
          <Typography.Title level={1}>寶斯重慶紙包魚</Typography.Title>
        </Col>
      </Row>

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
    </Layout.Header>
  );
}

export default Header;
