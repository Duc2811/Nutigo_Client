import React from "react";
import Header from "../../layout/Header";
import { Leaf, Heart, Globe, CheckCircle } from "lucide-react";
import { Footer } from "antd/es/layout/layout";
import AppFooter from "../../layout/Footer";
import NutritionComponent from "../../newpage/NutritionComponent";
import IngredientsList from "../../newpage/IngredientsList";
import Features from "../../newpage/Features";
import Hero from "../../newpage/Hero";

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
        style={{ marginTop: 50, background: "white", color: "#1c1917" }}
      >
        {/* 1. Giới thiệu về chúng tôi */}
        <Hero/>
        <NutritionComponent/>
        <IngredientsList/>
        <Features/>

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
      <AppFooter />
    </div>
  );
};

export default About;
