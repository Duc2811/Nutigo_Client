import { useState, useEffect } from "react";
import { Select, Layout, message, Table, Input, Modal, Button, Space, Switch, Form, Upload, Slider, Row, Col, Popover } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined, FilterOutlined, SearchOutlined } from '@ant-design/icons';
import Sidebar from "./Sidebar";
import Header from "../layout/ProductManageHeader";
import { getAllCategory, getAllProductBySubCategory, getAllProduct, managerDeleteProduct, updateProduct, addProduct } from "../../Service/Client/ApiProduct";

const { Content } = Layout;
const { Option } = Select;

const ProductView = () => {
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [quantityRange, setQuantityRange] = useState([0, 1000]);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategory();
        setCategories(response.categories);
      } catch (err) {
        message.error("Không thể tải danh mục sản phẩm!");
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchAllProducts = async () => {
      if (!selectedCategory) {
        try {
          const response = await getAllProduct();
          if (response && response.products) {
            setProducts(response.products);
            setFilteredProducts(response.products);
          } else {
            setProducts([]);
          }
        } catch (err) {
          message.error("Không thể tải danh sách sản phẩm!");
          console.error(err);
        }
      }
    };
    fetchAllProducts();
  }, [selectedCategory]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    const category = categories.find((cat) => cat._id === categoryId);
    setSubCategories(category ? category.subCategories : []);
    setSelectedSubCategory(null);
    setProducts([]);
  };

  const handleSubCategoryChange = async (subCategoryId) => {
    setSelectedSubCategory(subCategoryId);
    try {
      const response = await getAllProductBySubCategory(subCategoryId);
      if (response && response.products) {
        setProducts(response.products);
        setFilteredProducts(response.products);
      } else {
        message.error("Không tìm thấy sản phẩm cho danh mục này!");
      }
    } catch (err) {
      message.error("Không thể tải sản phẩm!");
      console.error(err);
    }
  };

  

  const handleCreateProduct = () => {
    setAddModalVisible(true);
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleBeforeUpload = async (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('Chỉ hỗ trợ tải lên file ảnh!');
      return Upload.LIST_IGNORE;
    }

    const base64Image = await convertImageToBase64(file);
    setImagePreview(base64Image);
    setImageBase64(base64Image);
    return false;
  };

  const handleAddSubmit = async (values) => {
    try {
      setLoading(true);
      if (!values.subCategoryId) {
        message.error("Please select a subcategory!");
        return;
      }
      if (!imageBase64) {
        message.error("Please upload a product image!");
        return;
      }
      await addProduct(values.subCategoryId, {
        name: values.name,
        price: values.price,
        quantity: values.quantity,
        description: values.description,
        image: imageBase64
      });
      message.success("Product added successfully!");
      setAddModalVisible(false);
      addForm.resetFields();
      setImagePreview(null);
      setImageBase64(null);
      // Refresh product list
      const response = await getAllProductBySubCategory(values.subCategoryId);
      if (response && response.products) {
        setProducts(response.products);
        setFilteredProducts(response.products);
      }
    } catch (err) {
      message.error("Failed to add product!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategoryChange = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    setSubCategories(category ? category.subCategories : []);
    addForm.setFieldsValue({ subCategoryId: undefined }); // Reset subcategory when category changes
  };

  const handleUpdateProduct = (record) => {
    setSelectedProduct(record);
    form.setFieldsValue({
      name: record.name,
      price: record.price,
      quantity: record.quantity,
      description: record.description,
    });
    setUpdateModalVisible(true);
  };

  const handleUpdateSubmit = async (values) => {
    try {
      setLoading(true);
      await updateProduct({
        productId: selectedProduct._id,
        ...values
      });
      message.success("Product updated successfully!");
      setUpdateModalVisible(false);

      // Update the products list
      const updatedProducts = products.map(p =>
        p._id === selectedProduct._id ? { ...p, ...values } : p
      );
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
    } catch (err) {
      message.error("Failed to update product!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = (record) => {
    Modal.confirm({
      title: "Delete Product",
      content: (
        <div>
          <p>Are you sure you want to delete this product?</p>
          <p><strong>Product Name:</strong> {record.name}</p>
          <p><strong>Price:</strong> {new Intl.NumberFormat("vi-VN").format(record.price)} VND</p>
        </div>
      ),
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          setLoading(true);
          const response = await managerDeleteProduct(record._id);
          if (response && response.success) {
            message.success("Product deleted successfully!");
            setProducts(products.filter(p => p._id !== record._id));
            setFilteredProducts(filteredProducts.filter(p => p._id !== record._id));
          } else {
            message.error(response?.message || "Failed to delete product!");
          }
        } catch (err) {
          message.error(err.response?.data?.message || "Failed to delete product!");
          console.error("Delete product error:", err);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const handleToggleActive = async (record) => {
    try {
      setLoading(true);
      await updateProduct({
        productId: record._id,
        isActive: !record.isActive
      });
      message.success(`Product ${record.isActive ? 'deactivated' : 'activated'} successfully!`);
      setProducts(products.map(p =>
        p._id === record._id ? { ...p, isActive: !p.isActive } : p
      ));
      setFilteredProducts(filteredProducts.map(p =>
        p._id === record._id ? { ...p, isActive: !p.isActive } : p
      ));
    } catch (err) {
      message.error("Failed to update product status!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Apply search filter
    if (searchKeyword) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    // Apply price range filter
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply quantity range filter
    filtered = filtered.filter(product =>
      product.quantity >= quantityRange[0] && product.quantity <= quantityRange[1]
    );

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(product =>
        statusFilter === 'active' ? product.isActive : !product.isActive
      );
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [products, searchKeyword, priceRange, quantityRange, statusFilter]);

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={image || "https://via.placeholder.com/50"}
          alt="Sản phẩm"
          style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 5 }}
        />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${new Intl.NumberFormat("vi-VN").format(price)} VND`,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive, record) => (
        <Switch
          checked={isActive}
          onChange={() => handleToggleActive(record)}
          checkedChildren="Active"
          unCheckedChildren="Inactive"
        />
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleUpdateProduct(record)}
          >
            Sửa
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteProduct(record)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const filterContent = (
    <div style={{ width: 300, padding: '12px' }}>
      <div className="mb-3">
        <label className="form-label">Khoảng giá:</label>
        <Slider
          range
          min={0}
          max={10000000}
          step={100000}
          value={priceRange}
          onChange={setPriceRange}
          tipFormatter={value => `${new Intl.NumberFormat("vi-VN").format(value)} VND`}
        />
        <div className="d-flex justify-content-between">
          <span>{new Intl.NumberFormat("vi-VN").format(priceRange[0])} VND</span>
          <span>{new Intl.NumberFormat("vi-VN").format(priceRange[1])} VND</span>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Số lượng:</label>
        <Slider
          range
          min={0}
          max={1000}
          step={10}
          value={quantityRange}
          onChange={setQuantityRange}
        />
        <div className="d-flex justify-content-between">
          <span>{quantityRange[0]}</span>
          <span>{quantityRange[1]}</span>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Trạng thái:</label>
        <Select
          style={{ width: "100%" }}
          value={statusFilter}
          onChange={setStatusFilter}
        >
          <Option value="all">Tất cả</Option>
          <Option value="active">Đang hoạt động</Option>
          <Option value="inactive">Không hoạt động</Option>
        </Select>
      </div>

      <Button 
        type="primary" 
        block 
        onClick={() => {
          setPriceRange([0, 10000000]);
          setQuantityRange([0, 1000]);
          setStatusFilter('all');
          setSearchKeyword('');
        }}
      >
        Reset Filters
      </Button>
    </div>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Layout style={{ marginTop: 64 }}>
        <Sidebar />
        <Layout style={{ padding: "20px", marginLeft: 200 }}>
          <Content
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              paddingTop: 80,
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3>Danh sách sản phẩm</h3>
              <Space>
                <Popover 
                  content={filterContent} 
                  title="Bộ lọc" 
                  trigger="hover"
                  placement="bottomRight"
                >
                  <Button icon={<FilterOutlined />}>Bộ lọc</Button>
                </Popover>
                <Input
                  placeholder="Tìm kiếm sản phẩm"
                  prefix={<SearchOutlined />}
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  style={{ width: 200 }}
                />
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleCreateProduct}
                >
                  Thêm sản phẩm mới
                </Button>
              </Space>
            </div>

            <div className="mb-3">
              <Row gutter={16}>
                <Col span={12}>
                  <label className="form-label">Danh mục:</label>
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Chọn danh mục"
                    onChange={handleCategoryChange}
                  >
                    <Option key={0} value={null}>
                      Tất cả sản phẩm
                    </Option>
                    {categories?.map((category) => (
                      <Option key={category._id} value={category._id}>
                        {category.name}
                      </Option>
                    ))}
                  </Select>
                </Col>
                <Col span={12}>
                  <label className="form-label">Danh mục con:</label>
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Chọn danh mục con"
                    onChange={handleSubCategoryChange}
                    disabled={!selectedCategory}
                  >
                    {subCategories?.map((sub) => (
                      <Option key={sub.id} value={sub.id}>
                        {sub.name}
                      </Option>
                    ))}
                  </Select>
                </Col>
              </Row>
            </div>

            <Table
              columns={columns}
              dataSource={filteredProducts}
              rowKey="_id"
              pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: filteredProducts.length,
                showSizeChanger: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} sản phẩm`,
                onChange: (page, size) => {
                  setCurrentPage(page);
                  setPageSize(size);
                },
                pageSizeOptions: ['10', '20', '50', '100'],
              }}
              loading={loading}
            />

            <Modal
              title="Chi tiết sản phẩm"
              open={modalVisible}
              onCancel={() => setModalVisible(false)}
              footer={null}
            >
              {selectedProduct && (
                <>
                  <p><b>Tên:</b> {selectedProduct.name}</p>
                  <p><b>Giá:</b> {new Intl.NumberFormat("vi-VN").format(selectedProduct.price)} VND</p>
                  <p><b>Số lượng:</b> {selectedProduct.quantity}</p>
                  <p><b>Mô tả:</b> {selectedProduct.description}</p>
                  <p><b>Trạng thái:</b> {selectedProduct.isActive ? "Đang hoạt động" : "Không hoạt động"}</p>
                </>
              )}
            </Modal>

            <Modal
              title="Update Product"
              open={updateModalVisible}
              onCancel={() => {
                setUpdateModalVisible(false);
                form.resetFields();
              }}
              footer={null}
              width={600}
            >
              <Form
                form={form}
                layout="vertical"
                onFinish={handleUpdateSubmit}
                initialValues={selectedProduct}
              >
                <Form.Item
                  name="name"
                  label="Product Name"
                  rules={[{ required: true, message: "Please input product name!" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="price"
                  label="Price"
                  rules={[{ required: true, message: "Please input price!" }]}
                >
                  <Input type="number" />
                </Form.Item>

                <Form.Item
                  name="quantity"
                  label="Quantity"
                  rules={[{ required: true, message: "Please input quantity!" }]}
                >
                  <Input type="number" />
                </Form.Item>

                <Form.Item
                  name="description"
                  label="Description"
                  rules={[{ required: true, message: "Please input description!" }]}
                >
                  <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item>
                  <Space>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Update
                    </Button>
                    <Button onClick={() => {
                      setUpdateModalVisible(false);
                      form.resetFields();
                    }}>
                      Cancel
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Modal>

            <Modal
              title="Add New Product"
              open={addModalVisible}
              onCancel={() => {
                setAddModalVisible(false);
                addForm.resetFields();
                setSubCategories([]);
                setImagePreview(null);
                setImageBase64(null);
              }}
              footer={null}
              width={600}
            >
              <Form
                form={addForm}
                layout="vertical"
                onFinish={handleAddSubmit}
              >
                <Form.Item
                  name="categoryId"
                  label="Category"
                  rules={[{ required: true, message: "Please select a category!" }]}
                >
                  <Select
                    placeholder="Select category"
                    onChange={handleAddCategoryChange}
                  >
                    {categories?.map((category) => (
                      <Option key={category._id} value={category._id}>
                        {category.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="subCategoryId"
                  label="Subcategory"
                  rules={[{ required: true, message: "Please select a subcategory!" }]}
                >
                  <Select
                    placeholder="Select subcategory"
                    disabled={!addForm.getFieldValue('categoryId')}
                  >
                    {subCategories?.map((sub) => (
                      <Option key={sub.id} value={sub.id}>
                        {sub.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="name"
                  label="Product Name"
                  rules={[{ required: true, message: "Please input product name!" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="price"
                  label="Price"
                  rules={[{ required: true, message: "Please input price!" }]}
                >
                  <Input type="number" />
                </Form.Item>

                <Form.Item
                  name="quantity"
                  label="Quantity"
                  rules={[{ required: true, message: "Please input quantity!" }]}
                >
                  <Input type="number" />
                </Form.Item>

                <Form.Item
                  name="description"
                  label="Description"
                  rules={[{ required: true, message: "Please input description!" }]}
                >
                  <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item
                  name="image"
                  label="Product Image"
                  rules={[{ required: true, message: "Please upload a product image!" }]}
                >
                  <Upload
                    beforeUpload={handleBeforeUpload}
                    showUploadList={false}
                    accept="image/*"
                  >
                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                  </Upload>
                </Form.Item>

                {imagePreview && (
                  <div className="mb-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
                    />
                  </div>
                )}

                <Form.Item>
                  <Space>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Add Product
                    </Button>
                    <Button onClick={() => {
                      setAddModalVisible(false);
                      addForm.resetFields();
                      setSubCategories([]);
                      setImagePreview(null);
                      setImageBase64(null);
                    }}>
                      Cancel
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Modal>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ProductView;