import { Layout, Typography, Row, Col, Card, Space, Button, Carousel } from "antd";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  RocketOutlined,
  SafetyCertificateOutlined,
  CustomerServiceOutlined,
  GlobalOutlined,
  ThunderboltOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import SidebarMenuAntd from "../Component/SidebarMenu";
import FeaturedProducts from "../Component/FearturedProducts";
import SaleProducts from "../Component/SaleProducts";
import TopSoldProducts from "../Component/TopSoldProducts";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// import BottomAds from "../Component/BottomAds";
// import LeftAdsBanner from "../Component/LeftAds";
// import RightAdsBanner from "../Component/RightAds";
import Banner1 from "../assets/Slider/banner1.jpg";
import Banner2 from "../assets/Slider/baner2.jpg";
import Banner3 from "../assets/Slider/banner3.jpg";
import Chatbox from "../Component/Chatbox/Chatbox";
import { useState } from "react";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const Home = () => {
  const isDarkMode = useSelector((state) => state.user.darkMode);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const features = [
    {
      icon: <RocketOutlined style={{ fontSize: '32px', color: '#1890ff' }} />,
      title: 'Giao hàng nhanh',
      description: 'Giao hàng trong 24h tại nội thành và 2-3 ngày toàn quốc.'
    },
    {
      icon: <SafetyCertificateOutlined style={{ fontSize: '32px', color: '#52c41a' }} />,
      title: 'Thanh toán an toàn',
      description: 'Bảo mật SSL, đa dạng phương thức thanh toán.'
    },
    {
      icon: <CustomerServiceOutlined style={{ fontSize: '32px', color: '#722ed1' }} />,
      title: 'Hỗ trợ 24/7',
      description: 'Tư vấn tận tâm, hỗ trợ mọi lúc mọi nơi.'
    },
    {
      icon: <GlobalOutlined style={{ fontSize: '32px', color: '#fa8c16' }} />,
      title: 'Vận chuyển toàn cầu',
      description: 'Giao hàng đến hơn 100 quốc gia.'
    }
  ];

  const testimonials = [
    {
      name: 'Nguyễn Văn A',
      role: 'Khách hàng thân thiết',
      content: 'Sản phẩm chất lượng, dịch vụ tuyệt vời. Tôi rất hài lòng!',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      name: 'Trần Thị B',
      role: 'Thành viên Premium',
      content: 'Đóng gói đẹp, giao hàng nhanh, sẽ ủng hộ lâu dài.',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
      name: 'Lê Văn C',
      role: 'Chủ cửa hàng',
      content: 'Giá tốt, nguồn hàng ổn định, rất phù hợp cho kinh doanh.',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
    }
  ];

  return (
    <Layout
      style={{
        minHeight: "100vh",
        backgroundColor: isDarkMode ? "#21252b" : "#f4f6f9",
        color: isDarkMode ? "#e6edf3" : "#1c1e21",
        transition: "all 0.3s ease",
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />
      <Content
        style={{
          padding: "60px 0 0 0",
          maxWidth: "1400px",
          margin: "auto",
        }}
      >
        {/* Chat Button */}
        <Button
          type="primary"
          shape="circle"
          icon={<MessageOutlined />}
          size="large"
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
          onClick={() => setIsChatOpen(true)}
        />

        {/* Chat Modal */}
        <Chatbox isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

        {/* Hero Banner */}
        <motion.div {...fadeIn}>
          <div
            style={{
              width: "100%",
              minHeight: 350,
              borderRadius: 24,
              overflow: "hidden",
              marginBottom: 40,
              boxShadow: isDarkMode ? "0 4px 24px rgba(0,0,0,0.5)" : "0 4px 24px rgba(0,0,0,0.12)",
              background: isDarkMode ? "#23272e" : "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative"
            }}
          >
            <Carousel autoplay dots>
              {[Banner1, Banner2, Banner3].map((img, idx) => (
                <div key={idx}>
                  <img
                    src={img}
                    alt={`NutiGo Banner ${idx + 1}`}
                    style={{
                      width: "100%",
                      height: 350,
                      objectFit: "cover",
                      filter: isDarkMode ? "brightness(0.85)" : "none"
                    }}
                  />
                </div>
              ))}
            </Carousel>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.15)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                pointerEvents: "none"
              }}
            >
              <Title level={1} style={{ color: '#fff', fontWeight: 900, fontSize: 48, marginBottom: 0 }}>NutiGo Foods</Title>
              <Paragraph style={{ fontSize: 22, margin: 0, fontWeight: 500 }}>EAT CLEAN - HEALTHY FOOD</Paragraph>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div {...fadeIn}>
          <Row gutter={[32, 32]} justify="center" style={{ marginBottom: 40 }}>
            {features.map((feature, idx) => (
              <Col xs={24} sm={12} md={6} key={idx}>
                <Card
                  bordered={false}
                  style={{
                    borderRadius: 16,
                    background: isDarkMode ? "#23272e" : "#f8fafc",
                    boxShadow: isDarkMode ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.08)",
                    textAlign: "center",
                    minHeight: 180
                  }}
                >
                  <div style={{ marginBottom: 16 }}>{feature.icon}</div>
                  <Text strong style={{ fontSize: 18 }}>{feature.title}</Text>
                  <Paragraph style={{ margin: 0, color: isDarkMode ? '#bfc9d1' : '#555' }}>{feature.description}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Main Content */}
        <Row gutter={[24, 24]} style={{ paddingTop: "10px" }}>
          <Col xs={24} sm={5}>
            <motion.div {...fadeIn}>
              <SidebarMenuAntd />
            </motion.div>
          </Col>
          <Col xs={24} sm={19}>
            <motion.div {...fadeIn}>
              <Card
                bordered={false}
                style={{
                  backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.03)" : "#fff",
                  borderRadius: "15px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                  marginBottom: 32
                }}
              >
                <FeaturedProducts isDarkMode={isDarkMode} />
              </Card>
              <Card
                bordered={false}
                style={{
                  backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.03)" : "#fff",
                  borderRadius: "15px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                  marginBottom: 32
                }}
              >
                <TopSoldProducts isDarkMode={isDarkMode} />
              </Card>
              <Card
                bordered={false}
                style={{
                  backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.03)" : "#fff",
                  borderRadius: "15px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                  marginBottom: 32
                }}
              >
                <SaleProducts isDarkMode={isDarkMode} />
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* Brand Story Section */}
        <motion.div {...fadeIn}>
          <Card
            bordered={false}
            style={{
              background: isDarkMode ? 'linear-gradient(90deg,#1a1a1a,#23272e)' : 'linear-gradient(90deg,#f8fafc,#fff)',
              borderRadius: 18,
              margin: '40px 0',
              boxShadow: isDarkMode ? '0 4px 16px rgba(0,0,0,0.25)' : '0 4px 16px rgba(0,0,0,0.08)',
            }}
          >
            <Row align="middle" gutter={[32, 32]}>
              <Col xs={24} md={12}>
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
                  alt="Healthy Food"
                  style={{ width: '100%', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                />
              </Col>
              <Col xs={24} md={12}>
                <Title level={2} style={{ fontWeight: 800, color: isDarkMode ? '#fff' : '#2c3e50' }}>NutiGo Foods - Sống xanh, sống khỏe</Title>
                <Paragraph style={{ fontSize: 18, color: isDarkMode ? '#bfc9d1' : '#555' }}>
                  Chúng tôi cam kết mang đến những sản phẩm sạch, an toàn, tốt cho sức khỏe từ thiên nhiên. NutiGo đồng hành cùng bạn trên hành trình sống xanh, sống khỏe mỗi ngày.
                </Paragraph>
                <ul style={{ fontSize: 16, color: isDarkMode ? '#e6edf3' : '#333', paddingLeft: 20 }}>
                  <li>100% nguyên liệu tự nhiên, không chất bảo quản</li>
                  <li>Được kiểm định chất lượng nghiêm ngặt</li>
                  <li>Đa dạng sản phẩm cho mọi nhu cầu dinh dưỡng</li>
                </ul>
              </Col>
            </Row>
          </Card>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div {...fadeIn}>
          <div style={{ marginTop: '60px', marginBottom: '40px' }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '40px', fontWeight: 800 }}>
              Khách hàng nói gì về NutiGo Foods
            </Title>
            <Row gutter={[24, 24]} justify="center">
              {testimonials.map((testimonial, index) => (
                <Col xs={24} md={8} key={index}>
                  <Card
                    bordered={false}
                    style={{
                      background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#fff',
                      borderRadius: '15px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      height: '100%',
                      textAlign: 'center',
                      padding: 24
                    }}
                  >
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        marginBottom: '16px',
                        objectFit: 'cover',
                        border: '3px solid #ffb366'
                      }}
                    />
                    <Paragraph style={{
                      fontSize: '1.1rem',
                      fontStyle: 'italic',
                      marginBottom: '16px',
                      color: isDarkMode ? '#e6edf3' : '#333'
                    }}>
                      &ldquo;{testimonial.content}&rdquo;
                    </Paragraph>
                    <Title level={4} style={{ margin: 0 }}>{testimonial.name}</Title>
                    <Text type="secondary">{testimonial.role}</Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div {...fadeIn}>
          <Card
            bordered={false}
            style={{
              background: isDarkMode ? 'linear-gradient(45deg, #1a1a1a, #2d2d2d)' : 'linear-gradient(45deg, #1890ff, #ffb366)',
              borderRadius: '15px',
              marginTop: '40px',
              marginBottom: '40px',
              color: '#fff',
              boxShadow: isDarkMode ? '0 4px 16px rgba(0,0,0,0.25)' : '0 4px 16px rgba(0,0,0,0.08)',
            }}
          >
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <ThunderboltOutlined style={{ fontSize: '48px', marginBottom: '20px', color: '#fff' }} />
              <Title level={3} style={{ color: '#fff', marginBottom: '20px' }}>
                Đăng ký nhận bản tin NutiGo
              </Title>
              <Paragraph style={{ color: '#fff', marginBottom: '30px' }}>
                Nhận thông tin ưu đãi và sản phẩm mới nhất từ NutiGo Foods
              </Paragraph>
              <Space.Compact style={{ width: '100%', maxWidth: '500px' }}>
                <input
                  type="email"
                  placeholder="Nhập email của bạn"
                  style={{
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px 0 0 5px',
                    width: '100%',
                    fontSize: '16px'
                  }}
                />
                <Button type="primary" size="large" style={{ borderRadius: '0 5px 5px 0' }}>
                  Đăng ký
                </Button>
              </Space.Compact>
            </div>
          </Card>
        </motion.div>
      </Content>
      <Footer />
      {/* <BottomAds />
      <LeftAdsBanner />
      <RightAdsBanner /> */}
    </Layout>
  );
};

export default Home;
