import React, { useState, useEffect, useMemo, useReducer } from "react";
import { Card, Row, Col, Button, Modal, message } from "antd";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import "../style/menu.css";
import { findInMenu } from "../api/Menu";
import { getDishesType } from "../api/DishesType";
import {
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { createOrder } from "../api/CreateOrder";
import { getPhoto } from "../api/GetPhoto";
import { getSystemsProfile } from "../api/GetSystemsProfile";
import { getOptionsAndValuesByMenuId } from "../api/GetOptionsAndValuesByMenuId";

// Initial state
const initialState = {
  cart: JSON.parse(localStorage.getItem("cart") || "[]"),
  selectedItem: null,
  selectedQuantity: 1,
  modalStates: {
    itemDetail: false,
    cart: false,
    employeeCheck: false,
    nonEmployee: false,
    scanFailed: false,
    orderingDisabled: false,
  },
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return { ...state, cart: action.payload };
    case "SET_SELECTED_ITEM":
      return { ...state, selectedItem: action.payload, selectedQuantity: 1 };
    case "SET_QUANTITY":
      return { ...state, selectedQuantity: action.payload };
    case "SET_MODAL":
      return {
        ...state,
        modalStates: { ...state.modalStates, [action.modal]: action.value },
      };
    default:
      return state;
  }
};

