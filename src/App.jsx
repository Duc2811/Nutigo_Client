import { I18nextProvider } from "react-i18next";
import i18n from "./Service/locales/i18n";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import { ConfigProvider } from "antd";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Screen/Client/Login";
import Register from "./Screen/Client/Register";
import Forgot from "./Screen/Client/Forgot";
import Home from "./Screen/Home";
import VerifyScreen from "./Screen/Client/Verify";
import Otp from "./Screen/Client/Otp";
import ResetPassword from "./Screen/Client/ResetPassword";
import NotFound from "./Screen/Error/NotFound";
import Blog from "./Screen/Client/blog/Blog";
import BlogDetail from "./Screen/Client/blog/BlogDetail";
import LandingPage from "./pages/LandingPage";


import UserProfile from "./Screen/Client/UserProfile";

import Cart from "./Screen/Client/cart/cart";
import Checkout from "./Screen/Client/cart/checkout";
import ReturnQR from "./Screen/Client/cart/ReturnQR";
import UpdateProfile from "./Screen/Client/UpdateProfile";
import ChangePassword from "./Screen/Client/ChangePassword";

import OrderDetails from "./Screen/Client/Order/OrderDetail";
import OrderScreen from "./Screen/Client/Order/Order";

import DashBoard from "./Screen/ProductManager/DashBoard";
import ProductManager from "./Screen/ProductManager/productManager";
import ProductDetail from "./Screen/Client/product/productDetail";
import MangerCategory from "./Screen/ProductManager/MangerCategory";

//Admin Page
import AdminLayout from "./Screen/Admin/AdminLayout";
import AdminDashboard from "./Screen/Admin/AdminDashboard";
import UserManagement from "./Screen/Admin/UserManagement";
import SaleManagement from "./Screen/Admin/SaleManagement";
import OrderManagement from "./Screen/Admin/OrderManagement";
import OrderManagementShiper from "./Screen/Shiper/OrderManagement";
import ManagerProductManagement from "./Screen/Admin/ManagerProductManagement";
import FeedbackManagement from "./Screen/Admin/FeedbackManagement";
import BlogList from "./Screen/Admin/BlogList";
import AddBlog from "./Screen/Admin/AddBlog";
import UpdateBlog from "./Screen/Admin/UpdateBlog";

// import AdsController from "./Screen/Admin/ads/AdsController";
import AdminLogin from './Screen/Admin/AdminLogin'
import ShiperLogin from './Screen/Admin/AdminLogin'

//sale
import SaleScreen from "./Screen/Sale/SaleScreen";
import AddSaleScreen from "./Screen/Sale/AddSaleScreen";
import UpdateSaleScreen from "./Screen/Sale/UpdateSale";
import ProductList from "./Screen/Client/product/productList";
import ProductSaleDetail from "./Screen/Client/product/productSaleDetail";

import SaleOrderManagement from "./Screen/Sale/SaleOrderManagement";
import SearchProduct from "./Screen/Client/product/searchProduct";

import LuckyWheel from "./Screen/discount/luckWheel";
import CompareProducts from "./Screen/Client/product/compareProducts";
import Contact from "./Screen/Client/contact/Contact";
import DiscountDashboard from "./Screen/Admin/discount/discountDashboard";
import DiscountStatistics from "./Screen/Admin/discount/discountStatistics";
import CreateDiscount from "./Screen/Admin/discount/createDiscount";
import UpdateDiscount from "./Screen/Admin/discount/updateDiscount";
import UserDiscount from "./Screen/Admin/discount/userDiscount";

//Ship
// import ShiperDashboard from "./Screen/Shiper/ShipperDashboard";
import ShiperLayout from "./Screen/Shiper/ShiperLayout";

import GoogleCallback from './Screen/Client/GoogleCallback';
import About from "./Screen/Client/contact/About";

