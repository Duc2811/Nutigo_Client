import React from "react";

const ingredients = [
  { name: "Hạnh nhân", icon: "🌰", benefits: "Giàu vitamin E và magiê" },
  { name: "Hạt điều", icon: "🥜", benefits: "Chứa đồng và mangan" },
  { name: "Hạt bí", icon: "🎃", benefits: "Nguồn kẽm và sắt tuyệt vời" },
  { name: "Hạt hướng dương", icon: "🌻", benefits: "Phong phú vitamin E" },
  { name: "Mè đen", icon: "⚫", benefits: "Canxi và sesamin" },
  { name: "Yến mạch", icon: "🌾", benefits: "Beta-glucan tốt cho tim" },
  { name: "Nho khô", icon: "🍇", benefits: "Chất chống oxy hóa tự nhiên" },
  {
    name: "Mật ong nguyên chất",
    icon: "🍯",
    benefits: "Đường tự nhiên và enzyme",
  },
  { name: "Dầu oliu", icon: "🫒", benefits: "Axit béo không bão hòa đơn" },
];

const styles = {
  container: {
    padding: "2rem",
    backgroundColor: "#f0fdf4",
    borderRadius: "12px",
    border: "1px solid #d1fae5",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
    color: "#1f2937",
    textAlign: "center",
  },
  paragraph: {
    color: "#4b5563",
    marginBottom: "2rem",
    textAlign: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1rem",
    marginBottom: "2rem",
  },
  card: {
    display: "flex",
    alignItems: "center",
    padding: "1rem",
    borderRadius: "0.5rem",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    gap: "1rem",
  },
  iconBox: {
    width: "40px",
    height: "40px",
    borderRadius: "9999px",
    backgroundColor: "#f9fafb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.25rem",
  },
  cardText: {
    textAlign: "left",
  },
  cardTitle: {
    fontWeight: "600",
    color: "#111827",
    marginBottom: "0.25rem",
    fontSize: "0.95rem",
  },
  cardDesc: {
    fontSize: "0.75rem",
    color: "#6b7280",
  },
  noteBox: {
    padding: "1rem",
    backgroundColor: "#ecfdf5",
    border: "1px solid #bbf7d0",
    borderRadius: "0.5rem",
  },
  noteTitle: {
    fontWeight: "600",
    color: "#065f46",
    marginBottom: "0.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  noteText: {
    fontSize: "0.875rem",
    color: "#047857",
  },
};

const IngredientsList = () => {
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Thành Phần Nguyên Liệu</h3>
      <p style={styles.paragraph}>
        Tất cả các thành phần đều được chọn lọc kỹ càng để mang lại giá trị dinh
        dưỡng tối ưu:
      </p>

      <div style={styles.grid}>
        {ingredients.map((ingredient, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.iconBox}>{ingredient.icon}</div>
            <div style={styles.cardText}>
              <h4 style={styles.cardTitle}>{ingredient.name}</h4>
              <p style={styles.cardDesc}>{ingredient.benefits}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.noteBox}>
        <h4 style={styles.noteTitle}>🌱 Cam kết chất lượng</h4>
        <p style={styles.noteText}>
          Tất cả nguyên liệu đều tự nhiên, không chất bảo quản, không hương liệu
          nhân tạo. Được rang và chế biến theo quy trình khép kín để giữ nguyên
          hương vị và dinh dưỡng.
        </p>
      </div>
    </div>
  );
};

export default IngredientsList;
