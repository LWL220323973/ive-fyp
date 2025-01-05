import { Layout } from "antd";
function Footer() {
  return (
    <Layout.Footer
      style={{
        textAlign: "center",
        backgroundColor: "#fff",
      }}
    >
      IVE_FYP ©{new Date().getFullYear()} Created by Kelvin Chang
    </Layout.Footer>
  );
}

export default Footer;
