import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Tag,
  Modal,
  Button,
  Form,
  Input,
  Select,
  Col,
  Row,
  Space,
} from "antd";
import { GithubPicker } from "react-color";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { Category, CategoryForm } from "../types/category";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../store/actions/categoryActions";
import { AppState } from "../store";
import { Mode } from "../types/general";

const emptyForm: CategoryForm = {
  name: "",
  type: "expense",
  color: "#EB9694",
};

const Categories = () => {
  const [form, setForm] = useState<CategoryForm>(emptyForm);
  const [mode, setMode] = useState<Mode>("new");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();

  //eslint-disable-next-line
  const { data, loading, error } = useSelector(
    (state: AppState) => state.categories
  );

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // Modal Functions
  const showModal = (mode: Mode) => {
    setIsModalVisible(true);
    setMode(mode);
  };

  const handleOk = () => {
    // Create or Update will be invoked depends on mode
    if (mode === "new") {
      dispatch(addCategory(form));
    } else if (mode === "edit") {
      dispatch(updateCategory(form, form.id!));
    } else if (mode === "delete") {
      dispatch(deleteCategory(form.id!));
    }

    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm);
  };

  const onAddCategory = () => {
    showModal("new");
  };

  const onUpdateCategory = (category: Category) => {
    setMode("edit");
    setIsModalVisible(true);
    setForm(category);
  };

  const onDeleteCategory = (categoryId: number) => {
    setMode("delete");
    setIsModalVisible(true);
    setForm({ ...form, id: categoryId });
  };

  // Table Properties
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
      render: (text: string, category: Category) => (
        <Tag color={category.color}>{text.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, category: Category) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: "#2a4a9c", fontSize: "16px" }}
            onClick={() => onUpdateCategory(category)}
          />
          <DeleteOutlined
            style={{ color: "#9e0620", fontSize: "16px" }}
            onClick={() => {
              onDeleteCategory(category.id);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div>
        <Row justify="end" style={{ padding: 8 }}>
          <Col>
            <Button type="primary" onClick={onAddCategory}>
              New category
            </Button>
          </Col>
        </Row>
        <Modal
          title={
            mode === "new"
              ? "Add Category"
              : mode === "edit"
              ? "Update Category"
              : "Delete Category"
          }
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{
            disabled: form.name.trim().length === 0 && mode !== "delete",
          }}
        >
          {(mode === "new" || mode === "edit") && (
            <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
              <Form.Item label="Category Name">
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="Category Type">
                <Select
                  defaultValue="expense"
                  value={form.type}
                  onChange={(value) => setForm({ ...form, type: value })}
                >
                  <Select.Option value="expense">Expense</Select.Option>
                  <Select.Option value="income">Income</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Category Color">
                <GithubPicker
                  color={form.color}
                  onChange={(color) => setForm({ ...form, color: color.hex })}
                  width="60%"
                  triangle="hide"
                />
              </Form.Item>
            </Form>
          )}
          {mode === "delete" && <p>Do you want to delete the Category?</p>}
        </Modal>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.id}
        loading={loading}
      />
    </>
  );
};

export default Categories;
