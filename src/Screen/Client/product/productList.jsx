import {
  Layout,
  Typography,
  Row,
  Col,
  Space,
  Button,
  Card,
  Modal,
  Select,
  message,
  Slider,
  Radio,
  Popover,
  Tooltip,
  Pagination,
} from "antd";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { 
  SwapOutlined, 
  FilterOutlined,
  SortAscendingOutlined,
  DollarOutlined,
  TagsOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import CompareProduct from "../../../Component/CompareProduct";
import { toast } from "react-toastify";
import { 
  getAllProduct, 
  getAllCategory, 
  getAllProductBySubCategory
} from "../../../Service/Client/ApiProduct";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const ProductList = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const subcategoryId = searchParams.get('subcategory');
  const isDarkMode = useSelector((state) => state.user.darkMode) || false;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isCompareModalVisible, setIsCompareModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [sortBy, setSortBy] = useState('default');
  const [status, setStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [totalProducts, setTotalProducts] = useState(0);
  const navigate = useNavigate();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategory();
        if (Array.isArray(response)) {
          setCategories(response);
        } else if (response && Array.isArray(response.categories)) {
          setCategories(response.categories);
        } else {
          console.error("Invalid categories data:", response);
          setCategories([]);
          message.error("Failed to load categories.");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
        message.error("Failed to load categories.");
      }
    };

    fetchCategories();
  }, []);

  // Fetch products based on filters
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let data;
        if (subcategoryId) {
          data = await getAllProductBySubCategory(subcategoryId);
          if (data && data.products) {
            setSelectedSubcategory(subcategoryId);
            // Find and set the parent category
            const subcategory = categories.find(cat => 
              cat.subCategories?.some(sub => sub._id === subcategoryId)
            );
            if (subcategory) {
              setSelectedCategory(subcategory._id);
              setSubcategories(subcategory.subCategories || []);
            }
          }
        } else if (selectedSubcategory) {
          data = await getAllProductBySubCategory(selectedSubcategory);
        } else if (selectedCategory && selectedCategory !== 'all') {
          data = await getAllProduct();
          if (data && data.products) {
            const category = categories.find((cat) => cat._id === selectedCategory);
            if (category) {
              const subCategoryIds = category.subCategories.map(sub => sub._id);
              data.products = data.products.filter(product => 
                subCategoryIds.includes(product.subCategory)
              );
            }
          }
        } else {
          data = await getAllProduct();
        }
        
        if (data && data.products) {
          // Apply price filter
          let filteredProducts = data.products.filter(
            product => product.price >= priceRange[0] && product.price <= priceRange[1]
          );

          // Apply status filter
          if (status !== 'all') {
            filteredProducts = filteredProducts.filter(
              product => product.status === status
            );
          }

          // Apply sorting
          switch (sortBy) {
            case 'price-asc':
              filteredProducts.sort((a, b) => a.price - b.price);
              break;
            case 'price-desc':
              filteredProducts.sort((a, b) => b.price - a.price);
              break;
            case 'name-asc':
              filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
              break;
            case 'name-desc':
              filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
              break;
            default:
              break;
          }

          setTotalProducts(filteredProducts.length);
          
          // Apply pagination
          const startIndex = (currentPage - 1) * pageSize;
          const endIndex = startIndex + pageSize;
          const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
          
          setProducts(paginatedProducts);
        } else {
          setProducts([]);
          setTotalProducts(0);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Lỗi khi tải sản phẩm");
        setProducts([]);
        setTotalProducts(0);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedSubcategory, priceRange, sortBy, status, currentPage, pageSize, subcategoryId, categories]);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    if (value === 'all') {
      setSubcategories([]);
      setSelectedSubcategory(null);
    } else {
      const category = categories.find((cat) => cat._id === value);
      setSubcategories(category ? category.subCategories : []);
      setSelectedSubcategory(null);
    }
  };

  const handleSubcategoryChange = (value) => {
    setSelectedSubcategory(value);
    // Immediately fetch products when subcategory is selected
    if (value) {
      setLoading(true);
      getAllProductBySubCategory(value)
        .then(response => {
          if (response && response.products) {
            setProducts(response.products);
            setTotalProducts(response.products.length);
          } else {
            setProducts([]);
            setTotalProducts(0);
          }
        })
        .catch(error => {
          console.error("Error fetching products by subcategory:", error);
          toast.error("Lỗi khi tải sản phẩm theo danh mục con");
          setProducts([]);
          setTotalProducts(0);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
  };

  const handleCompare = (productId) => {
    if (selectedProducts.length < 2) {
      setSelectedProducts((prev) => [...prev, productId]);
      toast.success("Sản phẩm đã được thêm vào so sánh");
      setIsCompareModalVisible(true);
    } else {
      toast.warning("Bạn chỉ có thể so sánh 2 sản phẩm cùng lúc");
    }
  };

  const handleRemoveCompare = (productId) => {
    setSelectedProducts((prev) => prev.filter(id => id !== productId));
    toast.info("Sản phẩm đã được xóa khỏi so sánh");
  };

  const handleCompareRedirect = () => {
    if (selectedProducts.length === 2) {
      navigate(`/compare?product1=${selectedProducts[0]}&product2=${selectedProducts[1]}`);
    } else {
      toast.error("Vui lòng chọn đủ 2 sản phẩm để so sánh");
    }
  };

  const handleClearCompare = () => {
    setSelectedProducts([]);
    setIsCompareModalVisible(false);
    toast.info("Đã xóa tất cả sản phẩm khỏi so sánh");
  };

  const handleCloseModal = () => {
    setIsCompareModalVisible(false);
  };

  const handleResetFilters = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setPriceRange([0, 10000000]);
    setSortBy('default');
    setStatus('all');
  };

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  // Filter content components
  const CategoryFilterContent = (
    <Card 
      style={{ 
        width: 300, 
        background: isDarkMode ? "#1a1a1a" : "#ffffff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        borderRadius: "8px",
      }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Text strong style={{ fontSize: "16px", marginBottom: "8px" }}>Danh mục sản phẩm</Text>
        <Select
          placeholder="Chọn danh mục"
          onChange={handleCategoryChange}
          value={selectedCategory}
          style={{ width: "100%" }}
          allowClear
        >
          <Option value="all">Tất cả sản phẩm</Option>
          {categories.map((category) => (
            <Option key={category._id} value={category._id}>
              {category.name}
            </Option>
          ))}
        </Select>
        <Select
          placeholder="Chọn danh mục con"
          onChange={handleSubcategoryChange}
          value={selectedSubcategory}
          style={{ width: "100%", marginTop: "8px" }}
          allowClear
          disabled={!selectedCategory || selectedCategory === 'all' || subcategories.length === 0}
        >
          {subcategories.map((sub) => (
            <Option key={sub._id} value={sub._id}>
              {sub.name}
            </Option>
          ))}
        </Select>
      </Space>
    </Card>
  );

  const PriceFilterContent = (
    <Card 
      style={{ 
        width: 300, 
        background: isDarkMode ? "#1a1a1a" : "#ffffff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        borderRadius: "8px",
      }}
      styles={{
        body: {
          padding: '12px'
        }
      }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Text strong style={{ fontSize: "16px", marginBottom: "8px" }}>Khoảng giá</Text>
        <Slider
          range
          min={0}
          max={10000000}
          step={100000}
          value={priceRange}
          onChange={handlePriceChange}
          tooltip={{
            formatter: (value) => `${value.toLocaleString()}đ`
          }}
          style={{ margin: "16px 0" }}
        />
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between",
          padding: "8px 0",
          borderTop: "1px solid #f0f0f0",
          marginTop: "8px"
        }}>
          <Text>{priceRange[0].toLocaleString()}đ</Text>
          <Text>{priceRange[1].toLocaleString()}đ</Text>
        </div>
      </Space>
    </Card>
  );

  const SortFilterContent = (
    <Card 
      style={{ 
        width: 250, 
        background: isDarkMode ? "#1a1a1a" : "#ffffff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        borderRadius: "8px",
      }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Text strong style={{ fontSize: "16px", marginBottom: "8px" }}>Sắp xếp theo</Text>
        <Radio.Group
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Radio value="default">Mặc định</Radio>
            <Radio value="price-asc">Giá tăng dần</Radio>
            <Radio value="price-desc">Giá giảm dần</Radio>
            <Radio value="name-asc">Tên A-Z</Radio>
            <Radio value="name-desc">Tên Z-A</Radio>
          </Space>
        </Radio.Group>
      </Space>
    </Card>
  );

  const StatusFilterContent = (
    <Card 
      style={{ 
        width: 250, 
        background: isDarkMode ? "#1a1a1a" : "#ffffff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        borderRadius: "8px",
      }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Text strong style={{ fontSize: "16px", marginBottom: "8px" }}>Trạng thái</Text>
        <Radio.Group
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Radio value="all">Tất cả</Radio>
            <Radio value="inStock">Còn hàng</Radio>
            <Radio value="outOfStock">Hết hàng</Radio>
            <Radio value="onSale">Đang giảm giá</Radio>
          </Space>
        </Radio.Group>
      </Space>
    </Card>
  );

  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: isDarkMode
          ? "linear-gradient(135deg, #1e2a3c 0%, #21252b 100%)"
          : "linear-gradient(135deg, #f4f6f9 0%, #e9ecef 100%)",
        color: isDarkMode ? "#e6edf3" : "#1c1e21",
        transition: "all 0.3s ease",
      }}
    >
      <Header />
      <Content
        style={{
          padding: "80px 20px 40px",
          maxWidth: "1300px",
          margin: "0 auto",
        }}
      >
        <Title
          level={2}
          style={{
            color: isDarkMode ? "#ffffff" : "#2c3e50",
            marginBottom: "40px",
            fontWeight: 800,
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "1px",
            textShadow: isDarkMode ? "0 2px 4px rgba(0,0,0,0.3)" : "none",
          }}
        >
          So Sánh Sản Phẩm
        </Title>

        {/* Filter Bar */}
        <Card
          style={{
            marginBottom: "24px",
            background: isDarkMode ? "rgba(255,255,255,0.02)" : "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            position: "sticky",
            top: "80px",
            zIndex: 1000,
          }}
        >
          <Row justify="space-between" align="middle">
            <Col>
              <Space size="large">
                <Popover
                  content={CategoryFilterContent}
                  trigger="hover"
                  placement="bottomLeft"
                  overlayStyle={{ padding: "8px" }}
                >
                  <Button 
                    type="text" 
                    icon={<AppstoreOutlined />}
                    style={{ 
                      fontSize: "16px",
                      height: "40px",
                      padding: "0 16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    Danh mục
                  </Button>
                </Popover>

                <Popover
                  content={PriceFilterContent}
                  trigger="hover"
                  placement="bottomLeft"
                  overlayStyle={{ padding: "8px" }}
                >
                  <Button 
                    type="text" 
                    icon={<DollarOutlined />}
                    style={{ 
                      fontSize: "16px",
                      height: "40px",
                      padding: "0 16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    Khoảng giá
                  </Button>
                </Popover>

                <Popover
                  content={SortFilterContent}
                  trigger="hover"
                  placement="bottomLeft"
                  overlayStyle={{ padding: "8px" }}
                >
                  <Button 
                    type="text" 
                    icon={<SortAscendingOutlined />}
                    style={{ 
                      fontSize: "16px",
                      height: "40px",
                      padding: "0 16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    Sắp xếp
                  </Button>
                </Popover>

                <Popover
                  content={StatusFilterContent}
                  trigger="hover"
                  placement="bottomLeft"
                  overlayStyle={{ padding: "8px" }}
                >
                  <Button 
                    type="text" 
                    icon={<TagsOutlined />}
                    style={{ 
                      fontSize: "16px",
                      height: "40px",
                      padding: "0 16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    Trạng thái
                  </Button>
                </Popover>
              </Space>
            </Col>
            <Col>
              <Tooltip title="Đặt lại bộ lọc">
                <Button
                  icon={<FilterOutlined />}
                  onClick={handleResetFilters}
                  style={{
                    height: "40px",
                    padding: "0 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  Đặt lại
                </Button>
              </Tooltip>
            </Col>
          </Row>
        </Card>

        {/* Product List */}
        <CompareProduct
          products={products}
          loading={loading}
          isDarkMode={isDarkMode}
          onCompare={handleCompare}
        />

        {/* Pagination */}
        <div style={{ 
          marginTop: "24px", 
          display: "flex", 
          justifyContent: "center",
          padding: "16px 0"
        }}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalProducts}
            onChange={handlePageChange}
            pageSizeOptions={['8', '16', '24', '32']}
            style={{
              background: isDarkMode ? "rgba(255,255,255,0.02)" : "#ffffff",
              padding: "16px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          />
        </div>

        {/* Compare Modal */}
        <Modal
          title="So Sánh Sản Phẩm"
          open={isCompareModalVisible}
          onCancel={handleCloseModal}
          footer={null}
          width={800}
          style={{
            top: 20,
          }}
          bodyStyle={{
            padding: "24px",
            background: isDarkMode ? "#1a1a1a" : "#ffffff",
          }}
        >
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Text strong style={{ fontSize: "16px" }}>
                Sản phẩm đã chọn để so sánh ({selectedProducts.length}/2)
              </Text>
              {selectedProducts.length > 0 && (
                <Button 
                  onClick={handleClearCompare}
                  danger
                >
                  Xóa tất cả
                </Button>
              )}
            </div>

            <Row gutter={[16, 16]}>
              {[0, 1].map((index) => (
                <Col span={12} key={index}>
                  <Card
                    style={{
                      background: isDarkMode ? "rgba(255,255,255,0.02)" : "#f8f9fa",
                      border: selectedProducts[index] ? "2px solid #1890ff" : "1px dashed #d9d9d9",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "24px",
                    }}
                  >
                    {selectedProducts[index] ? (
                      <Space direction="vertical" align="center" style={{ width: "100%" }}>
                        <Text strong>Đã chọn sản phẩm</Text>
                        <Button 
                          type="primary" 
                          danger
                          onClick={() => handleRemoveCompare(selectedProducts[index])}
                        >
                          Xóa sản phẩm
                        </Button>
                      </Space>
                    ) : (
                      <Space direction="vertical" align="center">
                        <SwapOutlined style={{ fontSize: "32px", color: "#bfbfbf" }} />
                        <Text type="secondary">Chọn sản phẩm để so sánh</Text>
                      </Space>
                    )}
                  </Card>
                </Col>
              ))}
            </Row>

            {selectedProducts.length === 2 && (
              <div style={{ textAlign: "center", marginTop: "16px" }}>
                <Button
                  type="primary"
                  size="large"
                  onClick={handleCompareRedirect}
                  icon={<SwapOutlined />}
                  style={{
                    background: isDarkMode
                      ? "linear-gradient(90deg,rgb(231, 39, 145) 0%,rgb(194, 31, 216) 100%)"
                      : "linear-gradient(90deg,rgb(236, 62, 213) 0%, #3b82f6 100%)",
                    border: "none",
                    height: "48px",
                    padding: "0 32px",
                    fontSize: "16px",
                  }}
                >
                  So sánh sản phẩm
                </Button>
              </div>
            )}
          </Space>
        </Modal>
      </Content>
      <Footer />
    </Layout>
  );
};

export default ProductList;
