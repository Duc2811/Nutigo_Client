import React, { useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { Form, Input, Button, message } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Header from "../../layout/Header";

const Contact = () => {
  const formRef = useRef(null);
  const [formInstance] = Form.useForm();

  const sendEmail = (values) => {
    console.log("Sending email with values:", values);

    const templateParams = {
      title: "Tin nhắn từ trang liên hệ",
      name: values.user_name,
      email: values.user_email,
      message: values.message,
      time: new Date().toLocaleString(),
    };

    emailjs
      .send(
        "service_laqbptk", // service ID
        "template_lhd0pl7", // template ID
        templateParams,
        "tV0Shp_m0AJZ08zDT" // public key
      )
      .then(() => {
        message.success("Gửi tin nhắn thành công!");
        formInstance.resetFields();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        message.error(
          "Gửi không thành công: " +
            (error?.text || error?.message || "Lỗi không xác định")
        );
      });
  };

  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 10.7769, lng: 106.7009 },
        zoom: 15,
      });
      new window.google.maps.Marker({
        position: { lat: 10.7769, lng: 106.7009 },
        map,
        title: "Cửa Hàng Hạt Giống",
      });
    };

    if (window.google && window.google.maps) {
      initMap();
    } else {
      console.warn("Google Maps chưa được load.");
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100 p-6" style={{ margin: "50px" }}>
        <div className="bg-green-600 text-center py-6 rounded-t-2xl mb-4" style={{margin :'150px'}}>
          <h1 className="text-3xl font-bold">Liên Hệ Với Chúng Tôi</h1>
          <p className="mt-2">
            Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn về các sản phẩm chất lượng
            cao
          </p>
        </div>

        <div
          className="flex gap-6 justify-between flex-wrap"
          style={{ marginTop: "50px" }}
        >
          <InfoBox
            icon={<PhoneOutlined />}
            title="Điện Thoại"
            description="Hotline bán hàng"
            detail="0123 456 789"
          />
          <InfoBox
            icon={<MailOutlined />}
            title="Email"
            description="Liên hệ trực tuyến"
            detail="contact@hatgiong.com"
          />
          <InfoBox
            icon={<ClockCircleOutlined />}
            title="Giờ Làm Việc"
            description="Thứ 2 - Chủ nhật"
            detail="8:00 - 18:00"
          />
        </div>

        <div
          className="flex flex-col lg:flex-row gap-6 mt-6"
          style={{ marginTop: "150px" }}
        >
          <div
            className="flex-1 bg-white p-6 rounded-2xl shadow-lg"
            style={{ padding: "20px" }}
          >
            <h2 className="text-2xl font-semibold mb-4">Gửi Tin Nhắn</h2>
            <Form
              form={formInstance}
              name="contact"
              layout="vertical"
              onFinish={sendEmail}
              autoComplete="off"
              className="space-y-4"
              ref={formRef}
            >
              <Form.Item
                label="Họ và Tên"
                name="user_name"
                rules={[
                  { required: true, message: "Vui lòng nhập họ và tên!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Nhập họ và tên của bạn"
                  size="large"
                  className="rounded"
                />
              </Form.Item>

              <Form.Item
                label="Email"
                name="user_email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Nhập địa chỉ email của bạn"
                  size="large"
                  className="rounded"
                />
              </Form.Item>

              <Form.Item
                label="Nội Dung Tin Nhắn"
                name="message"
                rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
              >
                <Input.TextArea
                  rows={5}
                  placeholder="Nhập nội dung tin nhắn của bạn..."
                  className="rounded"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Gửi Tin Nhắn
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="flex-1" style={{ margin: "50px" }}>
          <h2 className="text-2xl font-semibold mb-4">Bản đồ</h2>
          <div className="w-full h-[450px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.5290259893697!2d105.54760121533235!3d21.01143209361382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313453a453a9f43b%3A0x9c6a4e5a2be84799!2zVGjDoWNoIFRo4bqtdCwgSG_DoG5nIFThu6sgSG_DoG5n!5e0!3m2!1svi!2s!4v1717399358824!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component phụ cho phần thông tin
const InfoBox = ({ icon, title, description, detail }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg text-center flex-1 min-w-[250px]">
    <div className="w-12 h-12 mx-auto rounded-full bg-green-100 flex items-center justify-center">
      {React.cloneElement(icon, {
        style: { fontSize: "24px", color: "#10b981" },
      })}
    </div>
    <h3 className="mt-4 font-semibold">{title}</h3>
    <p className="text-gray-600">{description}</p>
    <p className="text-lg font-bold text-gray-800">{detail}</p>
  </div>

);

export default Contact;
