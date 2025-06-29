import React from "react";

const Features = () => {
  const containerStyle = {
    padding: "40px 20px",
    backgroundColor: "#f9fafb",
    fontFamily: "sans-serif",
  };

  const titleStyle = {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "5px",
  };

  const subtitleStyle = {
    textAlign: "center",
    color: "#666",
    marginBottom: "40px",
  };

  const gridStyle = {
    display: "grid",
    gap: "30px",
    gridTemplateColumns: window.innerWidth >= 768 ? "1fr 1fr" : "1fr",
  };

  const boxStyle = {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 0 8px rgba(0,0,0,0.05)",
  };

  const imageStyle = {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
    marginBottom: "20px",
  };

  const headingStyle = {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "20px",
  };

  const processItemStyle = {
    display: "flex",
    marginBottom: "16px",
  };

  const stepNumberStyle = {
    width: "28px",
    height: "28px",
    backgroundColor: "#bbf7d0",
    color: "#047857",
    borderRadius: "50%",
    textAlign: "center",
    lineHeight: "28px",
    fontWeight: "bold",
    marginRight: "10px",
  };

  const commitmentItemStyle = {
    backgroundColor: "#ecfdf5",
    borderRadius: "8px",
    padding: "12px",
    fontSize: "14px",
    color: "#374151",
    marginBottom: "16px",
  };

  const certSectionStyle = {
    marginTop: "24px",
  };

  const certListStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "8px",
  };

  const certBadgeStyle = {
    backgroundColor: "#d1fae5",
    color: "#065f46",
    padding: "6px 12px",
    borderRadius: "9999px",
    fontSize: "13px",
  };

  const processSteps = [
    {
      title: "Thu Hoạch Tự Nhiên",
      desc: "Các loại hạt được thu hoạch từ những vùng trồng tự nhiên, không sử dụng thuốc trừ sâu và hóa chất độc hại.",
    },
    {
      title: "Sàng Lọc & Phân Loại",
      desc: "Mỗi loại hạt được sàng lọc kỹ lưỡng, loại bỏ tạp chất và phân loại theo kích thước để đảm bảo chất lượng.",
    },
    {
      title: "Chế Biến Nhiệt Độ Thấp",
      desc: "Sử dụng công nghệ rang ở nhiệt độ thấp để giữ nguyên dưỡng chất và hương vị tự nhiên của các loại hạt.",
    },
    {
      title: "Đóng Gói Bảo Quản",
      desc: "Đóng gói trong môi trường kiểm soát, sử dụng bao bì thân thiện với môi trường và công nghệ bảo quản hiện đại.",
    },
  ];

  const commitments = [
    {
      title: "100% Tự Nhiên",
      desc: "Không chất bảo quản, không phụ gia, không hương liệu nhân tạo, chỉ có hạt dinh dưỡng tự nhiên.",
    },
    {
      title: "Kiểm Nghiệm Chất Lượng",
      desc: "Mỗi lô sản phẩm đều được kiểm nghiệm nghiêm ngặt về an toàn thực phẩm và chất lượng dinh dưỡng.",
    },
    {
      title: "Thân Thiện Môi Trường",
      desc: "Sử dụng bao bì có thể tái chế và quy trình sản xuất bền vững, giảm thiểu tác động đến môi trường.",
    },
    {
      title: "Thương Mại Công Bằng",
      desc: "Hợp tác với các nhà cung cấp theo tiêu chuẩn thương mại công bằng, hỗ trợ cộng đồng nông dân.",
    },
  ];

  const certifications = ["Organic Certified", "ISO 22000", "HACCP", "Non-GMO"];

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Đặc Điểm Nổi Bật</h2>
      <p style={subtitleStyle}>
        Những đặc điểm làm nên sự khác biệt của thuyền hạt dinh dưỡng của chúng
        tôi
      </p>

      <div style={gridStyle}>
        {/* Left - Process */}
        <div style={boxStyle}>
          <img
            src="https://cdn.pixabay.com/photo/2016/08/04/19/22/farm-1571528_1280.jpg"
            alt="farm"
            style={imageStyle}
          />
          <h3 style={headingStyle}>Quy Trình Sản Xuất</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {processSteps.map((step, index) => (
              <li key={index} style={processItemStyle}>
                <span style={stepNumberStyle}>{index + 1}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right - Commitments */}
        <div style={boxStyle}>
          <h3 style={headingStyle}>Cam Kết Chất Lượng</h3>
          <div>
            {commitments.map((item, i) => (
              <div style={commitmentItemStyle} key={i}>
                <strong>{item.title}</strong>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>

          <div style={certSectionStyle}>
            <h4>Chứng Nhận Chất Lượng</h4>
            <div style={certListStyle}>
              {certifications.map((cert, idx) => (
                <span key={idx} style={certBadgeStyle}>
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
