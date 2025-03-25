import React, { useEffect, useState, useCallback } from "react";
import {
  Layout,
  Button,
  Typography,
  Card,
  Space,
  Tag,
  message,
  Row,
  Col,
  Divider,
  Badge,
  Modal,
  Input,
  Form,
  InputNumber
} from "antd";
import { 
  CheckOutlined, 
  CloseOutlined, 
  UndoOutlined, 
  SwapOutlined,
  AppstoreOutlined
} from "@ant-design/icons";
import Sider from "../../layout/Sider";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import { 
  getAllOrders, 
  updateOrderStatus, 
  updateOrderTable, 
  updateAllOrdersTables 
} from "../../../api/Order";
import intl from "react-intl-universal";
import "./index.css";

function Order() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider />
      <Layout>
        <Header />
        <OrderContent />
        <Footer />
      </Layout>
    </Layout>
  );
}

function OrderContent() {
  const [orders, setOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [markedAsDoneOrders, setMarkedAsDoneOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState({});
  const [tableModalVisible, setTableModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [tableForm] = Form.useForm();
  const [uniqueTables, setUniqueTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('all');
  const [tableOrderCounts, setTableOrderCounts] = useState({});
  const [tablesWithTimeoutOrders, setTablesWithTimeoutOrders] = useState({});
  const [timeoutMinutes, setTimeoutMinutes] = useState(() => {
    // 從 localStorage 讀取超時分鐘設置，如果沒有則使用默認值 20
    const savedTimeout = localStorage.getItem('orderTimeoutMinutes');
    return savedTimeout ? parseInt(savedTimeout, 10) : 20;
  });
  const [allPendingOrders, setAllPendingOrders] = useState([]);  // 新增: 存儲所有待處理訂單（未過濾的）

  const style = {
    padding: 12,
    height: "auto",
    width: "auto",
    overflow: "auto",
    backgroundColor: "#E2E2E2",
  };

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllOrders();
      
      // 只過濾status id為1或2的訂單
      const filteredOrders = (res.data || []).filter(
        (order) => order.orderStatusId === 1 || order.orderStatusId === 2
      );
      
      // 按創建時間排序 - 舊的排前面 (較小的時間戳)
      const sortedOrders = [...filteredOrders].sort((a, b) => 
        new Date(a.createdAt) - new Date(b.createdAt)
      );
      
      setOrders(sortedOrders);
      
      // 儲存所有待處理訂單（未過濾的）用於計算超時
      const allPending = sortedOrders.filter((order) => order.orderStatusId === 1);
      setAllPendingOrders(allPending);
      
      // 檢查哪些桌號有超時訂單 - 基於所有訂單而不僅是過濾後的
      checkTablesWithTimeoutOrders(allPending);
      
      // 計算每個桌號的訂單數量
      const tableCounts = {};
      sortedOrders.forEach(order => {
        const table = order.tableName;
        if (!tableCounts[table]) {
          tableCounts[table] = {
            total: 0,
            pending: 0,
            markedAsDone: 0
          };
        }
        tableCounts[table].total += 1;
        if (order.orderStatusId === 1) {
          tableCounts[table].pending += 1;
        } else if (order.orderStatusId === 2) {
          tableCounts[table].markedAsDone += 1;
        }
      });
      setTableOrderCounts(tableCounts);
      
      // 提取唯一的桌號列表並按訂單數量排序
      const tables = Object.keys(tableCounts).sort((a, b) => 
        tableCounts[b].total - tableCounts[a].total
      );
      setUniqueTables(tables);
      
      // 按當前選擇的桌號過濾
      filterOrdersByTable(sortedOrders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      message.error(intl.get("fetchOrdersFailed"));
    } finally {
      setLoading(false);
    }
  }, []);  // 移除 selectedTable 依賴，避免選擇桌號時重新獲取數據
  
  // 按桌號過濾訂單
  const filterOrdersByTable = useCallback((allOrders) => {
    let filteredOrders = allOrders;
    
    // 如果不是全部，則按桌號過濾
    if (selectedTable !== 'all') {
      filteredOrders = allOrders.filter(order => order.tableName === selectedTable);
      
      // 如果過濾後沒有訂單，重置為全部
      if (filteredOrders.length === 0) {
        setSelectedTable('all');
        filteredOrders = allOrders;
      }
    }
    
    setPendingOrders(filteredOrders.filter((order) => order.orderStatusId === 1));
    setMarkedAsDoneOrders(filteredOrders.filter((order) => order.orderStatusId === 2));
  }, [selectedTable]);
  
  // 處理桌號過濾器點擊
  const handleTableFilterClick = (table) => {
    setSelectedTable(table);
  };

  // 更新訂單狀態的處理函數
  const handleUpdateStatus = async (orderId, newStatusId) => {
    try {
      await updateOrderStatus(orderId, newStatusId);
      message.success(intl.get("statusUpdateSuccess"));
      fetchOrders(); // 重新獲取訂單數據
    } catch (error) {
      console.error("Failed to update order status:", error);
      message.error(intl.get("statusUpdateFailed"));
    }
  };

  // 處理拒絕訂單
  const handleRejectOrder = (orderId) => {
    Modal.confirm({
      title: intl.get("rejectOrderConfirm"),
      content: intl.get("rejectOrderConfirmText"),
      okText: intl.get("confirm"),
      cancelText: intl.get("cancel"),
      onOk: () => {
        handleUpdateStatus(orderId, 4);
      }
    });
  };

  // 處理雙擊完成訂單
  const handleDoubleClick = (orderId) => {
    // 直接將訂單狀態設為完成（狀態2）
    handleUpdateStatus(orderId, 2);
  };

  // 處理桌號點擊
  const handleTableClick = (e, order) => {
    e.stopPropagation(); // 防止觸發卡片的雙擊事件
    setSelectedOrder(order);
    tableForm.setFieldsValue({ newTableName: order.tableName });
    setTableModalVisible(true);
  };

  // 處理修改單個訂單桌號
  const handleUpdateTable = async () => {
    try {
      const values = await tableForm.validateFields();
      if (!selectedOrder) return;

      await updateOrderTable(selectedOrder.id, values.newTableName);
      message.success(intl.get("tableUpdateSuccess"));
      setTableModalVisible(false);
      fetchOrders(); // 重新獲取訂單數據
    } catch (error) {
      console.error("Failed to update table:", error);
      message.error(intl.get("tableUpdateFailed"));
    }
  };

  // 處理修改全部相同桌號的訂單
  const handleUpdateAllTables = async () => {
    try {
      const values = await tableForm.validateFields();
      if (!selectedOrder) return;

      // 如果當前正在過濾特定桌號且要修改的就是這個桌號
      const isCurrentFiltered = selectedTable === selectedOrder.tableName;

      await updateAllOrdersTables(selectedOrder.tableName, values.newTableName);
      message.success(intl.get("allTablesUpdateSuccess"));
      setTableModalVisible(false);
      
      // 如果當前篩選的就是被修改的桌號，則更新篩選條件
      if (isCurrentFiltered) {
        setSelectedTable(values.newTableName);
      }
      
      fetchOrders(); // 重新獲取訂單數據
    } catch (error) {
      console.error("Failed to update all tables:", error);
      message.error(intl.get("allTablesUpdateFailed"));
    }
  };

  // 計算訂單經過的時間
  const calculateElapsedTime = (createdAt) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffInSeconds = Math.floor((now - created) / 1000);
    
    const hours = Math.floor(diffInSeconds / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    const seconds = diffInSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // 檢查訂單是否超時
  const isOrderTimedOut = (createdAt) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffInMinutes = Math.floor((now - created) / 60000); // 轉換為分鐘
    return diffInMinutes >= timeoutMinutes;
  };

  // 處理超時分鐘數變更
  const handleTimeoutMinutesChange = (value) => {
    if (value !== null && value > 0) {
      setTimeoutMinutes(value);
      localStorage.setItem('orderTimeoutMinutes', value.toString());
      
      // 重新檢查哪些桌號有超時訂單
      checkTablesWithTimeoutOrders(pendingOrders);
    }
  };
  
  // 檢查哪些桌號有超時訂單
  const checkTablesWithTimeoutOrders = (pendingOrders) => {
    const tablesTimeout = {};
    pendingOrders.forEach(order => {
      if (isOrderTimedOut(order.createdAt)) {
        tablesTimeout[order.tableName] = true;
      }
    });
    setTablesWithTimeoutOrders(tablesTimeout);
  };

  // 獲取當前語言的訂單項目名稱
  const getLocalizedName = (record) => {
    if (localStorage.getItem("locale") === "en-US") {
      return record.itemNameEnUS;
    } else if (localStorage.getItem("locale") === "zh-CN") {
      return record.itemNameZhCN;
    } else {
      return record.itemNameZhHK;
    }
  };

  // 獲取當前語言的自訂內容
  const getLocalizedCustomString = (record) => {
    if (localStorage.getItem("locale") === "en-US") {
      return record.customStringEnUS;
    } else if (localStorage.getItem("locale") === "zh-CN") {
      return record.customStringZhCN;
    } else {
      return record.customStringZhHK;
    }
  };

  useEffect(() => {
    fetchOrders();
    
    // 設置定時器定期更新訂單列表
    const timer = setInterval(fetchOrders, 60000); // 每分鐘更新一次
    
    return () => clearInterval(timer);
  }, [fetchOrders]);

  useEffect(() => {
    // 訂單數據變化時，重新過濾
    filterOrdersByTable(orders);
  }, [orders, selectedTable, filterOrdersByTable]);

  useEffect(() => {
    // 為每個pending訂單創建初始時間
    const initialTimeElapsed = {};
    pendingOrders.forEach(order => {
      initialTimeElapsed[order.id] = calculateElapsedTime(order.createdAt);
    });
    setTimeElapsed(initialTimeElapsed);
    
    // 每秒更新計時器
    const timerInterval = setInterval(() => {
      const updatedTimeElapsed = {};
      pendingOrders.forEach(order => {
        updatedTimeElapsed[order.id] = calculateElapsedTime(order.createdAt);
      });
      setTimeElapsed(updatedTimeElapsed);
    }, 1000);
    
    return () => clearInterval(timerInterval);
  }, [pendingOrders]);

  useEffect(() => {
    // 當訂單數據或超時設置變更時，重新計算超時桌號
    checkTablesWithTimeoutOrders(allPendingOrders);
  }, [allPendingOrders, timeoutMinutes]);

  // 渲染桌號過濾器按鈕
  const renderTableFilters = () => {
    if (orders.length === 0) {
      return (
        <div className="empty-orders-container main-empty">
          <Typography.Text className="empty-orders-text">
            {intl.get("noOrders")}
          </Typography.Text>
        </div>
      );
    }
    
    return (
      <div className="table-filters">
        <Button
          type={selectedTable === 'all' ? "primary" : "default"}
          icon={<AppstoreOutlined />}
          onClick={() => handleTableFilterClick('all')}
          className="table-filter-button"
        >
          {intl.get("allTables")}
        </Button>
        {uniqueTables.map(table => {
          const count = tableOrderCounts[table] || { total: 0, pending: 0, markedAsDone: 0 };
          const allMarkedAsDone = count.total > 0 && count.pending === 0 && count.markedAsDone > 0;
          const hasTimeoutOrders = tablesWithTimeoutOrders[table];
          
          // 決定桌號按鈕的樣式
          let buttonStyle = {};
          let buttonClassName = "table-filter-button";
          
          if (selectedTable !== table) {
            if (hasTimeoutOrders) {
              buttonStyle = { backgroundColor: '#fff1f0', borderColor: '#ff7875' };
              buttonClassName += " timed-out-table-button";
            } else if (allMarkedAsDone) {
              buttonStyle = { backgroundColor: '#f6ffed', borderColor: '#b7eb8f' };
              buttonClassName += " all-marked-as-done-button";
            }
          }
          
          return (
            <Button
              key={table}
              type={selectedTable === table ? "primary" : "default"}
              onClick={() => handleTableFilterClick(table)}
              className={buttonClassName}
              style={buttonStyle}
            >
              {table}
              <div className="filter-count-detail">
                <span className="pending-count">{count.pending}</span>
                <span className="separator">/</span>
                <span className="marked-as-done-count">{count.markedAsDone}</span>
              </div>
            </Button>
          );
        })}
      </div>
    );
  };

  // 渲染訂單超時設置
  const renderTimeoutSetting = () => {
    return (
      <div className="timeout-setting-container">
        <InputNumber
          min={1}
          max={120}
          value={timeoutMinutes}
          onChange={handleTimeoutMinutesChange}
          className="timeout-minutes-input"
        />
        <span className="timeout-minutes-label">{intl.get("minutesTimeout")}</span>
      </div>
    );
  };

  // 渲染待處理訂單卡片
  const renderPendingOrderCards = () => {
    if (pendingOrders.length === 0) {
      return (
        <div className="empty-orders-container">
          <Typography.Text className="empty-orders-text">
            {intl.get("noPendingOrders")}
          </Typography.Text>
        </div>
      );
    }
    
    return (
      <Row gutter={[16, 16]} className="order-cards">
        {pendingOrders.map(order => {
          // 檢查此訂單是否超時
          const isTimedOut = isOrderTimedOut(order.createdAt);
          
          return (
            <Col xs={24} sm={12} md={8} lg={6} key={order.id}>
              <Card 
                className={`order-card pending-card ${isTimedOut ? 'timed-out-card' : ''}`}
                loading={loading}
                onDoubleClick={() => handleDoubleClick(order.id)}
              >
                <div className="timer-container">
                  <Tag 
                    color={isTimedOut ? "red" : "orange"} 
                    className={`timer-tag ${isTimedOut ? 'timed-out-timer' : ''}`}
                  >
                    {timeElapsed[order.id] || "00:00:00"}
                  </Tag>
                </div>
                
                <div 
                  className="table-container"
                  onClick={(e) => handleTableClick(e, order)}
                >
                  <div className="table-label">{intl.get("tableName")}:</div>
                  <div className="table-number">{order.tableName}</div>
                </div>
                
                <div className="order-content">
                  <Typography.Title level={4} className="item-name">
                    {getLocalizedName(order)}
                  </Typography.Title>
                  
                  <div className="order-detail">
                    <p>
                      <strong>{intl.get("quantity")}:</strong> {order.quantity}
                    </p>
                    {getLocalizedCustomString(order) && (
                      <p>
                        <strong>{intl.get("customization")}:</strong> {getLocalizedCustomString(order)}
                      </p>
                    )}
                  </div>
                </div>
                
                <Divider style={{ margin: '12px 0' }} />
                
                <div className="order-actions">
                  <div className="button-row">
                    <Button
                      type="primary"
                      icon={<CheckOutlined />}
                      onClick={() => handleUpdateStatus(order.id, 2)}
                      className="action-button complete-button"
                      size="large"
                    >
                      {intl.get("complete")}
                    </Button>
                    <Button
                      danger
                      icon={<CloseOutlined />}
                      onClick={() => handleRejectOrder(order.id)}
                      className="action-button reject-button"
                      size="large"
                    >
                      {intl.get("reject")}
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  };

  // 渲染標記為完成訂單卡片
  const renderMarkedAsDoneOrderCards = () => {
    if (markedAsDoneOrders.length === 0) {
      return (
        <div className="empty-orders-container">
          <Typography.Text className="empty-orders-text">
            {intl.get("noMarkedAsDoneOrders")}
          </Typography.Text>
        </div>
      );
    }
    
    return (
      <Row gutter={[16, 16]} className="order-cards">
        {markedAsDoneOrders.map(order => {
          return (
            <Col xs={24} sm={12} md={8} lg={6} key={order.id}>
              <Card 
                className="order-card marked-as-done-card"
                loading={loading}
              >
                <div className="order-date">
                  {new Date(order.createdAt).toLocaleString(undefined, {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false // 使用24小時制，去除上午/下午顯示
                  })}
                </div>
                
                <div 
                  className="table-container"
                  onClick={(e) => handleTableClick(e, order)}
                >
                  <div className="table-label">{intl.get("tableName")}:</div>
                  <div className="table-number">{order.tableName}</div>
                </div>
                
                <div className="order-content">
                  <Typography.Title level={4} className="item-name">
                    {getLocalizedName(order)}
                  </Typography.Title>
                  
                  <div className="order-detail">
                    <p>
                      <strong>{intl.get("quantity")}:</strong> {order.quantity}
                    </p>
                    {getLocalizedCustomString(order) && (
                      <p>
                        <strong>{intl.get("customization")}:</strong> {getLocalizedCustomString(order)}
                      </p>
                    )}
                  </div>
                </div>
                
                <Divider style={{ margin: '12px 0' }} />
                
                <div className="order-actions">
                  <Button
                    icon={<UndoOutlined />}
                    onClick={() => handleUpdateStatus(order.id, 1)}
                    block
                    className="action-button"
                    size="large"
                  >
                    {intl.get("undo")}
                  </Button>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  };

  return (
    <Layout.Content style={style}>
      <Typography.Title level={2}>
        {intl.get("orders")}
      </Typography.Title>
      
      {/* 桌號過濾器 */}
      {renderTableFilters()}
      
      {/* 訂單超時設置 */}
      {renderTimeoutSetting()}
      
      <Typography.Title level={3}>
        {intl.get("pendingOrders")} 
        <Badge 
          count={pendingOrders.length} 
          style={{ backgroundColor: '#faad14', marginLeft: 8 }}
          overflowCount={999}
        />
      </Typography.Title>
      {renderPendingOrderCards()}
      
      <Typography.Title level={3} style={{ marginTop: 20 }}>
        {intl.get("markedAsDoneOrders")}
        <Badge 
          count={markedAsDoneOrders.length} 
          style={{ backgroundColor: '#52c41a', marginLeft: 8 }}
          overflowCount={999}
        />
      </Typography.Title>
      {renderMarkedAsDoneOrderCards()}

      {/* 桌號修改對話框 */}
      <Modal
        title={intl.get("changeTable")}
        open={tableModalVisible}
        onCancel={() => setTableModalVisible(false)}
        footer={null}
      >
        <Form form={tableForm} layout="vertical">
          <Form.Item
            label={intl.get("currentTable")}
          >
            <Input value={selectedOrder?.tableName} disabled />
          </Form.Item>
          <Form.Item
            name="newTableName"
            label={intl.get("newTable")}
            rules={[
              {
                required: true,
                message: intl.get("tableNameRequired"),
              },
            ]}
          >
            <Input placeholder={intl.get("enterNewTable")} />
          </Form.Item>
          <div className="table-modal-buttons">
            <Button 
              type="primary" 
              icon={<SwapOutlined />} 
              onClick={handleUpdateTable}
            >
              {intl.get("changeThisOrder")}
            </Button>
            <Button 
              type="primary" 
              danger
              icon={<SwapOutlined />} 
              onClick={handleUpdateAllTables}
            >
              {intl.get("changeAllOrders")}
            </Button>
          </div>
        </Form>
      </Modal>
    </Layout.Content>
  );
}

export default Order;
