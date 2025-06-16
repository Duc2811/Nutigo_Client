import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Spin, Button, Card, Progress, Row, Col, Space, Tag, Pagination } from "antd";
import { toast } from "react-toastify";
import { compareProducts } from "../../../Service/Client/ApiProduct";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  DollarOutlined,
  ShoppingCartOutlined,
  StarOutlined,
  FireOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const CompareProducts = () => {
  const { t } = useTranslation("compare");
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const product1Id = query.get("product1");
  const product2Id = query.get("product2");
  const [comparisonData, setComparisonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Số sản phẩm hiển thị trên mỗi trang

  const isDarkMode = useSelector((state) => state.user.darkMode);

  useEffect(() => {
    const fetchComparison = async () => {
      setLoading(true);
      try {
        const response = await compareProducts(product1Id, product2Id);
        if (response && response.data) {
          setComparisonData(response.data.result);
        } else {
          throw new Error(t("noData"));
        }
      } catch (error) {
        console.error(t("fetchError"), error);
        toast.error(t("toastError"));
      } finally {
        setLoading(false);
      }
    };

    if (product1Id && product2Id) {
      fetchComparison();
    }
  }, [product1Id, product2Id, t]);

  const getDifferenceColor = (difference, better) => {
    if (better === 'both') return '#52c41a';
    return difference > 50 ? '#ff4d4f' : difference > 20 ? '#faad14' : '#52c41a';
  };

  const getDifferenceIcon = (better) => {
    if (better === 'both') return <CheckCircleOutlined />;
    return better === 'product1' ? <ArrowUpOutlined /> : <ArrowDownOutlined />;
  };

  const renderComparisonCard = (product, isFirst) => {
    const isBetter = (attribute) => {
      if (!comparisonData) return false;
      return comparisonData.betterProduct[attribute] === (isFirst ? 'product1' : 'product2');
    };

    return (
      <Card
        bordered={false}
        style={{
          background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#fff',
          borderRadius: '15px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          height: '100%'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '200px',
              height: '200px',
              objectFit: 'contain',
              marginBottom: '16px'
            }}
          />
          <Title level={4} style={{ marginBottom: '8px' }}>{product.name}</Title>
          <Text type="secondary" style={{ fontSize: '14px' }}>
            {product.description}
          </Text>
        </div>

        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Space>
              <DollarOutlined style={{ color: isBetter('price') ? '#52c41a' : '#999' }} />
              <Text strong>Price:</Text>
              <Text>{product.price.toLocaleString()} đ</Text>
              {isBetter('price') && <Tag color="success">Best Price</Tag>}
            </Space>
          </div>

          <div>
            <Space>
              <ShoppingCartOutlined style={{ color: isBetter('quantity') ? '#52c41a' : '#999' }} />
              <Text strong>Stock:</Text>
              <Text>{product.quantity}</Text>
              {isBetter('quantity') && <Tag color="success">More Stock</Tag>}
            </Space>
          </div>

          <div>
            <Space>
              <FireOutlined style={{ color: isBetter('sold') ? '#52c41a' : '#999' }} />
              <Text strong>Sold:</Text>
              <Text>{product.sold}</Text>
              {isBetter('sold') && <Tag color="success">More Popular</Tag>}
            </Space>
          </div>

          <div>
            <Space>
              <StarOutlined style={{ color: isBetter('rating') ? '#52c41a' : '#999' }} />
              <Text strong>Rating:</Text>
              <Text>{product.rating.toFixed(1)}</Text>
              {isBetter('rating') && <Tag color="success">Better Rating</Tag>}
            </Space>
          </div>
        </Space>
      </Card>
    );
  };

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: isDarkMode ? '#1a1a1a' : '#f0f2f5'
      }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!comparisonData) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: isDarkMode ? '#1a1a1a' : '#f0f2f5'
      }}>
        <Header />
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px"
        }}>
          <Title level={3} style={{ textAlign: "center", marginBottom: "24px" }}>
            {t("noData")}
          </Title>
          <Button type="primary" onClick={() => navigate("/")} size="large">
            {t("back")}
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: isDarkMode ? '#1a1a1a' : '#f0f2f5'
    }}>
      <Header />
      <div style={{
        flex: 1,
        padding: "24px",
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%"
      }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: "32px" }}>
          {t("title")}
        </Title>

        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            {renderComparisonCard(comparisonData.product1, true)}
          </Col>
          <Col xs={24} md={12}>
            {renderComparisonCard(comparisonData.product2, false)}
          </Col>
        </Row>

        <Card
          bordered={false}
          style={{
            marginTop: '24px',
            background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#fff',
            borderRadius: '15px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Title level={4} style={{ marginBottom: '24px' }}>Detailed Comparison</Title>
          <Row gutter={[24, 24]}>
            {Object.entries(comparisonData.differences)
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
              .map(([key, value]) => (
                <Col xs={24} sm={12} key={key}>
                  <Card
                    bordered={false}
                    style={{
                      background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#fafafa',
                      borderRadius: '8px'
                    }}
                  >
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <Space>
                        {key === 'price' && <DollarOutlined />}
                        {key === 'quantity' && <ShoppingCartOutlined />}
                        {key === 'sold' && <FireOutlined />}
                        {key === 'rating' && <StarOutlined />}
                        <Text strong style={{ textTransform: 'capitalize' }}>{key}</Text>
                      </Space>
                      <Progress
                        percent={parseFloat(value.difference)}
                        showInfo={false}
                        strokeColor={getDifferenceColor(value.difference, value.better)}
                      />
                      <Space>
                        <Text type="secondary">Difference: {value.difference}%</Text>
                        {getDifferenceIcon(value.better)}
                        <Text type="secondary">
                          {value.better === 'both' ? 'Equal' :
                            value.better === 'product1' ? 'Product 1 Better' : 'Product 2 Better'}
                        </Text>
                      </Space>
                    </Space>
                  </Card>
                </Col>
              ))}
          </Row>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginTop: '24px' 
          }}>
            <Pagination
              current={currentPage}
              total={Object.keys(comparisonData.differences).length}
              pageSize={pageSize}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
              style={{
                background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#fff',
                padding: '8px',
                borderRadius: '8px'
              }}
            />
          </div>
        </Card>

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          marginTop: "24px"
        }}>
          <Button
            type="primary"
            onClick={() => navigate(`/product/${product1Id}`)}
            size="large"
            icon={<ShoppingCartOutlined />}
          >
            View {comparisonData.product1.name}
          </Button>
          <Button
            type="primary"
            onClick={() => navigate(`/product/${product2Id}`)}
            size="large"
            icon={<ShoppingCartOutlined />}
          >
            View {comparisonData.product2.name}
          </Button>
          <Button
            onClick={() => navigate("/")}
            size="large"
          >
            {t("back")}
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CompareProducts;
