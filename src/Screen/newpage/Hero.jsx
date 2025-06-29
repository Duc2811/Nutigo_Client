// src/components/Hero.jsx
import React from "react";
import BoatModel from "./BoatModel";

const Hero = () => {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#eef9f8",
      padding: "60px 80px",
      height: "100vh",
      boxSizing: "border-box",
    },
    left: {
      maxWidth: "50%",
    },
    title: {
      fontSize: "56px",
      fontWeight: "bold",
      color: "#1b7d7d",
      marginBottom: "20px",
    },
    subtitle: {
      fontSize: "15px",
      lineHeight: "1.6",
      color: "#374151",
      marginBottom: "40px",
    },
    buttonGroup: {
      display: "flex",
      gap: "20px",
    },
    buyButton: {
      padding: "16px 32px",
      fontSize: "18px",
      backgroundColor: "#4caf50",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
    },
    learnButton: {
      padding: "16px 32px",
      fontSize: "18px",
      backgroundColor: "white",
      color: "#4caf50",
      border: "2px solid #4caf50",
      borderRadius: "8px",
      cursor: "pointer",
    },
    right: {
      position: "relative",
    },
   
    badge: {
      position: "absolute",
      bottom: "-30px",
      right: "-30px",
      backgroundColor: "#fbbf24",
      color: "white",
      fontWeight: "bold",
      fontSize: "20px",
      padding: "20px",
      borderRadius: "999px",
      boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
      textAlign: "center",
      width: "100px",
      height: "100px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.left}>
        <h1 style={styles.title}>Giới thiệu về NutiGo</h1>
        <p style={styles.subtitle}>
          NutiGo là thương hiệu thực phẩm dinh dưỡng hướng tới lối sống lành
          mạnh và năng động. Với sứ mệnh “Nạp năng lượng sạch – Sống trọn từng
          khoảnh khắc”, NutiGo mang đến cho người tiêu dùng những lựa chọn thực
          phẩm tiện lợi, ngon miệng và giàu giá trị dinh dưỡng.
        </p>
        <div style={styles.buttonGroup}>
          <button style={styles.buyButton}>Mua ngay</button>
          <button style={styles.learnButton}>Tìm hiểu thêm</button>
        </div>
      </div>

      <div style={styles.right}>
        <div style={styles.boatImageWrapper}>
          <BoatModel />
        </div>
        <div style={styles.badge}>
          <div>Mới</div>
          <div>-15%</div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
