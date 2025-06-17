import {
  Layout,
  Menu,
  Space,
  Avatar,
  Dropdown,
  Switch,
  Badge,
  Spin,
} from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import {
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  MoonOutlined,
  SunOutlined,
  ShoppingCartOutlined,
  OrderedListOutlined,
  GlobalOutlined,
  HomeOutlined,
  ShopOutlined,
  BookOutlined,
  ContactsOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { getAllCategory } from "../../Service/Client/ApiProduct";

import ButtonAntd from "../../Component/Button";
import InputSearch from "../../Component/InputSearch";
import { doLogout, doDarkMode } from "../../Store/reducer/userReducer";
import { toast } from "react-toastify";

const DEFAULT_LOGO = "/NutiGo.png";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { t } = useTranslation("header");
  const { i18n } = useTranslation();
  const { token, _id: userId } = useSelector((state) => state.user?.user || {});
  const { nameApp, logo } = useSelector((state) => state.admin?.app || {});
  const isDarkMode = useSelector((state) => state.user.darkMode);
  const cartItems = useSelector((state) => state.cart.items[userId] || []);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Effects
  useEffect(() => {
    document.title = nameApp || "NutiGo";
    const iconLink = document.querySelector("link[rel='icon']");
    if (logo && iconLink) {
      iconLink.href = logo;
    }
  }, [logo, nameApp]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await getAllCategory();
        console.log("Header API Response:", response); // Debug log
        
        // Handle new data structure with categories array and totalPage
        if (response && response.categories && Array.isArray(response.categories)) {
          console.log("Setting categories in Header:", response.categories); // Debug log
          setCategories(response.categories);
        } else if (Array.isArray(response)) {
          // Fallback for old structure
          setCategories(response);
        } else {
          console.error("Invalid response format:", response);
          setCategories([]);
          toast.error(t("Failed to load categories"));
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error(t("Failed to load categories"));
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [t]);

  // Event handlers
  const handleLogin = () => navigate("/login");

  const handleLogout = () => {
    dispatch(doLogout()); // Thực hiện logout
    dispatch(doDarkMode(false)); // Đặt lại dark mode về false (light mode)
    toast.success(t("Logout success!"));
    navigate("/");
  };

  const handleOrder = () => navigate("/order");
  const toggleDarkMode = () => dispatch(doDarkMode(!isDarkMode));
  const handleUserProfile = () => navigate("/userProfile");

  const handleLanguageChange = (lang) => i18n.changeLanguage(lang);

  // Navigation handlers for new sections
  const handleHome = () => navigate("/home");
  const handleProduct = () => navigate("/all-products");
  const handleBlog = () => navigate("/blog");
   const handleContact = () => navigate("/contact");
   const handleAbout = () => navigate("/about");

  // Xác định tab hiện tại dựa trên đường dẫn
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === "/") return ["home"];
    if (path.includes("/all-products")) return ["product"];
    if (path.includes("/blog")) return ["blog"];
    return [];
  };

  // Create product menu with categories and subcategories
  const productMenu = (
    <Menu
      style={{
        minWidth: "200px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        backgroundColor: isDarkMode ? "#1e2a3c" : "#fff",
      }}
    >
      {isLoading ? (
        <Menu.Item disabled>
          <Space>
            <Spin size="small" />
            {t("Loading categories...")}
          </Space>
        </Menu.Item>
      ) : categories.length === 0 ? (
        <Menu.Item disabled>{t("No categories available")}</Menu.Item>
      ) : (
        categories.map((category) => {
          console.log(`Processing category: ${category.name}`, category); // Debug log
          return (
            <Menu.SubMenu
              key={category._id}
              title={category.name}
              icon={<ShopOutlined />}
            >
              {category.subCategories && category.subCategories.length > 0 ? (
                category.subCategories.map((sub) => {
                  console.log(`Processing subcategory: ${sub.name}`, sub); // Debug log
                  return (
                    <Menu.Item
                      key={sub.id || sub._id}
                      onClick={() => navigate(`/all-products?subcategory=${sub.id || sub._id}`)}
                    >
                      {sub.name}
                    </Menu.Item>
                  );
                })
              ) : (
                <Menu.Item
                  key={category._id}
                  onClick={() => navigate(`/all-products?category=${category._id}`)}
                >
                  {t("All")} {category.name}
                </Menu.Item>
              )}
            </Menu.SubMenu>
          );
        })
      )}
    </Menu>
  );

  // Profile dropdown menu
  const profileMenu = (
    <Menu
      style={{
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        backgroundColor: isDarkMode ? "#1e2a3c" : "#fff",
      }}
    >
      <Menu.Item
        key="profile"
        icon={<UserOutlined />}
        onClick={handleUserProfile}
      >
        {t("Profile")}
      </Menu.Item>
      <Menu.Item
        key="order"
        icon={<OrderedListOutlined />}
        onClick={handleOrder}
      >
        {t("Order")}
      </Menu.Item>

      <Menu.Item
        key="discount"
        icon={<ShoppingCartOutlined />}
        onClick={() => navigate("/luckywheel")}>
        {t("Discount")}
      </Menu.Item>

      <Menu.Item key="darkmode">
        <Space>
          {isDarkMode ? <MoonOutlined /> : <SunOutlined />}
          {t("DarkMode")}
          <Switch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
            size="small"
          />
        </Space>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        {t("Logout")}
      </Menu.Item>
    </Menu>
  );

  const languageMenu = (
    <Menu>
      <Menu.Item key="en" onClick={() => handleLanguageChange("en")}>
        <span>{t("English")}</span>
      </Menu.Item>
      <Menu.Item key="vi" onClick={() => handleLanguageChange("vi")}>
        <span>{t("Vietnamese")}</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout.Header
      style={{
        position: "fixed",
        top: 0,
        zIndex: 1000,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: isDarkMode ? "#161b22" : "#001529",
        padding: "0 20px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
        transition: "background-color 0.3s ease",
        height: 64,
      }}
    >
      {/* Logo Section */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          onClick={() => navigate("/")}
          src={logo || DEFAULT_LOGO}
          width={80}
          alt={nameApp || "Logo"}
          style={{
            cursor: "pointer",
            paddingTop: "15px",
            borderRadius: "8px",
            width: "120px",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          aria-label="Go to homepage"
        />
      </div>

      {/* Navigation Section */}
      <Menu
        mode="horizontal"
        selectedKeys={getSelectedKey()}
        theme={isDarkMode ? "dark" : "dark"}
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "transparent",
          borderBottom: "none",
          fontSize: "16px",
        }}
      >
        <Menu.Item
          key="home"
          icon={<HomeOutlined />}
          onClick={handleHome}
          style={{ color: isDarkMode ? "#fff" : "#fff" }}
        >
          {t("Home")}
        </Menu.Item>
        <Menu.SubMenu
          key="product"
          icon={<ShopOutlined />}
          title={t("Product")}
          popupClassName={isDarkMode ? "dark-dropdown" : "light-dropdown"}
          popupOffset={[0, 0]}
          overlay={productMenu}
        >
          <Menu.Item key="all-products" onClick={handleProduct}>
            {t("All Products")}
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item
          key="blog"
          icon={<BookOutlined />}
          onClick={handleBlog}
          style={{ color: isDarkMode ? "#fff" : "#fff" }}
        >
          {t("Blog")}
        </Menu.Item>
        <Menu.Item
          key="contact"
          icon={<ContactsOutlined />}
          onClick={handleContact}
          style={{ color: isDarkMode ? "#fff" : "#fff" }}
        >
          {t("Contact")}
        </Menu.Item>
        <Menu.Item
          key="about"
          icon={<AppstoreOutlined/>}
          onClick={handleAbout}
          style={{ color: isDarkMode ? "#fff" : "#fff" }}
        >
          {t("About")}
        </Menu.Item>
      </Menu>

      {/* Right Section */}
      <Space
        size={25}
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "auto",
          height: "100%",
        }}
      >
        <InputSearch
          style={{
            height: "36px",
            width: "200px",
          }}
        />

        <Badge count={cartCount} offset={[5, 25]} size="small" color="#ff4d4f">
          <ShoppingCartOutlined
            onClick={() => navigate("/cart")}
            style={{
              fontSize: "24px",
              cursor: "pointer",
              color: "#fff",
              transition: "color 0.3s ease",
              display: "flex",
              alignItems: "center",
              marginTop: "25px",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#40c4ff")}
            onMouseLeave={(e) => (e.target.style.color = "#fff")}
            aria-label={`Cart with ${cartCount} items`}
          />
        </Badge>

        <Dropdown
          overlay={languageMenu}
          trigger={["click"]}
          placement="bottomRight"
        >
          <GlobalOutlined
            style={{
              fontSize: "24px",
              color: "#fff",
              cursor: "pointer",
              lineHeight: "64px",
              marginTop: "20px",
            }}
          />
        </Dropdown>

        {token ? (
          <Dropdown
            overlay={profileMenu}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Avatar
              size={36}
              icon={<UserOutlined />}
              style={{
                cursor: "pointer",
                backgroundColor: isDarkMode ? "#30363d" : "#1890ff",
                transition: "background-color 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="User profile menu"
            />
          </Dropdown>
        ) : (
          <ButtonAntd
            onClick={handleLogin}
            type="primary"
            icon={<LoginOutlined />}
            content={t("login")}
            style={{
              borderRadius: "6px",
              transition: "all 0.3s ease",
              height: "36px",
            }}
          />
        )}
      </Space>
    </Layout.Header>
  );
};

export default Header;
