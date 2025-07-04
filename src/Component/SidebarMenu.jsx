import { useEffect, useState } from "react";
import { Menu } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllCategory } from "../Service/Client/ApiProduct";

const SidebarMenu = () => {
  const isDarkMode = useSelector((state) => state.user.darkMode);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Hàm tạo slug từ tên subcategory
  const createSlug = (name) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategory();
        console.log("API Response:", response); // Debug log
        // Handle new data structure
        if (response && response.categories && Array.isArray(response.categories)) {
          console.log("Setting categories:", response.categories); // Debug log
          setCategories(response.categories);
        } else if (Array.isArray(response)) {
          // Fallback for old structure
          setCategories(response);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error); // Debug log
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const items =
    categories.length > 0
      ? categories
          .map((category) => {
            const subCategories = category.subCategories || [];
            console.log(`Category: ${category.name}, SubCategories:`, subCategories); // Debug log
            return {
              key: category._id,
              label: (
                <span style={{ fontWeight: 700, fontSize: 16, color: isDarkMode ? '#a6e22e' : '#189060' }}>{category.name}</span>
              ),
              icon: <AppstoreOutlined style={{ color: isDarkMode ? '#ffb366' : '#ff9800', fontSize: 20 }} />,
              style: {
                background: isDarkMode ? 'rgba(30,42,60,0.85)' : '#f4f6f9',
                borderRadius: 10,
                margin: '4px 0',
                transition: 'background 0.2s',
              },
              children:
                subCategories.length > 0
                  ? subCategories.map((sub, index) => {
                      const subId = sub.id || sub._id || `tmp-${index}`;
                      return {
                        key: subId,
                        label: (
                          <span style={{
                            fontWeight: 500,
                            fontSize: 15,
                            color: isDarkMode ? '#e6edf3' : '#333',
                            marginLeft: 8,
                            paddingLeft: 8,
                            borderLeft: `3px solid ${isDarkMode ? '#ffb366' : '#189060'}`,
                            transition: 'color 0.2s',
                          }}>{sub.name || "Unnamed Subcategory"}</span>
                        ),
                        style: {
                          background: isDarkMode ? 'rgba(30,42,60,0.65)' : '#fff',
                          borderRadius: 8,
                          margin: '2px 0',
                        },
                      };
                    })
                  : null,
            };
          })
      : [{ key: "no-data", label: "Không có danh mục", disabled: true }];

  const handleMenuClick = (e) => {
    const selectedKey = e.key;
    
    // Check if it's a subcategory click
    let selectedSubcategory = null;
    for (const category of categories) {
      selectedSubcategory = category.subCategories?.find(
        (sub) => (sub.id || sub._id) === selectedKey
      );
      if (selectedSubcategory) break;
    }
    
    if (selectedSubcategory) {
      // Handle subcategory click
      const slug = createSlug(selectedSubcategory.name || "unnamed-subcategory");
      navigate(`/product-list/${slug}`, {
        state: { subcategoryId: selectedKey },
        replace: true,
      });
    } else {
      // Handle category click (if category has no subcategories)
      const selectedCategory = categories.find(cat => cat._id === selectedKey);
      if (selectedCategory && (!selectedCategory.subCategories || selectedCategory.subCategories.length === 0)) {
        const slug = createSlug(selectedCategory.name || "unnamed-category");
        navigate(`/product-list/${slug}`, {
          state: { categoryId: selectedKey },
          replace: true,
        });
      }
    }
  };

  return (
    <div
      style={{
        borderRadius: 18,
        boxShadow: isDarkMode
          ? "0 6px 24px rgba(0,0,0,0.45)"
          : "0 6px 24px rgba(0,0,0,0.10)",
        background: isDarkMode ? "linear-gradient(135deg,#1e2a3c 60%,#23272e 100%)" : "linear-gradient(135deg,#f4f6f9 60%,#fff 100%)",
        padding: 12,
        marginBottom: 24,
        minHeight: 420,
        transition: 'background 0.3s',
      }}
    >
      <Menu
        style={{
          borderRadius: 12,
          border: 'none',
          width: "100%",
          background: 'transparent',
          fontSize: 16,
          fontWeight: 500,
          boxShadow: 'none',
          transition: 'all 0.3s',
        }}
        mode="inline"
        items={items}
        onClick={handleMenuClick}
        selectedKeys={[]}
        itemIcon={<AppstoreOutlined />}
      />
    </div>
  );
};

export default SidebarMenu;
