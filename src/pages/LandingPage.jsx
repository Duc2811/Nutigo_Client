import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button, Typography, Row, Col, Card } from "antd";
import { Container } from "react-bootstrap";
import {
  ArrowRightOutlined,
  SafetyCertificateOutlined,
  AppstoreOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import "./LandingPage.css";
import Header from "../Screen/layout/Header";
import Footer from "../Screen/layout/Footer";

// Import ảnh làm background
import HeroBackground from "../assets/Healthy Food.png";

const { Title, Paragraph } = Typography;

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

const AnimatedSection = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

AnimatedSection.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
};

const LandingPage = () => {
  return (
    <>
      <Header />
      <div className="landing-page">
        {/* Hero Section */}
        <section
          className="hero-section"
          style={{
            backgroundImage: `url(${HeroBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "#000",
            padding: "100px 0",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Container
            style={{ position: "relative", zIndex: 2, paddingLeft: 0 }}
          >
            <Row align="middle" gutter={[32, 32]}>
              <Col xs={24} md={24}>
                <AnimatedSection>
                  <Title
                    level={1}
                    style={{
                      fontWeight: 700,
                      fontSize: "4rem",
                      color: "#FFD700",
                      textShadow: "2px 2px 5px rgba(80, 40, 0, 0.8)",
                    }}
                  >
                    Welcome to
                    <p>NutiGo Shop</p>
                  </Title>

                  <Paragraph
                    style={{
                      fontSize: "1.2rem",
                      color: "#333",
                      marginBottom: "2rem",
                      textAlign: "left", // Căn trái
                    }}
                  >
                    Your one-stop destination for all your shopping needs.
                    <p>Discover amazing products and exclusive deals.</p>
                  </Paragraph>
                  <Button
                    type="primary"
                    size="large"
                    icon={<ArrowRightOutlined />}
                  >
                    Get Started
                  </Button>
                </AnimatedSection>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Features Section */}
        <section
          style={{
            padding: "100px 0",
            backgroundImage:
              "url(https://placehold.co/1920x1080?text=Features+Background)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Container>
            <AnimatedSection>
              <Title
                level={2}
                style={{
                  textAlign: "center",
                  marginBottom: "3rem",
                  color: "#5A827E",
                }}
              >
                Tại sao nên chọn mua hàng tại NutiGo ?
              </Title>
            </AnimatedSection>
            <Row gutter={[32, 32]}>
              {[
                {
                  icon: (
                    <SafetyCertificateOutlined
                      style={{ fontSize: "2.5rem", color: "#84AE92" }}
                    />
                  ),
                  title: " 100% Tự nhiên",
                  description:
                    "Sản phẩm từ thiên nhiên, được chọn lọc kĩ lưỡng, đảm bảo an toàn cho sức khỏe. Nguyên dưỡng chất tự nhiên, lành mạnh và thân thiện.",
                },
                {
                  icon: (
                    <HeartOutlined
                      style={{ fontSize: "2.5rem", color: "#84AE92" }}
                    />
                  ),
                  title: "Mẫu mã bắt mắt",
                  description:
                    "Chúng tôi luôn chăm chút để sản phẩm của mình giành trọn sự hài lòng từ khách hàng thông qua bao bì sản phẩm.",
                },
                {
                  icon: (
                    <AppstoreOutlined
                      style={{ fontSize: "2.5rem", color: "#84AE92" }}
                    />
                  ),
                  title: "Sản phẩm đa dạng",
                  description:
                    "Có trên 50 sản phẩm với hơn 20 loại thực phẩm dinh dưỡng được nhập khẩu từ nhiều nơi trên Thế Giới.",
                },
              ].map((feature, index) => (
                <Col xs={24} md={8} key={index}>
                  <AnimatedSection delay={0.2 * index}>
                    <Card
                      hoverable
                      style={{
                        textAlign: "center",
                        height: "100%",
                        borderRadius: "15px",
                        background: "rgba(255, 255, 255, 0.9)",
                      }}
                    >
                      <div style={{ marginBottom: "1.5rem" }}>
                        {feature.icon}
                      </div>
                      <Title level={4}>{feature.title}</Title>
                      <Paragraph>{feature.description}</Paragraph>
                    </Card>
                  </AnimatedSection>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* CTA Section */}
        <section
          style={{
            padding: "100px 0",
            backgroundImage:
              "url(https://api-healthcontent.dai-ichi-life.com.vn/api/api/v1/app/downloadFile?fileName=/data/editor/news%2F%40%40%40image202307050922515_1688523313475.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1,
            }}
          />
          <Container style={{ position: "relative", zIndex: 2 }}>
            <AnimatedSection>
              <Row justify="center" align="middle">
                <Col xs={24} md={16} style={{ textAlign: "center" }}>
                  <Title
                    level={2}
                    style={{
                      fontWeight: 400,
                      fontSize: "2rem",
                      color: "white",
                      textShadow: "2px 2px 5px rgba(80, 40, 0, 0.8)",
                    }}
                  >
                    Mua sắm ngay thôi nào!
                  </Title>
                  <Paragraph
                    style={{ fontSize: "1.2rem", color: "white" ,marginBottom: "2rem" }}
                  >
                    Cùng hàng ngàn khách hàng tin tưởng, bắt đầu hành trình mua
                    sắm tuyệt vời ngay hôm nay!
                  </Paragraph>
                  <Button type="primary" size="large" ghost>
                    Đăng ký ngay
                  </Button>
                </Col>
              </Row>
            </AnimatedSection>
          </Container>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
