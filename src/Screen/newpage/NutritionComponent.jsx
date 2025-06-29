import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const NutritionComponent = () => {
  const [portionSize, setPortionSize] = useState(50);

  const data = [
    { name: "Protein", value: 20, color: "#38bdf8" },
    { name: "Chất béo lành mạnh", value: 40, color: "#5eead4" },
    { name: "Carbohydrate", value: 25, color: "#fdba74" },
    { name: "Chất xơ", value: 15, color: "#fb923c" },
  ];

  const styles = {
    container: {
      padding: "2rem",
      paddingTop:"50px",
      maxWidth: "1200px",
      margin: "auto",
      fontFamily: "sans-serif",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      textAlign: "center",
    },
    subtitle: {
      textAlign: "center",
      marginBottom: "2rem",
      color: "#555",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "2rem",
      alignItems: "center",
    },
    chartWrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "2rem",
    },
    legendList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    legendItem: {
      display: "flex",
      alignItems: "center",
      marginBottom: "0.5rem",
      fontSize: "0.95rem",
    },
    legendColor: (color) => ({
      display: "inline-block",
      width: "10px",
      height: "10px",
      marginRight: "8px",
      backgroundColor: color,
      borderRadius: "2px",
    }),
    infoGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "1rem",
    },
    infoCard: {
      background: "#f0fdf4",
      padding: "1rem",
      borderRadius: "0.5rem",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    },
    optionsBox: {
      marginTop: "3rem",
      background: "#dcfce7",
      padding: "2rem",
      borderRadius: "1rem",
    },
    sliderRow: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      marginTop: "1rem",
    },
   
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Thành Phần Dinh Dưỡng</h1>
      <p style={styles.subtitle}>
        Khám phá giá trị dinh dưỡng phong phú trong mỗi thuyền hạt của chúng tôi
      </p>

      <div style={styles.grid}>
        <div style={styles.chartWrapper}>
          <div style={{ width: 250, height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul style={styles.legendList}>
            {data.map((item, idx) => (
              <li key={idx} style={styles.legendItem}>
                <span style={styles.legendColor(item.color)}></span>
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        <div style={styles.infoGrid}>
          <div style={styles.infoCard}>
            <h3>🥬 Protein</h3>
            <p>
              15-20g protein trong mỗi khẩu phần, cung cấp các axit amin thiết
              yếu cho cơ thể.
            </p>
          </div>
          <div style={styles.infoCard}>
            <h3>💧 Chất Béo Lành Mạnh</h3>
            <p>
              Giàu omega-3, omega-6 và axit béo không bão hòa đơn, tốt cho tim
              mạch.
            </p>
          </div>
          <div style={styles.infoCard}>
            <h3>🌿 Chất Xơ</h3>
            <p>
              5-8g chất xơ mỗi khẩu phần, hỗ trợ tiêu hóa và tạo cảm giác no
              lâu.
            </p>
          </div>
          <div style={styles.infoCard}>
            <h3>🧪 Vitamin & Khoáng Chất</h3>
            <p>
              Phong phú vitamin E, B, magie, kẽm, selen và nhiều khoáng chất
              thiết yếu khác.
            </p>
          </div>
        </div>
      </div>

      

      
      
    </div>
  );
};

export default NutritionComponent;
