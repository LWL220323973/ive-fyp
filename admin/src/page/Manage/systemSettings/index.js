import React, { useState, useEffect } from "react";
import { getSystemsProfile, updateSystemSettings } from "../../../api/GetSystemsProfile";
import { Card, Form, Switch, Button, message, Row, Col, Typography, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import intl from "react-intl-universal";
import Sider from "../../layout/Sider";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";

const { Title } = Typography;

function SystemSettings() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider />
      <Layout>
        <Header />
        <SystemSettingsContent />
        <Footer />
      </Layout>
    </Layout>
  );
}

function SystemSettingsContent() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSystemProfile();
  }, []);

  const fetchSystemProfile = async () => {
    try {
      setLoading(true);
      const response = await getSystemsProfile();
      setProfileData(response.data);
      form.setFieldsValue({
        isOrderingDisabled: response.data.isOrderingDisabled,
        isServiceChargeRequired: response.data.isServiceChargeRequired,
        isFactoryEmployeeCheckRequired: response.data.isFactoryEmployeeCheckRequired,
      });
    } catch (error) {
      console.error("Error fetching system profile:", error);
      message.error(intl.get("fetchDataFailed"));
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    if (!profileData) return;

    try {
      setLoading(true);
      const updatedProfile = {
        ...profileData,
        isOrderingDisabled: values.isOrderingDisabled,
        isServiceChargeRequired: values.isServiceChargeRequired,
        isFactoryEmployeeCheckRequired: values.isFactoryEmployeeCheckRequired,
      };

      await updateSystemSettings(updatedProfile);
      message.success(intl.get("updateSettingsSuccess"));
    } catch (error) {
      console.error("Error updating system settings:", error);
      message.error(intl.get("updateSettingsFailed"));
    } finally {
      setLoading(false);
    }
  };

  const style = {
    padding: 12,
    height: "auto",
    width: "auto",
    overflow: "auto",
    backgroundColor: "#E2E2E2",
  };

  return (
    <Layout.Content style={style}>
      <Title level={2}>{intl.get("systemSettings")}</Title>
      <Card loading={loading}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            isOrderingDisabled: false,
            isServiceChargeRequired: false,
            isFactoryEmployeeCheckRequired: false,
          }}
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                name="isOrderingDisabled"
                label={intl.get("disableOrdering")}
                valuePropName="checked"
              >
                <Switch checkedChildren={intl.get("yes")} unCheckedChildren={intl.get("no")} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="isServiceChargeRequired"
                label={intl.get("requireServiceCharge")}
                valuePropName="checked"
              >
                <Switch checkedChildren={intl.get("yes")} unCheckedChildren={intl.get("no")} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="isFactoryEmployeeCheckRequired"
                label={intl.get("requireFactoryEmployeeCheck")}
                valuePropName="checked"
              >
                <Switch checkedChildren={intl.get("yes")} unCheckedChildren={intl.get("no")} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {intl.get("save")}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Layout.Content>
  );
}

export default SystemSettings;
