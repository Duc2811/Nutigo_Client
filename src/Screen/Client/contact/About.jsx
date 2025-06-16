import React from "react";
import Header from "../../layout/Header";
import { Leaf, Heart, Globe, CheckCircle } from "lucide-react";
import { Footer } from "antd/es/layout/layout";
import AppFooter from "../../layout/Footer";

const About = () => {
  const values = [
    {
      icon: Leaf,
      title: "Tự nhiên & Hữu cơ",
      description:
        "Cam kết sử dụng 100% nguyên liệu hữu cơ, không chất bảo quản độc hại.",
      color: "green",
    },
    {
      icon: Heart,
      title: "Sức khỏe là ưu tiên",
      description:
        "Mọi sản phẩm đều được nghiên cứu kỹ lưỡng về giá trị dinh dưỡng và lợi ích sức khỏe.",
      color: "red",
    },
    {
      icon: Globe,
      title: "Bền vững môi trường",
      description:
        "Thực hành sản xuất bền vững, bảo vệ môi trường cho thế hệ tương lai.",
      color: "blue",
    },
    {
      icon: CheckCircle,
      title: "Chất lượng vượt trội",
      description:
        "Kiểm soát chất lượng nghiêm ngặt từ khâu chọn lọc đến đóng gói.",
      color: "purple",
    },
  ];

  return (
    <div>
      <Header />

      <section
        style={{ marginTop: 100, background: "white", color: "#1c1917" }}
      >
        {/* 1. Giới thiệu về chúng tôi */}
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: "80px 20px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: 36,
              fontWeight: 700,
              marginBottom: 24,
              fontFamily: "Playfair Display",
            }}
          >
            Giới thiệu về{" "}
            <span
              style={{
                background: "linear-gradient(to right, #9333ea, #f97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              NutiGo
            </span>
          </h2>
          <p style={{ fontSize: 18, color: "#57534e" }}>
            NutiGo là thương hiệu trong việc cung cấp các loại hạt dinh dưỡng
            sạch, hữu cơ, và chất lượng cao...
          </p>
        </div>

        {/* 2. Tại sao chọn chúng tôi? */}
        <div
          style={{
            background: "linear-gradient(to bottom right, #fffbeb, #fef3c7)",
            padding: "80px 20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              maxWidth: 1100,
              margin: "0 auto",
              alignItems: "center",
              gap: 40,
            }}
          >
            <div style={{ flex: 1, minWidth: 300 }}>
              <h2
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  marginBottom: 24,
                  fontFamily: "Playfair Display",
                }}
              >
                Tại sao chọn{" "}
                <span
                  style={{
                    background: "linear-gradient(to right, #9333ea, #f97316)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  NutiGo?
                </span>
              </h2>
              <ul
                style={{
                  fontSize: 18,
                  color: "#44403c",
                  listStyle: "none",
                  padding: 0,
                  lineHeight: 1.6,
                }}
              >
                <li>✅ Nguyên liệu 100% hữu cơ, không biến đổi gen.</li>
                <li>✅ Quy trình sản xuất chuẩn quốc tế...</li>
                <li>✅ Dịch vụ khách hàng tận tâm.</li>
                <li>✅ Cam kết hoàn tiền nếu không hài lòng.</li>
              </ul>
            </div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS02CDZFg3IblxzvX3brJsexA6udDpB1Eer2Q&s"
              alt="Tại sao chọn chúng tôi"
              style={{
                borderRadius: 24,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                width: 400,
                maxWidth: "100%",
              }}
            />
          </div>
        </div>

        {/* 3. Sản phẩm của chúng tôi */}
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            padding: "80px 20px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 24,
              fontFamily: "Playfair Display",
            }}
          >
            Sản phẩm của chúng tôi
          </h2>
          <p style={{ fontSize: 18, color: "#57534e", marginBottom: 40 }}>
            Chúng tôi cung cấp đa dạng các dòng hạt như: hạt óc chó, bánh thuyền
            hạt, hạnh nhân, hạt điều...
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 24,
            }}
          >
            {["Hạt óc chó", "Hạt điều", "Hạnh nhân","Hạt chia"].map(
              (name, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    padding: 24,
                    borderRadius: 16,
                    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                  }}
                >
                  <img
                    src={`/images/seeds/${idx + 1}.jpg`}
                    alt={name}
                    style={{
                      borderRadius: 12,
                      marginBottom: 16,
                      width: "100%",
                      height: 160,
                      objectFit: "cover",
                    }}
                  />
                  <p style={{ fontWeight: 600 }}>{name}</p>
                </div>
              )
            )}
          </div>
        </div>

       

        {/* 5. Giá trị cốt lõi */}
        <div
          style={{
            padding: "80px 20px",
            background: "linear-gradient(to bottom right, #f5f3ff, #fff7ed)",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <h2
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  fontFamily: "Playfair Display",
                  marginBottom: 16,
                }}
              >
                Giá trị cốt lõi của{" "}
                <span
                  style={{
                    background: "linear-gradient(to right, #9333ea, #f97316)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  NutiGo
                </span>
              </h2>
              <p
                style={{
                  fontSize: 18,
                  color: "#57534e",
                  maxWidth: 600,
                  margin: "0 auto",
                }}
              >
                Những nguyên tắc định hướng mọi hoạt động của chúng tôi...
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 32,
              }}
            >
              {values.map((value, index) => (
                <div
                  key={index}
                  style={{
                    background: "white",
                    padding: 32,
                    borderRadius: 24,
                    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                    transition: "all 0.3s",
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      backgroundColor: `${value.color}10`,
                      borderRadius: 16,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 24,
                    }}
                  >
                    <value.icon color={value.color} size={32} />
                  </div>
                  <h3
                    style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}
                  >
                    {value.title}
                  </h3>
                  <p style={{ color: "#57534e", lineHeight: 1.6 }}>
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <AppFooter/>
    </div>
  );
};

export default About;
