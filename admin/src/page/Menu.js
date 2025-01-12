import React, { useState } from "react";
import { Layout, Breadcrumb, Button, Flex, Tooltip } from "antd";
import Sider from "./layout/Sider";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import intl from "react-intl-universal";
import { useNavigate, Outlet } from "react-router-dom";

function Menu() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider />
      <Layout>
        <Header />
        <Content />
        <Footer />
      </Layout>
    </Layout>
  );
}

function Content() {
  const navigate = useNavigate();

  const onMove = (key) => {
    navigate(`/menu/${key}`);
  };
  return (
    <Layout.Content
      style={{
        margin: "12px",
        padding: 12,
      }}
    >
      <Flex wrap gap="middle">
        <Tooltip title={intl.get("signatureDish")}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => onMove("signatureDish")}
            style={{ flex: 1, height: "100%", fontSize: "20px" }}
          >
            {intl.get("signatureDish")}
          </Button>
        </Tooltip>
        <Tooltip title={intl.get("coldFood")}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => onMove("coldFood")}
            style={{ flex: 1, height: "100%", fontSize: "20px" }}
          >
            {intl.get("coldFood")}
          </Button>
        </Tooltip>
        <Tooltip title={intl.get("sideDish")}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => onMove("sideDish")}
            style={{ flex: 1, height: "100%", fontSize: "20px" }}
          >
            {intl.get("sideDish")}
          </Button>
        </Tooltip>
        <Tooltip title={intl.get("capsicumAnnuum")}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => onMove("capsicumAnnuum")}
            style={{ flex: 1, height: "100%", fontSize: "20px" }}
          >
            {intl.get("capsicumAnnuum")}
          </Button>
        </Tooltip>

        <Tooltip title={intl.get("stirFry")}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => onMove("stirFry")}
            style={{ flex: 1, height: "100%", fontSize: "20px" }}
          >
            {intl.get("stirFry")}
          </Button>
        </Tooltip>

        <Tooltip title={intl.get("stapleFood")}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => onMove("stapleFood")}
            style={{ flex: 1, height: "100%", fontSize: "20px" }}
          >
            {intl.get("stapleFood")}
          </Button>
        </Tooltip>

        <Tooltip title={intl.get("drinks")}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => onMove("drinks")}
            style={{ flex: 1, height: "100%", fontSize: "20px" }}
          >
            {intl.get("drinks")}
          </Button>
        </Tooltip>
      </Flex>

      <Outlet />
    </Layout.Content>
  );
}

export default Menu;
