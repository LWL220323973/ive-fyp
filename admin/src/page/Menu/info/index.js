import React, { useEffect, useMemo, useState } from "react";
import {
  Layout,
  Form,
  Typography,
  Input,
  Checkbox,
  Radio,
  Image,
  InputNumber,
  Select,
  Space,
  Flex,
  Button,
  Upload,
  message,
  Modal,
} from "antd";
import {
  UploadOutlined,
  ReloadOutlined,
  EditOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Sider from "../../layout/Sider";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import { useNavigate, useLocation } from "react-router-dom";
import intl from "react-intl-universal";
import { getAllCustomOption } from "../../../api/CustomOption";
import { getDishesType } from "../../../api/DishesType";
import {
  getMenuItemCustomOptionByMenuItemId,
  insertMenuItemCustomOption,
  deleteMenuItemCustomOptionByMenuItemId,
} from "../../../api/MenuItemCustomOptions";
import { uploadPhoto, cancelUploadPhoto } from "../../../api/Photo";
import "./index.css";
import {
  deleteMenu,
  getLastMenu,
  insertMenu,
  updateMenu,
} from "../../../api/Menu";

function MenuInfo() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider />
      <Layout>
        <Header />
        <MenuInfoContent />
        <Footer />
      </Layout>
    </Layout>
  );
}
function MenuInfoContent() {
  const style = {
    padding: 12,
    height: "auto",
    width: "auto",
    overflow: "auto",
    backgroundColor: "#E2E2E2",
  };

  const navigate = useNavigate();
  const location = useLocation();
  const [customOptionList, setCustomOptionList] = useState([]);
  const [dishesTypeList, setDishesTypeList] = useState([]);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [menuInfoForm] = Form.useForm();

  const record = useMemo(
    () => (location.state && location.state.record) || {},
    [location]
  );

  const status = useMemo(
    () => (location.state && location.state.status) || "",
    [location]
  );

  const imagePath = () => {
    if (status === "edit") {
      return "http://localhost:8080/api/admin/photoAdmin/" + record.path;
    }
  };
  const [imageSrc, setImageSrc] = useState(imagePath());

  useEffect(() => {
    getAllCustomOption().then((res) => {
      setCustomOptionList(res.data);
    });
    getDishesType().then((res) => {
      setDishesTypeList(res.data);
    });
    getMenuItemCustomOptionByMenuItemId(record.id).then((res) => {
      menuInfoForm.setFieldsValue({
        customOption: res.data.map((item) => item.custom_option_id),
      });
    });
  }, [record, status, menuInfoForm]);

  const onUploadPhoto = async (file) => {
    if (!["image/png", "image/jpeg"].includes(file.type)) {
      message.error(intl.get("invalidFileType"));
      return;
    }
    if (
      file.name
        .replace(/\s/g, "")
        .replace("　", "")
        .replace(".jpg", "")
        .replace(".png", "")
        .trim() === ""
    ) {
      message.error(intl.get("invalidFileName"));
      return;
    }
    const maxSizeInMB = 5; // Set maximum file size to 5MB
    if (file.size / 1024 / 1024 > maxSizeInMB) {
      message.error(intl.get("fileTooLarge", { size: maxSizeInMB }));
      return;
    }
    if (status === "add") {
      const response = await uploadPhoto(file);
      if (response.status === 200) {
        onCancelUploadPhoto();
        message.success(intl.get("uploadSuccess"));
        setImageSrc(
          "http://localhost:8080/api/admin/photoAdmin/" + response.data
        );
      } else {
        message.error(intl.get("uploadFail"));
      }
    } else {
      const response = await uploadPhoto(file);
      if (response.status === 200) {
        message.success(intl.get("uploadSuccess"));
        setImageSrc(
          "http://localhost:8080/api/admin/photoAdmin/" + response.data
        );
      } else {
        message.error(intl.get("uploadFail"));
      }
    }
  };

  const onCancelUploadPhoto = async () => {
    if (status === "add") {
      if (imageSrc !== undefined && imageSrc !== null && imageSrc !== "") {
        const result = await cancelUploadPhoto(
          imageSrc.replace("http://localhost:8080/api/admin/photoAdmin/", "")
        );
        if (result.data === 1) {
          setImageSrc();
        }
      }
    } else {
      await cancelUploadPhoto(record.path);
    }
  };

  const formItem = () => {
    const variableFormItem = [
      {
        label: intl.get("zh-hk"),
        name: "name_zh_HK",
        initialValue: record.name_zh_HK,
        rules: [
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5（）()]+$/,
            message: intl.get("pleaseEnterChinese"),
          },
        ],
      },
      {
        label: intl.get("zh-cn"),
        name: "name_zh_CN",
        initialValue: record.name_zh_CN,
        rules: [
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5（）()]+$/,
            message: intl.get("pleaseEnterChinese"),
          },
        ],
      },
      {
        label: intl.get("en-us"),
        name: "name_en_US",
        initialValue: record.name_en_US,
        rules: [
          {
            required: true,
            pattern: /^[A-Za-z\s()]+$/,
            message: intl.get("pleaseEnterEnglish"),
          },
        ],
      },
    ];

    const sortedVariableFormItem =
      localStorage.getItem("locale") === "en-US"
        ? variableFormItem.sort((a) => (a.name === "name_en_US" ? -1 : 1))
        : variableFormItem;

    return (
      <>
        <Flex id="menuInfoFormInfo" justify="space-between">
          <Flex vertical>
            <Image src={imageSrc} width={300} height={300}></Image>
            <Upload
              accept=".png,.jpg"
              maxCount={1}
              showUploadList={false}
              beforeUpload={(file) => {
                onUploadPhoto(file);
                return false;
              }}
            >
              <Button
                type="primary"
                size="large"
                icon={<UploadOutlined />}
                style={{ width: 300, marginTop: "16px" }}
              >
                {intl.get("uploadImage")}
              </Button>
            </Upload>
          </Flex>

          <Flex vertical style={{ marginLeft: "16px", flex: 1 }}>
            {sortedVariableFormItem.map((item) => (
              <Form.Item
                key={item.name}
                label={item.label}
                name={item.name}
                rules={item.rules}
                initialValue={item.initialValue}
              >
                <Input size="large" />
              </Form.Item>
            ))}
            <Space size="large" wrap>
              <Form.Item
                label={intl.get("price")}
                name="price"
                initialValue={record.price}
                rules={[
                  { required: true, message: intl.get("pleaseEnterPrice") },
                ]}
              >
                <InputNumber size="large" min={1} style={{ width: 100 }} />
              </Form.Item>
              <Form.Item
                label={intl.get("DishesType")}
                name="dishesType"
                initialValue={record.type}
                rules={[{ required: true, message: intl.get("pleaseChoose") }]}
              >
                <Select size="large" style={{ width: 200 }}>
                  {dishesTypeList.map((item, index) => (
                    <Select.Option key={index} value={item.id}>
                      {localStorage.getItem("locale") === "en-US"
                        ? item.name_Us_EN
                        : item.name_Zh_HK}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label={intl.get("status")}
                name="status"
                initialValue={record.onSale}
                rules={[{ required: true, message: intl.get("pleaseChoose") }]}
              >
                <Radio.Group>
                  <Radio value={"Y"}>{intl.get("active")}</Radio>
                  <Radio value={"N"}>{intl.get("inactive")}</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label={intl.get("specialItem")}
                name="customOption"
              >
                <Checkbox.Group>
                  {customOptionList.map((item) => (
                    <Checkbox
                      key={item.id}
                      value={item.id}
                    >
                      {localStorage.getItem("locale") === "en-US"
                        ? item.name_us_en
                        : item.name_zh_hk}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </Form.Item>
            </Space>
          </Flex>
        </Flex>
        <Space id="menuInfoFormButton" size="large">
          <Button
            id="cancelButton"
            type="primary"
            onClick={() => {
              if (status === "add") {
                onCancelUploadPhoto();
              }
              navigate("..");
            }}
          >
            {intl.get("cancel")}
          </Button>
          <Button
            color="red"
            variant="solid"
            icon={<DeleteOutlined />}
            disabled={status === "add"}
            onClick={() => {
              setIsOpenConfirm(true);
            }}
          >
            {intl.get("delete")}
          </Button>
          <Button
            htmlType="reset"
            color="primary"
            variant="outlined"
            icon={<ReloadOutlined />}
            onClick={() => {
              if (status === "add") {
                onCancelUploadPhoto();
              }
              getMenuItemCustomOptionByMenuItemId(record.id).then((res) => {
                menuInfoForm.setFieldsValue({
                  customOption: res.data.map((item) => item.custom_option_id),
                });
              });
              setImageSrc(imagePath());
            }}
          >
            {intl.get("reset")}
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            icon={status === "edit" ? <EditOutlined /> : <PlusCircleOutlined />}
          >
            {status === "edit" ? intl.get("edit") : intl.get("add")}
          </Button>
        </Space>
      </>
    );
  };

  const onSubmit = async () => {
    if (status === "edit") {
      const {
        customOption,
        dishesType,
        status,
        name_en_US,
        name_zh_HK,
        name_zh_CN,
        price,
      } = menuInfoForm.getFieldsValue();
      const response = await updateMenu(
        record.id,
        name_zh_HK,
        name_zh_CN,
        name_en_US,
        price,
        status,
        dishesType,
        imageSrc.replace("http://localhost:8080/api/admin/photoAdmin/", "")
      );
      if (response.data === 1) {
        await deleteMenuItemCustomOptionByMenuItemId(record.id);
        customOption.forEach(async (item) => {
          const res = await insertMenuItemCustomOption(record.id, item);
          if (res.data !== 1) {
            await deleteMenuItemCustomOptionByMenuItemId(record.id);
            message.error(intl.get("editFailed"));
          }
        });
        message.success(intl.get("editSuccess"));
        setTimeout(() => {
          navigate("..");
        }, 1000);
      }
    } else {
      if (imageSrc === undefined || imageSrc === null || imageSrc === "") {
        message.error(intl.get("pleaseUploadImage"));
        return;
      }
      const {
        customOption,
        dishesType,
        status,
        name_en_US,
        name_zh_HK,
        name_zh_CN,
        price,
      } = menuInfoForm.getFieldsValue();

      const response = await insertMenu(
        name_zh_HK,
        name_zh_CN,
        name_en_US,
        price,
        status,
        dishesType,
        imageSrc.replace("http://localhost:8080/api/admin/photoAdmin/", "")
      );
      if (response.data === 1) {
        const menuId = await getLastMenu();
        customOption.forEach(async (item) => {
          const res = await insertMenuItemCustomOption(menuId.data, item);
          if (res.data !== 1) {
            await deleteMenuItemCustomOptionByMenuItemId(menuId.data);
            await deleteMenu(menuId.data);
            message.error(intl.get("addFailed"));
          }
        });
        message.success(intl.get("addSuccess"));
        setTimeout(() => {
          navigate("..");
        }, 1000);
      } else {
        onCancelUploadPhoto();
      }
    }
  };

  const onDelete = async () => {
    await deleteMenuItemCustomOptionByMenuItemId(record.id);
    const res = await deleteMenu(record.id);
    if (res.data === 1) {
      onCancelUploadPhoto();
      message.success(intl.get("deleteSuccess"));
      setTimeout(() => {
        navigate("..");
      }, 1000);
    }
  };
  return (
    <Layout.Content style={style}>
      <Typography.Title level={2}>
        {status === "edit"
          ? intl.get("editMenu") +
            (localStorage.getItem("locale") === "en-US"
              ? record.name_en_US
              : record.name_zh_HK)
          : intl.get("addMenu")}
      </Typography.Title>
      <Form
        layout="vertical"
        id="menuInfoForm"
        onFinish={() => onSubmit()}
        form={menuInfoForm}
      >
        {formItem()}
      </Form>
      <Modal
        open={isOpenConfirm}
        title={intl.get("deleteMenu")}
        okText={intl.get("yes")}
        cancelText={intl.get("no")}
        onCancel={() => setIsOpenConfirm(false)}
        onOk={() => onDelete()}
      >
        <Typography.Text>{intl.get("ConfirmDelete")}</Typography.Text>
      </Modal>
    </Layout.Content>
  );
}
export default MenuInfo;
