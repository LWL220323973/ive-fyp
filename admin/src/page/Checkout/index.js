import React, { useEffect, useState, useCallback } from "react";
import {
  Layout,
  Button,
  Typography,
  Card,
  Tag,
  message,
  Row,
  Col,
  Collapse,
  Statistic,
  Table,
  Spin,
  Result,
  Modal
} from "antd";
import { 
  ShoppingCartOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined,
  TableOutlined,
  DollarOutlined,
  PrinterOutlined,
  ReloadOutlined,
  SyncOutlined,
  QuestionCircleOutlined,
  StopOutlined
} from "@ant-design/icons";
import Sider from "../layout/Sider";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { getAllOrders, updateOrderStatus } from "../../api/Order";
import { getSystemsProfile } from "../../api/GetSystemsProfile";
import intl from "react-intl-universal";
import "./Checkout.css";

const { Panel } = Collapse;

function Checkout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider />
      <Layout>
        <Header />
        <CheckoutContent />
        <Footer />
      </Layout>
    </Layout>
  );
}

function CheckoutContent() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableOrders, setTableOrders] = useState({});
  const [tableStats, setTableStats] = useState({});
  const [activeKeys, setActiveKeys] = useState([]);
  const [tableElapsedTimes, setTableElapsedTimes] = useState({}); 
  const [lastRefreshTime, setLastRefreshTime] = useState(null); // 添加最後刷新時間狀態
  const [systemProfile, setSystemProfile] = useState(null); // 新增系統配置狀態
  const [serviceChargeExemptions, setServiceChargeExemptions] = useState({}); // 新增：追蹤免除服務費的桌號

  const style = {
    padding: 16,
    height: "auto",
    width: "auto",
    overflow: "auto",
    backgroundColor: "#E2E2E2",
  };

  // 獲取系統配置
  const fetchSystemProfile = useCallback(async () => {
    try {
      const response = await getSystemsProfile();
      setSystemProfile(response.data);
    } catch (error) {
      console.error("Failed to fetch system profile:", error);
      message.error(intl.get("fetchSystemProfileFailed") || "無法獲取系統設定");
    }
  }, []);

  // 獲取訂單數據
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllOrders();
      
      // 過濾status id為1或2的訂單
      const filteredOrders = (res.data || []).filter(
        (order) => order.orderStatusId === 1 || order.orderStatusId === 2
      );
      
      // 按創建時間排序 - 新的排前面
      const sortedOrders = [...filteredOrders].sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      
      setOrders(sortedOrders);
      organizeOrdersByTable(sortedOrders);
      setLastRefreshTime(new Date()); // 更新最後刷新時間
      setServiceChargeExemptions({}); // 重置服務費免除狀態
      message.success(intl.get("dataRefreshed"));
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      message.error(intl.get("fetchOrdersFailed"));
    } finally {
      setLoading(false);
    }
  }, []);

  // 按桌號分組訂單
  const organizeOrdersByTable = (orders) => {
    const byTable = {};
    const stats = {};

    orders.forEach(order => {
      const tableName = order.tableName;
      
      // 將訂單添加到對應桌號
      if (!byTable[tableName]) {
        byTable[tableName] = [];
      }
      byTable[tableName].push(order);
      
      // 計算每個桌號的統計數據
      if (!stats[tableName]) {
        stats[tableName] = {
          totalRecords: 0, // 記錄總訂單數量（記錄數）
          pendingRecords: 0, // 待處理的訂單數量（記錄數）
          completedRecords: 0, // 已完成的訂單數量（記錄數）
          totalItems: 0, // 總物品數量
          pendingItems: 0, // 待處理的物品數量
          completedItems: 0, // 已完成的物品數量
          totalPrice: 0 // 總價格
        };
      }
      
      // 更新統計數據 - 訂單記錄計數
      stats[tableName].totalRecords += 1;
      
      if (order.orderStatusId === 1) {
        stats[tableName].pendingRecords += 1;
        stats[tableName].pendingItems += order.quantity;
      } else {
        stats[tableName].completedRecords += 1;
        stats[tableName].completedItems += order.quantity;
      }
      
      // 更新總物品數量
      stats[tableName].totalItems += order.quantity;
      
      // 計算總價格（原價 + 調整價格）
      const totalUnitPrice = order.price + (order.customPrice || 0);
      stats[tableName].totalPrice += totalUnitPrice * order.quantity;
    });
    
    setTableOrders(byTable);
    setTableStats(stats);
  
  };

  // 獲取語言本地化的訂單項目名稱
  const getLocalizedName = (record) => {
    if (localStorage.getItem("locale") === "en-US") {
      return record.itemNameEnUS;
    } else if (localStorage.getItem("locale") === "zh-CN") {
      return record.itemNameZhCN;
    } else {
      return record.itemNameZhHK;
    }
  };

  // 獲取語言本地化的自定義字符串
  const getLocalizedCustomString = (record) => {
    if (localStorage.getItem("locale") === "en-US") {
      return record.customStringEnUS;
    } else if (localStorage.getItem("locale") === "zh-CN") {
      return record.customStringZhCN;
    } else {
      return record.customStringZhHK;
    }
  };

  // 獲取訂單狀態的本地化顯示
  const getLocalizedStatus = (order) => {
    if (localStorage.getItem("locale") === "en-US") {
      return order.orderStatus.statusEnUS;
    } else if (localStorage.getItem("locale") === "zh-CN") {
      return order.orderStatus.statusZhCN;
    } else {
      return order.orderStatus.statusZhHK;
    }
  };

  // 處理折疊面板的狀態變更
  const handleCollapseChange = (keys) => {
    setActiveKeys(keys);
  };

  // 處理結帳操作
  const handleCheckout = (tableName) => {
    const tableOrder = tableOrders[tableName] || [];
    const stats = tableStats[tableName] || { pendingRecords: 0 };
    const hasPendingOrders = stats.pendingRecords > 0;
    
    // 確認訊息根據是否有待處理訂單而不同
    const confirmTitle = intl.get("checkoutConfirmTitle");
    const confirmContent = hasPendingOrders
      ? intl.get("checkoutConfirmWithPending")
      : intl.get("checkoutConfirmContent");
    
    Modal.confirm({
      title: confirmTitle,
      content: confirmContent,
      icon: <QuestionCircleOutlined />,
      okText: intl.get("confirm"),
      cancelText: intl.get("cancel"),
      onOk: async () => {
        try {
          // 顯示載入狀態
          setLoading(true);
          
          // 對桌號所有訂單逐一更新狀態為3（已結帳）
          const updatePromises = tableOrder.map(order => 
            updateOrderStatus(order.id, 3)
          );
          
          // 等待所有更新完成
          await Promise.all(updatePromises);
          
          // 成功提示
          message.success(`${intl.get("checkoutSuccessful")}: ${tableName}`);
          
          // 重新獲取訂單數據以更新界面
          fetchOrders();
        } catch (error) {
          console.error("結帳失敗:", error);
          message.error(intl.get("checkoutFailed"));
        } finally {
          setLoading(false);
        }
      }
    });
  };

  // 模擬打印操作
  const handlePrint = (tableName) => {
    message.info(`${intl.get("printing")}: {tableName}`);
    // 這裡將來可以添加實際的打印邏輯
  };

  // 處理手動刷新按鈕點擊
  const handleRefresh = () => {
    fetchOrders();
  };

  // 新增：切換服務費免除狀態的函數
  const toggleServiceChargeExemption = (tableName) => {
    setServiceChargeExemptions(prev => ({
      ...prev,
      [tableName]: !prev[tableName]
    }));
  };

  // 為每個桌號生成表格列
  const generateTableColumns = () => {
    return [
      {
        title: intl.get("item"),
        dataIndex: "orderName",
        key: "orderName",
        render: (_, record) => {
          const name = getLocalizedName(record);
          const customString = getLocalizedCustomString(record);
          
          return (
            <div>
              <div className="order-name">{name}</div>
              {customString && (
                <div className="order-customization">{customString}</div>
              )}
            </div>
          );
        }
      },
      {
        title: intl.get("quantity"),
        dataIndex: "quantity",
        key: "quantity",
        width: 100,
        align: "center"
      },
      {
        title: intl.get("status"),
        dataIndex: "status",
        key: "status",
        width: 120,
        align: "center",
        render: (_, record) => {
          const isPending = record.orderStatusId === 1;
          return (
            <Tag color={isPending ? "orange" : "green"}>
              {getLocalizedStatus(record)}
            </Tag>
          );
        }
      },
      {
        title: intl.get("price"),
        dataIndex: "price",
        key: "price",
        width: 100,
        align: "right",
        render: (_, record) => {
          // 顯示原價 + 調整價格
          const basePrice = record.price;
          const adjustedPrice = record.customPrice || 0;
          const totalPrice = basePrice + adjustedPrice;
          
          // 如果有價格調整，則顯示調整細節
          if (adjustedPrice !== 0) {
            return (
              <span>
                ${basePrice.toFixed(2)}
                <br />
                <small style={{ color: adjustedPrice > 0 ? '#cf1322' : '#52c41a' }}>
                  {adjustedPrice > 0 ? '(+$' : ''}{adjustedPrice.toFixed(2)}{')'}
                </small>
              </span>
            );
          }
          
          return `$${totalPrice.toFixed(2)}`;
        }
      },
      {
        title: intl.get("subtotal"),
        dataIndex: "subtotal",
        key: "subtotal",
        width: 120,
        align: "right",
        render: (_, record) => {
          const totalUnitPrice = record.price + (record.customPrice || 0);
          const subtotal = totalUnitPrice * record.quantity;
          return `$${subtotal.toFixed(2)}`;
        }
      }
    ];
  };

  // 為每個桌號生成摺疊面板
  const renderTablePanel = (tableName) => {
    const tableOrder = tableOrders[tableName] || [];
    const stats = tableStats[tableName] || { 
      totalRecords: 0,
      pendingRecords: 0,
      completedRecords: 0,
      totalItems: 0, 
      pendingItems: 0, 
      completedItems: 0, 
      totalPrice: 0 
    };
    
    // 根據系統配置和免除狀態計算最終總價（含服務費）
    const isExempted = serviceChargeExemptions[tableName];
    const finalTotalPrice = systemProfile?.isServiceChargeRequired && !isExempted
      ? stats.totalPrice * 1.1 // 加上10%服務費
      : stats.totalPrice;
    
    const panelHeader = (
      <div className="checkout-panel-header">
        <div className="checkout-table-name">
          <TableOutlined /> {intl.get("table")}: {tableName}
          <Tag 
            color={stats.pendingRecords > 0 ? "orange" : "green"}
            className="table-timer-tag"
          >
            {tableElapsedTimes[tableName] || "00:00:00"}
          </Tag>
        </div>
        <div className="checkout-table-stats">
          <div className="order-counts">
            <span className="pending-count">
              {stats.pendingRecords}
            </span>
            <span className="order-count-separator">/</span>
            <span className="completed-count">
              {stats.completedRecords}
            </span>
          </div>
          <span className="checkout-total-price">${finalTotalPrice.toFixed(2)}</span>
        </div>
      </div>
    );
    
    return (
      <Panel header={panelHeader} key={tableName} className="checkout-panel">
        <div className="checkout-stats-cards">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Card className="checkout-stats-card pending-card">
                <Statistic 
                  title={intl.get("pendingItems")}
                  value={stats.pendingRecords}
                  prefix={<ClockCircleOutlined />}
                  suffix={stats.pendingItems > 0 ? <small>({stats.pendingItems} {intl.get("quantity").toLowerCase()})</small> : null}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card className="checkout-stats-card completed-card">
                <Statistic 
                  title={intl.get("completedItems")}
                  value={stats.completedRecords}
                  prefix={<CheckCircleOutlined />}
                  suffix={stats.completedItems > 0 ? <small>({stats.completedItems} {intl.get("quantity").toLowerCase()})</small> : null}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card className="checkout-stats-card total-card">
                <Statistic 
                  title={intl.get("totalPrice")}
                  value={finalTotalPrice}
                  precision={2}
                  prefix="$"
                />
              </Card>
            </Col>
          </Row>
        </div>
        
        <div className="checkout-table-container">
          <Table 
            dataSource={tableOrder}
            columns={generateTableColumns()}
            rowKey="id"
            pagination={false}
            size="middle"
            summary={pageData => {
              let totalRecords = pageData.length; // 總記錄數
              let totalQuantity = 0; // 總物品數量
              let totalAmount = 0; // 總金額
              
              pageData.forEach(order => {
                const totalUnitPrice = order.price + (order.customPrice || 0);
                totalQuantity += order.quantity;
                totalAmount += totalUnitPrice * order.quantity;
              });
              
              // 計算服務費（如果需要且未免除）
              let serviceCharge = 0;
              let finalTotal = totalAmount;
              const isExempted = serviceChargeExemptions[tableName];
              
              if (systemProfile?.isServiceChargeRequired && !isExempted) {
                serviceCharge = totalAmount * 0.1; // 10% 服務費
                finalTotal = totalAmount + serviceCharge;
              }
              
              return (
                <>
                  <Table.Summary.Row className="checkout-table-summary">
                    <Table.Summary.Cell index={0}>{intl.get("total")}: {totalRecords} {intl.get("orders").toLowerCase()}</Table.Summary.Cell>
                    <Table.Summary.Cell index={1} align="center">{totalQuantity}</Table.Summary.Cell>
                    <Table.Summary.Cell index={2}></Table.Summary.Cell>
                    <Table.Summary.Cell index={3} align="right"></Table.Summary.Cell>
                    <Table.Summary.Cell index={4} align="right">
                      <Typography.Text strong>${totalAmount.toFixed(2)}</Typography.Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                  
                  {systemProfile?.isServiceChargeRequired && (
                    <Table.Summary.Row className="checkout-table-service-charge">
                      <Table.Summary.Cell index={0} colSpan={4}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div>
                            {isExempted ? (
                              <Typography.Text delete>{intl.get("serviceCharge")} (10%)</Typography.Text>
                            ) : (
                              <Typography.Text>{intl.get("serviceCharge")} (10%)</Typography.Text>
                            )}
                          </div>
                          <Button 
                            type="link"
                            size="small"
                            icon={isExempted ? null : <StopOutlined />}
                            onClick={() => toggleServiceChargeExemption(tableName)}
                          >
                            {isExempted 
                              ? intl.get("includeServiceCharge") 
                              : intl.get("exemptServiceCharge")}
                          </Button>
                        </div>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={4} align="right">
                        {isExempted ? (
                          <Typography.Text delete>${serviceCharge.toFixed(2)}</Typography.Text>
                        ) : (
                          <Typography.Text>${serviceCharge.toFixed(2)}</Typography.Text>
                        )}
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  )}
                  
                  {systemProfile?.isServiceChargeRequired && (
                    <Table.Summary.Row className="checkout-table-final-total">
                      <Table.Summary.Cell index={0} colSpan={4}>
                        <Typography.Text strong>{intl.get("finalTotal")}</Typography.Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={4} align="right">
                        <Typography.Text strong>${finalTotal.toFixed(2)}</Typography.Text>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  )}
                </>
              );
            }}
          />
        </div>
        
        <div className="checkout-table-actions">
          <Button 
            type="primary" 
            size="large" 
            className="checkout-button"
            icon={<DollarOutlined />}
            onClick={() => handleCheckout(tableName)}
          >
            {intl.get("checkout")}
          </Button>
          <Button 
            type="default" 
            size="large" 
            className="print-button"
            icon={<PrinterOutlined />}
            onClick={() => handlePrint(tableName)}
          >
            {intl.get("print")}
          </Button>
        </div>
      </Panel>
    );
  };

  // 新增：計算經過的時間
  const calculateElapsedTime = (createdAt) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffInSeconds = Math.floor((now - created) / 1000);
    
    const hours = Math.floor(diffInSeconds / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    const seconds = diffInSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // 首次載入時獲取數據
    fetchOrders();
    fetchSystemProfile(); // 獲取系統配置
  }, [fetchOrders, fetchSystemProfile]);

  // 新增：計時器邏輯
  useEffect(() => {
    // 為每個桌號找出最早創建的訂單時間
    const updateTableTimes = () => {
      const times = {};
      Object.keys(tableOrders).forEach(tableName => {
        const orders = tableOrders[tableName] || [];
        if (orders.length > 0) {
          // 找出最早的訂單創建時間
          const oldestOrder = orders.reduce((oldest, order) => {
            const orderDate = new Date(order.createdAt);
            const oldestDate = new Date(oldest.createdAt);
            return orderDate < oldestDate ? order : oldest;
          }, orders[0]);
          
          times[tableName] = calculateElapsedTime(oldestOrder.createdAt);
        }
      });
      return times;
    };
    
    // 初始化計時器
    setTableElapsedTimes(updateTableTimes());
    
    // 每秒更新計時器
    const timerInterval = setInterval(() => {
      setTableElapsedTimes(updateTableTimes());
    }, 1000);
    
    return () => clearInterval(timerInterval);
  }, [tableOrders]);

  // 格式化時間的輔助函數
  const formatRefreshTime = (date) => {
    if (!date) return '';
    
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <Layout.Content style={style}>
      <div className="checkout-header">
        <div className="checkout-title-container">
          <Typography.Title level={2} className="checkout-title">
            {intl.get("checkout")}
          </Typography.Title>
          {lastRefreshTime && (
            <span className="last-refresh-time">
              <SyncOutlined /> {intl.get("lastRefresh")}: {formatRefreshTime(lastRefreshTime)}
            </span>
          )}
        </div>
        <Button 
          type="primary"
          icon={<ReloadOutlined />}
          onClick={handleRefresh}
          loading={loading}
          className="refresh-button"
        >
          {intl.get("refresh")}
        </Button>
      </div>
      
      {loading ? (
        <div className="checkout-loading">
          <Spin size="large" />
        </div>
      ) : Object.keys(tableOrders).length === 0 ? (
        <Result
          icon={<ShoppingCartOutlined />}
          title={intl.get("noOrdersAvailable")}
          subTitle={intl.get("checkBackLater")}
        />
      ) : (
        <Collapse 
          className="checkout-collapse"
          activeKey={activeKeys}
          onChange={handleCollapseChange}
          accordion={true}
        >
          {Object.keys(tableOrders)
            .sort((a, b) => {
              // 有待處理訂單的桌號優先顯示
              const aHasPending = tableStats[a].pendingItems > 0;
              const bHasPending = tableStats[b].pendingItems > 0;
              
              if (aHasPending && !bHasPending) return -1;
              if (!aHasPending && bHasPending) return 1;
              
              // 如果待處理狀態相同，按照最早訂單時間排序（較長時間優先）
              const aOrders = tableOrders[a] || [];
              const bOrders = tableOrders[b] || [];
              
              if (aOrders.length && bOrders.length) {
                // 找出每個桌號最早的訂單
                const oldestA = aOrders.reduce((oldest, order) => {
                  return new Date(order.createdAt) < new Date(oldest.createdAt) ? order : oldest;
                }, aOrders[0]);
                
                const oldestB = bOrders.reduce((oldest, order) => {
                  return new Date(order.createdAt) < new Date(oldest.createdAt) ? order : oldest;
                }, bOrders[0]);
                
                // 比較最早訂單的創建時間，時間較早的排前面（時間較長的排前面）
                return new Date(oldestA.createdAt) - new Date(oldestB.createdAt);
              }
              
              // 如果無法比較時間，則按桌號排序
              return a.localeCompare(b);
            })
            .map(tableName => renderTablePanel(tableName))}
        </Collapse>
      )}
    </Layout.Content>
  );
}

export default Checkout;
