import React, { useEffect, useState, useMemo } from "react";
import {
  Form,
  Input,
  Layout,
  Typography,
  Button,
  Row,
  Col,
  message,
  Upload,
  Select,
  Modal,
} from "antd";
import {
  ClearOutlined,
  UserAddOutlined,
  DownloadOutlined,
  UploadOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import Sider from "../../layout/Sider";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import intl from "react-intl-universal";
import "./index.css";
import {
  registerAdmin,
  updateAdmin,
  cancelUploadExcel,
  uploadExcel,
  submitExcel,
  deleteAdmin,
} from "../../../api/Admin";
import { useNavigate, useLocation } from "react-router-dom";

function UserInfo() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider />
      <Layout>
        <Header />
        <UserInfoContent />
        <Footer />
      </Layout>
    </Layout>
  );
}

function UserInfoContent() {
  const status = sessionStorage.getItem("userInfoStatus");
  const location = useLocation();
  const record = useMemo(() => (location.state && location.state.record) || {}, [location]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  // const [open, setOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const style = {
    padding: 12,
    height: "auto",
    width: "auto",
    overflow: "auto",
    backgroundColor: "#E2E2E2",
  };

  const title = (status) => {
    if (status === "add") {
      return intl.get("addUser");
    } else {
      return intl.get("editUser");
    }
  };

  const onReset = () => {
    if (status === "edit") {
      form.setFieldsValue({
        name_en: record.name_en,
        name_cn: record.name_cn,
        email: record.email,
        phone_number: record.phone_number,
      });
    } else {
      form.resetFields();
    }
  };

  const onFinish = async (values) => {
    if (status === "add") {
      const { name_en, name_cn, email, phone_number, userRole } = values;
      registerAdmin(name_en, name_cn, email, phone_number, userRole);
      message.success(intl.get("addSuccess"));
    } else {
      const { name_en, name_cn, email, phone_number } = values;
      const id = record.id;
      const staff_id = record.staff_id;
      if (
        (await updateAdmin(id, staff_id, name_en, name_cn, email, phone_number))
          .data === 1
      ) {
        message.success(intl.get("editSuccess"));
        setTimeout(() => {
          navigate("..");
        }, 3000);
      }
    }
  };

  const onUploadExcel = async (file) => {
    const response = await uploadExcel(file);
    console.log(response.data);
    if (response.data === true) {
      message.success(intl.get("uploadSuccess"), 1);
    } else {
      message.error(intl.get("uploadFail"), 1);
    }
  };

  const onCancelUpload = () => {
    cancelUploadExcel();
    setTimeout(() => {
      message.success(intl.get("cancelUpload"), 1);
    });
  };

  const onDelete = async (record) => {
    const response = await deleteAdmin(record);
    if (response.data === 1) {
      message.success(intl.get("deleteSuccess"), 1);
      setTimeout(() => {
        navigate("..");
      }, 3000);
    }
  };

  const onSubmit = async () => {
    const response = await submitExcel();
    if (response.data === false) {
      message.error(intl.get("submitFail"), 1);
      // remove the uploaded file
      const uploadElement = document.querySelector(".ant-upload-list-item");
      if (uploadElement) {
        uploadElement.remove();
      }
      cancelUploadExcel();
    } else {
      message.success(intl.get("submitSuccess"), 1);
      setTimeout(() => {
        navigate("..");
      }, 3000);
    }
  };

  const buttonGrp = (status) => {
    if (status === "add") {
      return (
        <>
          <Col span={10}>
            <Button
              icon={<CloseCircleOutlined />}
              onClick={() => navigate("..")}
            >
              {intl.get("cancel")}
            </Button>
          </Col>
          <Col span={2}>
            <Button icon={<ClearOutlined />} onClick={() => onReset()}>
              {intl.get("reset")}
            </Button>
          </Col>
          <Col span={12}>
            <Button icon={<UserAddOutlined />} type="primary" htmlType="submit">
              {intl.get("submit")}
            </Button>
          </Col>
        </>
      );
    } else if (status === "edit") {
      return (
        <>
          <Col span={10}>
            <Button
              icon={<DeleteOutlined />}
              onClick={() => setIsOpenConfirm(true)}
            >
              {intl.get("delete")}
            </Button>
          </Col>
          <Col span={2}>
            <Button icon={<ClearOutlined />} onClick={() => onReset()}>
              {intl.get("reset")}
            </Button>
          </Col>
          <Col span={12}>
            <Button icon={<UserAddOutlined />} type="primary" htmlType="submit">
              {intl.get("submit")}
            </Button>
          </Col>
        </>
      );
    } else {
      message.error(intl.get("plsfollowinstruction"));
      navigate("..");
    }
  };

  useEffect(() => {
    if (status === "edit" && record) {
      form.setFieldsValue({
        name_en: record.name_en,
        name_cn: record.name_cn,
        email: record.email,
        phone_number: record.phone_number,
        userRole: record.userRole,
      });
      location.state = {};
    }
  }, [record, form, status, location]);

  return (
    <Layout.Content style={style}>
      <Row gutter={[48, 24]}>
        <Col span={10}></Col>
        <Col span={4}>
          <Typography.Title level={1}>{title(status)}</Typography.Title>
        </Col>
        <Col span={6}></Col>
        <Col span={4}>
          {status === "add" ? (
            <Typography.Title level={1}>
              <Button
                onClick={() => {
                  setIsHidden(!isHidden);
                }}
                type="primary"
              >
                {isHidden
                  ? intl.get("AddUserByForm")
                  : intl.get("AddUserByExcel")}
              </Button>
            </Typography.Title>
          ) : null}
        </Col>
      </Row>
      {/* add user by from */}
      <Form
        form={form}
        name="userInfoForm"
        layout="vertical"
        onFinish={onFinish}
        hidden={isHidden}
      >
        <Row gutter={[48, 24]}>
          <Col span={12}>
            <Form.Item
              label={intl.get("name_en")}
              name="name_en"
              rules={[
                {
                  required: true,
                  message: intl.get("pleaseEnterValidName"),
                },
                {
                  pattern: /^[a-zA-Z\s]*$/,
                  message: intl.get("pleaseEnterValidName"),
                },
              ]}
            >
              <Input size="large" id="name_en" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={intl.get("name_cn")}
              name="name_cn"
              rules={[
                {
                  pattern: /^[\u4e00-\u9fa5\s]*$/,
                  message: intl.get("pleaseEnterValidName"),
                },
              ]}
            >
              <Input size="large" id="name_cn" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[48, 24]}>
          <Col span={12}>
            <Form.Item
              label={intl.get("email")}
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: intl.get("pleaseEnterValidEmail"),
                },
              ]}
            >
              <Input size="large" id="email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={intl.get("phoneNumber")}
              name="phone_number"
              rules={[
                {
                  required: true,
                  pattern: /^[0-9]{8}$/,
                  message: intl.get("pleaseEnterValidPhoneNumber"),
                },
              ]}
            >
              <Input size="large" id="phone_number" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[48, 24]} justify={"center"}>
          <Col>
            <Form.Item label={intl.get("userRole")} name="userRole" required>
              <Select defaultValue="staff">
                <Select.Option value="admin">{intl.get("admin")}</Select.Option>
                <Select.Option value="staff">{intl.get("staff")}</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[48, 24]} justify="center">
          {buttonGrp(status)}
        </Row>
      </Form>

      {/* add user by excel */}
      <Form hidden={!isHidden} name="excelForm" layout="vertical">
        <Row gutter={[48, 24]}>
          <Col span={9}></Col>
          <Col span={4}>
            <Form.Item>
              <a
                href="http://localhost:8080/api/admin/downloadExcel/UserInfo.xlsx"
                download
              >
                <Button type="primary" icon={<DownloadOutlined />} size="large">
                  {intl.get("getTemplate")}
                </Button>
              </a>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[48, 24]}>
          <Col span={9}></Col>
          <Col span={5}>
            <Form.Item>
              <Upload
                accept=".xlsx"
                maxCount={1}
                beforeUpload={(file) => {
                  onUploadExcel(file);
                  return false;
                }}
                onRemove={() => {
                  onCancelUpload();
                }}
              >
                <Button
                  type="primary"
                  size="large"
                  icon={<UploadOutlined />}
                  style={{ width: "100%" }}
                >
                  {intl.get("uploadExcel")}
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[48, 24]}>
          <Col span={10}></Col>
          <Col>
            <Button type="primary" onClick={() => onSubmit()}>
              {intl.get("submit")}
            </Button>
          </Col>
        </Row>
      </Form>

      <Modal
        open={isOpenConfirm}
        title={intl.get("deleteUser")}
        okText={intl.get("yes")}
        cancelText={intl.get("no")}
        onCancel={() => setIsOpenConfirm(false)}
        onOk={() => onDelete(record)}
      >
        <Typography.Text>{intl.get("ConfirmDelete")}</Typography.Text>
      </Modal>
    </Layout.Content>
  );
}

export default UserInfo;
