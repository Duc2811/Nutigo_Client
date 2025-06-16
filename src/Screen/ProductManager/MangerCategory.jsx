import { useState, useEffect } from "react";
import { Layout, Collapse, Card, Typography, Space, Button, List, message, Modal, Form, Input, Select } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, FolderOutlined, SearchOutlined } from '@ant-design/icons';
import { Container } from 'react-bootstrap';
import Header from "../layout/ProductManageHeader";
import Sidebar from "./Sidebar";
import {
  getAllCategory,
  managerDeleteCategory,
  deleteSubCategory,
  addCategory,
  addSubCategory,
  updateCategory,
  updateSubCategory
} from "../../Service/Client/ApiProduct";

const { Content } = Layout;
const { Panel } = Collapse;
const { Title, Text } = Typography;

const MangerCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] = useState(false);
  const [isAddSubcategoryModalVisible, setIsAddSubcategoryModalVisible] = useState(false);
  const [isUpdateCategoryModalVisible, setIsUpdateCategoryModalVisible] = useState(false);
  const [isUpdateSubcategoryModalVisible, setIsUpdateSubcategoryModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [form] = Form.useForm();
  const [subcategoryForm] = Form.useForm();

  // Fetch danh sách categories từ API
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getAllCategory();
      setCategories(data.categories || []);
    } catch (error) {
      message.error("Failed to fetch categories: " + (error.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter and search function
  useEffect(() => {
    let filtered = [...categories];
    
    // Apply search filter
    if (searchText) {
      filtered = filtered.filter(category => 
        category.name.toLowerCase().includes(searchText.toLowerCase()) ||
        category.description.toLowerCase().includes(searchText.toLowerCase()) ||
        category.subCategories.some(sub => 
          sub.name.toLowerCase().includes(searchText.toLowerCase()) ||
          sub.description.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }

    // Apply status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter(category => {
        if (filterStatus === "withSub") {
          return category.subCategories && category.subCategories.length > 0;
        } else if (filterStatus === "withoutSub") {
          return !category.subCategories || category.subCategories.length === 0;
        }
        return true;
      });
    }

    setFilteredCategories(filtered);
  }, [categories, searchText, filterStatus]);

  const handleAddCategory = async (values) => {
    try {
      await addCategory(values.name, values.description);
      message.success("Category added successfully!");
      setIsAddCategoryModalVisible(false);
      form.resetFields();
      fetchCategories();
    } catch (err) {
      message.error("Failed to add category: " + (err.message || "Unknown error"));
    }
  };

  const handleAddSubcategory = async (values) => {
    try {
      await addSubCategory(selectedCategory._id, values.name, values.description);
      message.success("Subcategory added successfully!");
      setIsAddSubcategoryModalVisible(false);
      subcategoryForm.resetFields();
      fetchCategories();
    } catch (err) {
      message.error("Failed to add subcategory: " + (err.message || "Unknown error"));
    }
  };

  const handleUpdateCategory = async (values) => {
    try {
      await updateCategory(selectedCategory._id, values.name, values.description);
      message.success("Category updated successfully!");
      setIsUpdateCategoryModalVisible(false);
      form.resetFields();
      fetchCategories();
    } catch (err) {
      message.error("Failed to update category: " + (err.message || "Unknown error"));
    }
  };

  const handleUpdateSubcategory = async (values) => {
    try {
      await updateSubCategory(selectedSubcategory.id, values.name, values.description);
      message.success("Subcategory updated successfully!");
      setIsUpdateSubcategoryModalVisible(false);
      subcategoryForm.resetFields();
      fetchCategories();
    } catch (err) {
      message.error("Failed to update subcategory: " + (err.message || "Unknown error"));
    }
  };

  // Xóa category
  const handleDeleteCategory = (categoryId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this category?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await managerDeleteCategory(categoryId);
          message.success("Category deleted successfully!");
          setCategories(categories.filter((cat) => cat._id !== categoryId));
        } catch (error) {
          message.error("Failed to delete category: " + (error.response?.data?.message || error.message));
        }
      },
    });
  };

  // Xóa subcategory
  const handleDeleteSubCategory = (subCategoryId, categoryId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this subcategory?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await deleteSubCategory(subCategoryId);
          message.success("Subcategory deleted successfully!");
          // Cập nhật lại danh sách subcategory trong category tương ứng
          setCategories(
            categories.map((cat) =>
              cat._id === categoryId
                ? { ...cat, subCategories: cat.subCategories.filter((sub) => sub.id !== subCategoryId) }
                : cat
            )
          );
        } catch (error) {
          message.error("Failed to delete subcategory: " + (error.response?.data?.message || error.message));
        }
      },
    });
  };

  return (
    <Layout className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <Sidebar />
      <Layout className="ml-[220px] pt-[80px] min-h-screen">
        <Content className="p-8">
          <Container fluid className="p-0">
            <Card 
              className="shadow-lg rounded-lg border-0"
              loading={loading}
              bodyStyle={{ padding: '32px' }}
            >
              <div className="flex flex-col space-y-6">
                <Title level={2} className="m-0 text-gray-800 dark:text-white">
                  Category Management
                </Title>
                
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4 w-2/3">
                    <Input
                      placeholder="Search categories and subcategories..."
                      prefix={<SearchOutlined className="text-gray-400" />}
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      className="rounded-lg w-1/2"
                      allowClear
                    />
                    <Select
                      value={filterStatus}
                      onChange={setFilterStatus}
                      className="w-1/3"
                      options={[
                        { value: "all", label: "All Categories" },
                        { value: "withSub", label: "With Subcategories" },
                        { value: "withoutSub", label: "Without Subcategories" },
                      ]}
                    />
                  </div>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsAddCategoryModalVisible(true)}
                    className="bg-blue-500 hover:bg-blue-600 border-0 h-10 px-6 text-base"
                  >
                    Add Category
                  </Button>
                </div>
              </div>

              {filteredCategories.length === 0 && !loading ? (
                <div className="text-center py-12">
                  <Text className="text-gray-500 dark:text-gray-400 text-lg">
                    {searchText || filterStatus !== "all" 
                      ? "No categories match your search criteria."
                      : "No categories available."}
                  </Text>
                </div>
              ) : (
                <Collapse
                  accordion
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mt-6"
                  expandIconPosition="end"
                >
                  {filteredCategories.map((category) => (
                    <Panel
                      header={
                        <div className="flex justify-between items-center w-full py-2">
                          <div className="flex items-center space-x-4">
                            <FolderOutlined className="text-2xl text-blue-500" />
                            <span className="text-xl font-medium text-gray-800 dark:text-white">
                              {category.name}
                            </span>
                          </div>
                          <Space size="middle">
                            <Button
                              type="primary"
                              icon={<EditOutlined />}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCategory(category);
                                setIsUpdateCategoryModalVisible(true);
                              }}
                              className="bg-yellow-500 hover:bg-yellow-600 border-0 h-9 px-5"
                            >
                              Update
                            </Button>
                            <Button
                              type="primary"
                              icon={<PlusOutlined />}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCategory(category);
                                setIsAddSubcategoryModalVisible(true);
                              }}
                              className="bg-green-500 hover:bg-green-600 border-0 h-9 px-5"
                            >
                              Add Subcategory
                            </Button>
                            <Button
                              type="primary"
                              danger
                              icon={<DeleteOutlined />}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteCategory(category._id);
                              }}
                              className="h-9 px-5"
                            >
                              Delete
                            </Button>
                          </Space>
                        </div>
                      }
                      key={category._id}
                      className="mb-3"
                    >
                      <List
                        dataSource={category.subCategories}
                        renderItem={(subcategory) => (
                          <List.Item
                            key={subcategory.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 py-3"
                            actions={[
                              <Button
                                key="update"
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={() => {
                                  setSelectedSubcategory(subcategory);
                                  setIsUpdateSubcategoryModalVisible(true);
                                }}
                                className="bg-yellow-500 hover:bg-yellow-600 border-0 h-9 px-5"
                              >
                                Update
                              </Button>,
                              <Button
                                key="delete"
                                type="primary"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => handleDeleteSubCategory(subcategory.id, category._id)}
                                className="h-9 px-5"
                              >
                                Delete
                              </Button>,
                            ]}
                          >
                            <div className="flex items-center space-x-3">
                              <FolderOutlined className="text-xl text-blue-400" />
                              <Text className="text-gray-700 dark:text-gray-300 text-lg">
                                {subcategory.name}
                              </Text>
                            </div>
                          </List.Item>
                        )}
                        bordered={false}
                        locale={{ emptyText: "No subcategories available" }}
                      />
                    </Panel>
                  ))}
                </Collapse>
              )}
            </Card>
          </Container>
        </Content>
      </Layout>

      {/* Add Category Modal */}
      <Modal
        title={
          <div className="flex items-center space-x-2">
            <PlusOutlined className="text-blue-500" />
            <span>Add New Category</span>
          </div>
        }
        open={isAddCategoryModalVisible}
        onCancel={() => {
          setIsAddCategoryModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        className="rounded-lg"
      >
        <Form form={form} onFinish={handleAddCategory} layout="vertical">
          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, message: "Please input category name!" }]}
          >
            <Input className="rounded-lg" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please input description!" }]}
          >
            <Input.TextArea className="rounded-lg" rows={4} />
          </Form.Item>
          <Form.Item className="mb-0">
            <Button type="primary" htmlType="submit" className="w-full bg-blue-500 hover:bg-blue-600 border-0">
              Add Category
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Add Subcategory Modal */}
      <Modal
        title={
          <div className="flex items-center space-x-2">
            <PlusOutlined className="text-green-500" />
            <span>Add New Subcategory</span>
          </div>
        }
        open={isAddSubcategoryModalVisible}
        onCancel={() => {
          setIsAddSubcategoryModalVisible(false);
          subcategoryForm.resetFields();
        }}
        footer={null}
        className="rounded-lg"
      >
        <Form form={subcategoryForm} onFinish={handleAddSubcategory} layout="vertical">
          <Form.Item
            name="name"
            label="Subcategory Name"
            rules={[{ required: true, message: "Please input subcategory name!" }]}
          >
            <Input className="rounded-lg" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please input description!" }]}
          >
            <Input.TextArea className="rounded-lg" rows={4} />
          </Form.Item>
          <Form.Item className="mb-0">
            <Button type="primary" htmlType="submit" className="w-full bg-green-500 hover:bg-green-600 border-0">
              Add Subcategory
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Update Category Modal */}
      <Modal
        title={
          <div className="flex items-center space-x-2">
            <EditOutlined className="text-yellow-500" />
            <span>Update Category</span>
          </div>
        }
        open={isUpdateCategoryModalVisible}
        onCancel={() => {
          setIsUpdateCategoryModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        className="rounded-lg"
      >
        <Form 
          form={form} 
          onFinish={handleUpdateCategory}
          layout="vertical"
          initialValues={selectedCategory ? {
            name: selectedCategory.name,
            description: selectedCategory.description
          } : {}}
        >
          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, message: "Please input category name!" }]}
          >
            <Input className="rounded-lg" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please input description!" }]}
          >
            <Input.TextArea className="rounded-lg" rows={4} />
          </Form.Item>
          <Form.Item className="mb-0">
            <Button type="primary" htmlType="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 border-0">
              Update Category
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Update Subcategory Modal */}
      <Modal
        title={
          <div className="flex items-center space-x-2">
            <EditOutlined className="text-yellow-500" />
            <span>Update Subcategory</span>
          </div>
        }
        open={isUpdateSubcategoryModalVisible}
        onCancel={() => {
          setIsUpdateSubcategoryModalVisible(false);
          subcategoryForm.resetFields();
        }}
        footer={null}
        className="rounded-lg"
      >
        <Form 
          form={subcategoryForm} 
          onFinish={handleUpdateSubcategory}
          layout="vertical"
          initialValues={selectedSubcategory ? {
            name: selectedSubcategory.name,
            description: selectedSubcategory.description
          } : {}}
        >
          <Form.Item
            name="name"
            label="Subcategory Name"
            rules={[{ required: true, message: "Please input subcategory name!" }]}
          >
            <Input className="rounded-lg" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please input description!" }]}
          >
            <Input.TextArea className="rounded-lg" rows={4} />
          </Form.Item>
          <Form.Item className="mb-0">
            <Button type="primary" htmlType="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 border-0">
              Update Subcategory
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default MangerCategory;