import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tag, Modal, Button, Form, Input, Select, Col, Row } from "antd";
import { GithubPicker } from "react-color";

import { Category, CategoryForm } from "../types/category";
import { getCategories, addCategory } from "../store/actions/categoryActions";
import { AppState } from "../store";

type Mode = "new" | "edit";

const emptyForm: CategoryForm = {
  name: "",
  type: "expense",
  color: "black",
};

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
];

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

  return (
    <>
      <div>
        <Row justify="end" style={{ padding: 8 }}>
          <Col>
            <Button type="primary" onClick={() => showModal("new")}>
              New category
            </Button>
          </Col>
        </Row>
        <Modal
          title={mode === "new" ? "Create Category" : "Update Category"}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ disabled: form.name.trim().length === 0 }}
        >
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
            <Form.Item label="Category Name">
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Category Type">
              <Select
                defaultValue={form.type}
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
                width="225px"
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default Categories;