const App = () => {
  const isDarkMode = useSelector((state) => state.user.darkMode);


  return (
    <I18nextProvider i18n={i18n}>
      <ToastContainer position="top-right" autoClose={3000} />
      <ConfigProvider
        theme={{
          token: {
            colorText: isDarkMode ? "#ffffff" : "#1c1e21",
            colorBgBase: isDarkMode ? "#1e2a3c" : "#fff",
            colorBorder: isDarkMode ? "#3a3f44" : "#d9d9d9",
            colorTextPlaceholder: isDarkMode ? "#b0c4de" : "#8c8c8c",
          },
          components: {
            Menu: {
              colorText: isDarkMode ? "#ffffff" : "#1c1e21",
              colorBgBase: isDarkMode ? "#1e2a3c" : "#fff",
            },
          },
        }}
      >
        <Router>
          <Routes>
            {/* duc */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/verify" element={<VerifyScreen />} />
            <Route path="/otp/:email" element={<Otp />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About/>} />
            <Route path="/cart">
              <Route index element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="returnQR" element={<ReturnQR />} />
            </Route>
            {/* an */}
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/search" element={<SearchProduct />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/order">
              <Route index element={<OrderScreen />} />
              <Route path="orderDetail/:id" element={<OrderDetails />} />
            </Route>
            {/* <Route path="/ads" element={<AdsController />} /> */}
            {/* huy */}
            <Route path="/Productdashboard" element={<DashBoard />} />

            <Route path="/productManager" element={<ProductManager />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/categoryManager" element={<MangerCategory />} />
            {/* nam */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/*"
              element={
                <AdminProtectedRoute>
                  <AdminLayout />
                </AdminProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="manage-user" element={<UserManagement />} />
              <Route path="saler-list" element={<SaleManagement />} />
              <Route path="order-list" element={<OrderManagement />} />
              <Route
                path="manage-productmanager"
                element={<ManagerProductManagement />}
              />
              <Route path="manage-feedback" element={<FeedbackManagement />} />
              <Route path="blog-list" element={<BlogList />} />
              <Route path="add-blog" element={<AddBlog />} />
              <Route path="update-blog/:id" element={<UpdateBlog />} />
              {/* <Route path="manage-ads" element={<AdsController />} /> */}
              {/* discount */}
              <Route path="manage-discount" element={<DiscountDashboard />} />
              <Route
                path="discountStatistics"
                element={<DiscountStatistics />}
              />
              <Route path="createDiscount" element={<CreateDiscount />} />
              <Route
                path="updateDiscount/:discountId"
                element={<UpdateDiscount />}
              />
              <Route path="userDiscount" element={<UserDiscount />} />
            </Route>
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            {/* tuan */}
            <Route path="/all-products" element={<ProductList />} />
            <Route
              path="/product-list/:subcategoryId"
              element={<ProductList />}
            />
            <Route path="/sale" element={<SaleScreen />} />
            <Route path="/sale/add" element={<AddSaleScreen />} />
            <Route path="/sale/update" element={<UpdateSaleScreen />} />
            <Route path="/sale/orders" element={<SaleOrderManagement />} />
            <Route path="/product-sale/:id" element={<ProductSaleDetail />} />;
            <Route path="/sale/dashboard" element={<SaleScreen />} />
            {/* end */}
            {/* Ship */}
            {/* <Route path="/shipper" element={<ShiperDashboard />} /> */}
            <Route path="/shipper/login" element={<ShiperLogin />} />
            <Route
              path="/shipper/*"
              element={
                <ShiperProtectedRoute>
                  <ShiperLayout />
                </ShiperProtectedRoute>
              }
            >
              <Route index element={<OrderManagementShiper />} />
            </Route>
            <Route path="/luckywheel" element={<LuckyWheel />} />
            <Route path="/compare" element={<CompareProducts />} />
            <Route path="/google-callback" element={<GoogleCallback />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ConfigProvider>
    </I18nextProvider>
  );
};

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

const AdminProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);

  if (!user || user.role !== "admin") {
    return <NotFound />;
  }

  return children;
};

const ShiperProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);

  if (!user || user.role !== "shipper") {
    return <NotFound />;
  }

  return children;
};

AdminProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
ShiperProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

// const SaleProtectedRoute = ({ children }) => {
//   const user = useSelector((state) => state.user.user);

//   if (!user || user.role !== "sale") {
//     return <NotFound />;
//   }

//   return children;
// };

// SaleProtectedRoute.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export default App;
