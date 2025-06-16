import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    if (e.key === "Productdashboard") {
      navigate("/Productdashboard");
    } else if (e.key === "productManager") {
      navigate("/productManager");
    } else if (e.key === "categoryManager") {
      navigate("/categoryManager");
    }
  };


  return (
    <Sider
      width={220}
      className="fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-50"
      style={{
        paddingTop: "64px",
        overflowY: "auto"
      }}
    >
      <Menu
        mode="vertical"
        defaultSelectedKeys={["Productdashboard"]}
        onClick={handleMenuClick}
        className="border-0"
      >
        <Menu.Item key="Productdashboard">Dashboard</Menu.Item>
        <Menu.Item key="productManager">Manager Product</Menu.Item>
        <Menu.Item key="categoryManager">Category Manager</Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
