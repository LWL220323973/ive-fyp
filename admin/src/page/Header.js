import { Button, Layout, message } from "antd";
import Icon from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
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
  const onLogout = () => {
    sessionStorage.removeItem("user");
    message.success("Logout successful!", 1);
    navigate("/");
  };
  return (
    <Layout.Header
      style={{
        background: "#fff",
        padding: 0,
        textAlign: "center",
        fontSize: "60px",
        fontWeight: "bold",
      }}
    >
        寶斯重慶紙包魚
      <Button
        type="link"
        style={{ float: "right", height: "100%" }}
        onClick={onLogout}
      >
        <Icon component={LogoutSvg} />
      </Button>
    </Layout.Header>
  );
}

export default Header;