const MenuScreen = () => {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [tableNumber, setTableNumber] = useState(
    localStorage.getItem("tableNumber") || ""
  );
  const [isEmployee, setIsEmployee] = useState(
    localStorage.getItem("isEmployee") || null
  );
  const [factoryEmployeeCheckRequired, setFactoryEmployeeCheckRequired] =
    useState(false);
  const [imageStatus, setImageStatus] = useState({});
  const [itemOptions, setItemOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

  // Filter menu items based on selected category
  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") return menuItems;
    return menuItems.filter((item) => item.type === selectedCategory);
  }, [selectedCategory, menuItems]);

  // Fetch image function
  const fetchImage = async (path, itemId) => {
    try {
      setImageStatus((prev) => ({ ...prev, [itemId]: "loading" }));
      const response = await getPhoto(path);
      const url = URL.createObjectURL(response.data);
      setImageStatus((prev) => ({ ...prev, [itemId]: "success" }));
      return url;
    } catch (error) {
      setImageStatus((prev) => ({ ...prev, [itemId]: "error" }));
      console.error("Failed to fetch image:", error);
      return null;
    }
  };

  // Initial data load
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const [menuResponse, categoriesResponse, profileResponse] =
          await Promise.all([
            findInMenu("", "", "", "", "", ""),
            getDishesType(),
            getSystemsProfile(),
          ]);

        const updatedItems = await Promise.all(
          menuResponse.data.map(async (item) => ({
            ...item,
            imageUrl: await fetchImage(item.path, item.id),
          }))
        );

        setMenuItems(updatedItems);
        setCategories(categoriesResponse.data);

        const profile = profileResponse.data;
        dispatch({
          type: "SET_MODAL",
          modal: "orderingDisabled",
          value: profile.orderingDisabled,
        });
        setFactoryEmployeeCheckRequired(profile.factoryEmployeeCheckRequired);
      } catch (error) {
        message.error(t("data_load_failed"));
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, [t]);

  // Handle table number in URL
  useEffect(() => {
    const urlTableNumber = searchParams.get("table");
    if (urlTableNumber === "0") {
      localStorage.removeItem("tableNumber");
      localStorage.removeItem("cart");
      localStorage.removeItem("isEmployee");
      setTableNumber("");
      dispatch({ type: "SET_CART", payload: [] });
      setIsEmployee(null);
      dispatch({ type: "SET_MODAL", modal: "scanFailed", value: true });
    } else if (urlTableNumber) {
      localStorage.setItem("tableNumber", urlTableNumber);
      setTableNumber(urlTableNumber);
    } else if (!tableNumber) {
      dispatch({ type: "SET_MODAL", modal: "scanFailed", value: true });
    }
  }, [searchParams, tableNumber]);

  // Check if employee authentication is required
  useEffect(() => {
    if (
      factoryEmployeeCheckRequired &&
      (isEmployee === null || isEmployee === "false")
    ) {
      dispatch({ type: "SET_MODAL", modal: "employeeCheck", value: true });
    }
  }, [isEmployee, factoryEmployeeCheckRequired]);

  // Sync cart with localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  // Confirm employee identity
  const handleEmployeeConfirm = (isEmp) => {
    setIsEmployee(isEmp);
    localStorage.setItem("isEmployee", isEmp);
    dispatch({ type: "SET_MODAL", modal: "employeeCheck", value: false });
    if (!isEmp) {
      dispatch({ type: "SET_MODAL", modal: "nonEmployee", value: true });
    }
  };

  // Handle item click in menu
  const handleItemClick = async (item) => {
    dispatch({ type: "SET_SELECTED_ITEM", payload: item });
    dispatch({ type: "SET_MODAL", modal: "itemDetail", value: true });

    try {
      const response = await getOptionsAndValuesByMenuId(item.id);
      setItemOptions(response.data);
    } catch (error) {
      console.error("Failed to fetch item options and values:", error);
    }
  };

  // Initialize default options when item detail modal opens
  useEffect(() => {
    if (state.modalStates.itemDetail && itemOptions.length > 0) {
      const initialOptions = {};
      itemOptions.forEach((option) => {
        initialOptions[option.id] = "";
      });
      setSelectedOptions(initialOptions);
    }
  }, [state.modalStates.itemDetail, itemOptions]);

  // Handle option change in detail modal
  const handleOptionChange = (optionId, value) => {
    setSelectedOptions((prev) => ({ ...prev, [optionId]: value }));
  };

  // Calculate option price adjustment (total adjustment for current selection)
  const calculateOptionAdjustment = () => {
    let totalAdjustment = 0;
    itemOptions.forEach((option) => {
      const selectedValueId = selectedOptions[option.id];
      if (selectedValueId) {
        const selectedValue = option.values.find(
          (value) => value.id === selectedValueId
        );
        if (selectedValue) {
          totalAdjustment += selectedValue.price_adjustment;
        }
      }
    });
    return totalAdjustment;
  };

  // Add selected item to cart
  const handleAddToCart = () => {
    if (!state.selectedItem) return;

    // Build custom strings for each language based on user selection.
    const customStrings = { zh_HK: "", zh_CN: "", en_US: "" };
    let totalAdjustment = 0;
    itemOptions.forEach((option) => {
      const selectedValueId = selectedOptions[option.id];
      if (selectedValueId) {
        const selectedValue = option.values.find(
          (value) => value.id === selectedValueId
        );
        if (selectedValue) {
          totalAdjustment += selectedValue.price_adjustment;
          // Append separator if needed and build string for each language.
          customStrings.zh_HK += customStrings.zh_HK ? "；" : "";
          customStrings.zh_HK += `${option["name_zh_hk"]}: ${selectedValue["value_zh_hk"]}`;
          
          customStrings.zh_CN += customStrings.zh_CN ? "；" : "";
          customStrings.zh_CN += `${option["name_zh_cn"]}: ${selectedValue["value_zh_cn"]}`;
          
          customStrings.en_US += customStrings.en_US ? "; " : "";
          customStrings.en_US += `${option["name_us_en"]}: ${selectedValue["value_us_en"]}`;
        }
      }
    });

    // Determine key to check duplicate:
    // Now if same item with same custom string exists, update quantity;
    // Otherwise add new record.
    const existingItem = state.cart.find(
      (item) =>
        item.id === state.selectedItem.id &&
        item.custom_string_zh_HK === customStrings.zh_HK
    );
    let newCart;
    if (existingItem) {
      newCart = state.cart.map((item) =>
        item.id === state.selectedItem.id &&
        item.custom_string_zh_HK === customStrings.zh_HK
          ? {
              ...item,
              quantity: item.quantity + state.selectedQuantity,
              custom_string_zh_HK: customStrings.zh_HK,
              custom_string_zh_CN: customStrings.zh_CN,
              custom_string_en_US: customStrings.en_US,
              customPrice: totalAdjustment,
            }
          : item
      );
    } else {
      newCart = [
        ...state.cart,
        {
          ...state.selectedItem,
          quantity: state.selectedQuantity,
          custom_string_zh_HK: customStrings.zh_HK,
          custom_string_zh_CN: customStrings.zh_CN,
          custom_string_en_US: customStrings.en_US,
          customPrice: totalAdjustment,
        },
      ];
    }
    dispatch({ type: "SET_CART", payload: newCart });
    message.success(t("added_to_cart"));
    dispatch({ type: "SET_MODAL", modal: "itemDetail", value: false });
    setSelectedOptions({});
  };

  // Update quantity for an item in cart
  const handleUpdateQuantity = (itemId, delta, customString) => {
    const newCart = state.cart
      .map((item) => {
        // Check item id and custom string (using zh_HK as key) for uniqueness
        if (
          item.id === itemId &&
          item.custom_string_zh_HK === customString
        ) {
          const newQuantity = item.quantity + delta;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      })
      .filter(Boolean);
    dispatch({ type: "SET_CART", payload: newCart });
  };

  // Update quantity in detail modal
  const handleDetailQuantityChange = (delta) => {
    const newQuantity = state.selectedQuantity + delta;
    if (newQuantity > 0) {
      dispatch({ type: "SET_QUANTITY", payload: newQuantity });
    }
  };

  // Calculate total price in cart
  const getTotalPrice = () =>
    state.cart.reduce(
      (sum, item) =>
        sum +
        (item.price + (item.customPrice || 0)) * item.quantity,
      0
    );

  // Calculate total items in cart
  const getTotalItems = () =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0);

  // Clear cart
  const handleClearCart = () => {
    Modal.confirm({
      title: t("clear_cart_confirm"),
      onOk: () => {
        dispatch({ type: "SET_CART", payload: [] });
        message.success(t("clear_cart"));
      },
      okButtonProps: { style: { background: "#b22222" } },
    });
  };

  // Confirm order and call API createOrder
  const handleConfirmOrder = async () => {
    Modal.confirm({
      title: t("confirm_order_title"),
      content: t("confirm_order_content"),
      onOk: async () => {
        try {
          await Promise.all(
            state.cart.map((item) =>
              createOrder({
                // For item names, try both uppercase and lowercase keys
                item_name_zh_HK: item.Name_zh_HK || item.name_zh_HK,
                item_name_zh_CN: item.Name_zh_CN || item.name_zh_CN,
                item_name_en_US: item.Name_en_US || item.name_en_US,
                // Pass custom strings for each language
                custom_string_zh_HK: item.custom_string_zh_HK || "",
                custom_string_zh_CN: item.custom_string_zh_CN || "",
                custom_string_en_US: item.custom_string_en_US || "",
                price: item.price,
                custom_price: item.customPrice || 0,
                quantity: item.quantity,
                table_name: tableNumber,
              })
            )
          );
          message.success(t("order_placed_successfully"));
          dispatch({ type: "SET_CART", payload: [] });
          dispatch({ type: "SET_MODAL", modal: "cart", value: false });
        } catch (error) {
          message.error(t("order_placement_failed"));
          console.error("Failed to place order:", error);
        }
      },
      okButtonProps: { style: { background: "#b22222" } },
    });
  };

  // Group menu items by category
  const groupedItems = useMemo(() => {
    return filteredItems.reduce((acc, item) => {
      acc[item.type] = acc[item.type] || [];
      acc[item.type].push(item);
      return acc;
    }, {});
  }, [filteredItems]);

  if (isLoading) {
    return <div className="menu-screen">Loading...</div>;
  }

  return (
    <div className="menu-screen">
      {/* Ordering Disabled Modal */}
      <Modal
        title="下單已停用 / 下单已停用 / Ordering Disabled"
        open={state.modalStates.orderingDisabled}
        footer={null}
        closable={false}
        centered
      >
        <p>暫時無法下單，請稍後再試！</p>
        <p>暂时无法下单，请稍后再试！</p>
        <p>Ordering is currently disabled. Please try again later!</p>
      </Modal>

      {/* Scan Failed Modal */}
      <Modal
        title="掃描失敗 / 扫描失败 / Snap Failed"
        open={state.modalStates.scanFailed}
        footer={null}
        closable={false}
        centered
      >
        <p>掃描失敗，請重新再試！</p>
        <p>扫描失败，请重新再试！</p>
        <p>Snap failed, please try again!</p>
      </Modal>

      {/* Employee Check Modal */}
      <Modal
        open={state.modalStates.employeeCheck}
        footer={[
          <Button
            key="yes"
            onClick={() => handleEmployeeConfirm(true)}
            icon={<CheckOutlined />}
          />,
          <Button
            key="no"
            onClick={() => handleEmployeeConfirm(false)}
            icon={<CloseOutlined />}
          />,
        ]}
        closable={false}
      >
        <p>是否此工廈的員工？</p>
        <p>是否此工厦的员工？</p>
        <p>Are you a factory employee of this building?</p>
      </Modal>

      {/* Non-Employee Modal */}
      <Modal
        open={state.modalStates.nonEmployee}
        footer={[
          <Button
            key="refresh"
            onClick={() => window.location.reload()}
            icon={<ReloadOutlined />}
          />,
        ]}
        closable={false}
      >
        <p>抱歉，只招待本工廈員工</p>
        <p>抱歉，只招待本工厦员工</p>
        <p>Sorry, Factory Employee of this building only</p>
      </Modal>

      {/* Category Buttons */}
      <div className="search-filter">
        <div className="category-buttons">
          <Button
            type={selectedCategory === "all" ? "primary" : "default"}
            onClick={() => setSelectedCategory("all")}
          >
            {t("all_categories")}
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.id}
              type={selectedCategory === cat.id ? "primary" : "default"}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {t(
                cat[
                  `name_${
                    i18n.language === "en"
                      ? "Us_En"
                      : i18n.language === "zh_CN"
                      ? "Zh_CN"
                      : "Zh_HK"
                  }`
                ]
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Table Number Display */}
      <div className="table-number">
        <span className="table-label">{t("table_number")}:</span>
        <span className="table-value">{tableNumber || "N/A"}</span>
      </div>

      {/* Item Detail Modal */}
      <Modal
        visible={state.modalStates.itemDetail}
        footer={null}
        centered
        className="item-detail-modal"
        title={null}
        onCancel={() => {
          dispatch({ type: "SET_MODAL", modal: "itemDetail", value: false });
          setSelectedOptions({});
        }}
      >
        {state.selectedItem && (
          <div className="item-detail-container">
            {/* Top area: Image + Name and Price */}
            <div className="item-detail-top">
              <div className="item-detail-photo">
                <img
                  src={state.selectedItem.imageUrl}
                  alt={
                    state.selectedItem[
                      `name_${
                        i18n.language === "en"
                          ? "en_US"
                          : i18n.language === "zh_CN"
                          ? "zh_CN"
                          : "zh_HK"
                      }`
                    ]
                  }
                />
              </div>
              <div className="item-detail-right">
                <div className="item-detail-name">
                  {
                    state.selectedItem[
                      `name_${
                        i18n.language === "en"
                          ? "en_US"
                          : i18n.language === "zh_CN"
                          ? "zh_CN"
                          : "zh_HK"
                      }`
                    ]
                  }
                </div>
                <div className="item-detail-price">
                  ${state.selectedItem.price.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Middle scrollable area for custom options */}
            {itemOptions.length > 0 && (
              <details className="item-detail-scrollable">
                <summary>{t("custom")}</summary>
                {itemOptions.map((option) => (
                  <div key={option.id} className="item-option">
                    <h4>
                      {
                        option[
                          `name_${
                            i18n.language === "en"
                              ? "us_en"
                              : i18n.language === "zh_CN"
                              ? "zh_cn"
                              : "zh_hk"
                          }`
                        ]
                      }
                    </h4>
                    <div>
                      <input
                        type="radio"
                        id={`option-${option.id}-none`}
                        name={`option-${option.id}`}
                        value=""
                        checked={selectedOptions[option.id] === ""}
                        onChange={() => handleOptionChange(option.id, "")}
                      />
                      <label htmlFor={`option-${option.id}-none`}>
                        {t("normal")}
                      </label>
                    </div>
                    {option.values.map((value) => (
                      <div key={value.id}>
                        <input
                          type="radio"
                          id={`option-${option.id}-value-${value.id}`}
                          name={`option-${option.id}`}
                          value={value.id}
                          checked={selectedOptions[option.id] === value.id}
                          onChange={() =>
                            handleOptionChange(option.id, value.id)
                          }
                        />
                        <label htmlFor={`option-${option.id}-value-${value.id}`}>
                          {
                            value[
                              `value_${
                                i18n.language === "en"
                                  ? "us_en"
                                  : i18n.language === "zh_CN"
                                  ? "zh_cn"
                                  : "zh_hk"
                              }`
                            ]
                          }{" "}
                          {value.price_adjustment !== 0 &&
                            `(+$${value.price_adjustment.toFixed(2)})`}
                        </label>
                      </div>
                    ))}
                  </div>
                ))}
              </details>
            )}

            {/* Bottom area: Quantity and Total Price */}
            <div className="item-detail-bottom">
              <div className="bottom-row">
                <div className="detail-quantity">
                  <button onClick={() => handleDetailQuantityChange(-1)}>
                    -
                  </button>
                  <span>{state.selectedQuantity}</span>
                  <button onClick={() => handleDetailQuantityChange(1)}>
                    +
                  </button>
                </div>
                <div className="detail-total-price">
                  {t("cart_total")}: $
                  {(() => {
                    const optionAdjustment = calculateOptionAdjustment();
                    const baseTotal =
                      state.selectedItem.price * state.selectedQuantity;
                    const totalWithOptions =
                      baseTotal + optionAdjustment * state.selectedQuantity;
                    return totalWithOptions.toFixed(2);
                  })()}
                </div>
              </div>
              <Button
                className="detail-add-to-cart-btn"
                onClick={handleAddToCart}
              >
                {t("add_to_cart")}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Display Menu Items grouped by category */}
      {Object.keys(groupedItems).map((category) => {
        const sortedItems = groupedItems[category].slice().sort((a, b) => {
          if (a.onSale === "N" && b.onSale !== "N") return 1;
          if (a.onSale !== "N" && b.onSale === "N") return -1;
          return 0;
        });

        return (
          <div key={category}>
            <h2 className="category-title">
              {
                categories.find((cat) => cat.id === category)?.[
                  `name_${
                    i18n.language === "en"
                      ? "Us_En"
                      : i18n.language === "zh_CN"
                      ? "Zh_CN"
                      : "Zh_HK"
                  }`
                ]
              }
            </h2>
            <Row gutter={[16, 16]} className="menu-items">
              {sortedItems.map((item) => (
                <Col xs={24} sm={12} md={8} key={item.id}>
                  <Card
                    hoverable={item.onSale !== "N"}
                    className={`menu-item-card ${
                      item.onSale === "N" ? "disabled" : ""
                    }`}
                    onClick={() => {
                      if (item.onSale !== "N") {
                        handleItemClick(item);
                      }
                    }}
                  >
                    <div className="menu-item-content">
                      <div className="menu-item-image-container">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt=""
                            className="top-image"
                          />
                        ) : (
                          <div className="menu-item-placeholder">
                            {imageStatus[item.id] === "loading"
                              ? "Loading..."
                              : "No Image"}
                          </div>
                        )}
                      </div>
                      <div className="menu-item-details">
                        <h4>
                          {
                            item[
                              `name_${
                                i18n.language === "en"
                                  ? "en_US"
                                  : i18n.language === "zh_CN"
                                  ? "zh_CN"
                                  : "zh_HK"
                              }`
                            ]
                          }
                        </h4>
                        <p className="card-meta-description">
                          {item.onSale === "N"
                            ? t("sold_out")
                            : `${t("price")}: $${item.price.toFixed(2)}`}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        );
      })}

      {/* Floating Cart */}
      {state.cart.length > 0 && (
        <div
          className="floating-cart"
          onClick={() =>
            dispatch({ type: "SET_MODAL", modal: "cart", value: true })
          }
        >
          <span className="cart-count">
            {getTotalItems()} {t("cart_items")}
          </span>
          <span className="cart-total">${getTotalPrice().toFixed(2)}</span>
        </div>
      )}

      {/* Cart Modal */}
      <Modal
        visible={state.modalStates.cart}
        onCancel={() =>
          dispatch({ type: "SET_MODAL", modal: "cart", value: false })
        }
        footer={null}
        title={
          <div style={{ position: "relative" }}>
            {t("cart")}
            <div className="cart-table-number">
              {t("table_number")}: {tableNumber || "N/A"}
            </div>
            {state.cart.length > 0 && (
              <div className="cart-header-actions">
                <DeleteOutlined
                  className="clear-cart-icon"
                  onClick={handleClearCart}
                />
              </div>
            )}
          </div>
        }
        className="cart-modal"
        style={{ top: 20 }}
      >
        <div className="cart-items-container">
          {state.cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              {t("empty_cart")}
            </div>
          ) : (
            state.cart.map((item) => (
              <div key={`${item.id}-${item.custom_string_zh_HK}`} className="cart-item">
                <img
                  src={item.imageUrl}
                  alt={
                    item[
                      `name_${
                        i18n.language === "en"
                          ? "en_US"
                          : i18n.language === "zh_CN"
                          ? "zh_CN"
                          : "zh_HK"
                      }`
                    ]
                  }
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <div>
                    {
                      item[
                        `name_${
                          i18n.language === "en"
                            ? "en_US"
                            : i18n.language === "zh_CN"
                            ? "zh_CN"
                            : "zh_HK"
                        }`
                      ]
                    }
                  </div>
                  {/* Display custom string if exists for current language */}
                  {item[
                    `custom_string_${
                      i18n.language === "en"
                        ? "en_US"
                        : i18n.language === "zh_CN"
                        ? "zh_CN"
                        : "zh_HK"
                    }`
                  ] && (
                    <div className="cart-item-custom">
                      {
                        item[
                          `custom_string_${
                            i18n.language === "en"
                              ? "en_US"
                              : i18n.language === "zh_CN"
                              ? "zh_CN"
                              : "zh_HK"
                          }`
                        ]
                      }
                    </div>
                  )}
                  <div>${((item.price + (item.customPrice || 0)) * item.quantity).toFixed(2)}</div>
                </div>
                <div className="cart-item-quantity">
                  <button
                    className="quantity-button"
                    onClick={() =>
                      handleUpdateQuantity(
                        item.id,
                        -1,
                        item.custom_string_zh_HK
                      )
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="quantity-button"
                    onClick={() =>
                      handleUpdateQuantity(
                        item.id,
                        1,
                        item.custom_string_zh_HK
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {state.cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-amount">
              {t("cart_total")}: ${getTotalPrice().toFixed(2)}
            </div>
            <Button
              type="primary"
              style={{ background: "#b22222", width: "100%" }}
              onClick={handleConfirmOrder}
            >
              {t("checkout")}
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MenuScreen;
