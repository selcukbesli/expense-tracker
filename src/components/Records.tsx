import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Row,
  Space,
  Table,
  Tag,
  TableColumnsType,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "../store";
import { Record, RecordForm } from "../types/record";
import { Mode } from "../types/general";
import { asyncGetCategories } from "../store/categorySlice";
import {
  asyncAddRecord,
  asyncDeleteRecord,
  asyncGetRecords,
  asyncUpdateRecord,
} from "../store/recordSlice";

const emptyForm: RecordForm = {
  title: "",
  amount: 0,
  category_id: null,
};

const Records = () => {
  const [mode, setMode] = useState<Mode>("new");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form, setForm] = useState<RecordForm>(emptyForm);

  const { data, loading } = useAppSelector((state) => state.records);

  const { data: categories } = useAppSelector((state) => state.categories);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncGetRecords());
    dispatch(asyncGetCategories());

    // !categories.length && dispatch(getCategories());
  }, [dispatch]);

  const showModal = (mode: Mode) => {
    setIsModalVisible(true);
    setMode(mode);
  };

  const handleOk = () => {
    // Create or Update will be invoked depends on mode
    if (mode === "new") {
      dispatch(asyncAddRecord(form));
    } else if (mode === "edit") {
      dispatch(asyncUpdateRecord(form));
    } else if (mode === "delete") {
      dispatch(asyncDeleteRecord(form.recordId!));
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

  const onAddRecord = () => {
    showModal("new");
  };

  const onUpdateRecord = (recordForm: RecordForm) => {
    setMode("edit");
    setIsModalVisible(true);
    setForm(recordForm);
  };

  const onDeleteRecord = (recordId: number) => {
    setMode("delete");
    setIsModalVisible(true);
    setForm({ ...form, recordId });
  };

  const columns: TableColumnsType<Record> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: Record["amount"]) => (
        <>
          {Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: "TRY",
          }).format(amount)}
        </>
      ),
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
      render: (category: Record["category"]) => (
        <Tag color={category.color}>{category.name.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Last Update",
      key: "updatedAt",
      dataIndex: "updatedAt",
      render: (updatedAt: Record["updatedAt"]) => (
        <Tag>
          {Intl.DateTimeFormat("tr-TR", {
            dateStyle: "short",
            timeStyle: "short",
          }).format(new Date(updatedAt))}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (action: string, record: Record) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: "#2a4a9c", fontSize: "16px" }}
            onClick={() =>
              onUpdateRecord({
                amount: record.amount,
                title: record.title,
                category_id: record.category.id,
                recordId: record.id,
              })
            }
          />
          <DeleteOutlined
            style={{ color: "#9e0620", fontSize: "16px" }}
            onClick={() => onDeleteRecord(record.id)}
          />
        </Space>
      ),
    },
  ];

  const isFormValid = !(
    !form.title.trim().length ||
    form.amount < 0.01 ||
    !form.category_id
  );

  return (
    <>
      <div>
        <Row justify="end" style={{ padding: 8 }}>
          <Col>
            <Button type="primary" onClick={onAddRecord}>
              New Record
            </Button>
          </Col>
        </Row>
        <Modal
          title={
            mode === "new"
              ? "Add Record"
              : mode === "edit"
              ? "Update Record"
              : "Delete Record"
          }
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ disabled: mode !== "delete" && !isFormValid }}
        >
          {(mode === "new" || mode === "edit") && (
            <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
              <Form.Item label="Record Title">
                <Input
                  value={form.title}
                  type="text"
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="Record Amount">
                <InputNumber
                  value={form.amount}
                  type="number"
                  min={0}
                  style={{ width: "100%" }}
                  precision={2}
                  step={0.01}
                  onChange={(e) => setForm({ ...form, amount: e })}
                />
              </Form.Item>
              <Form.Item label="Record Type">
                <Select
                  placeholder="Please Select a Category"
                  value={form.category_id!}
                  onChange={(category_id) => setForm({ ...form, category_id })}
                >
                  {categories.map((ctg) => (
                    <Select.Option value={ctg.id} key={ctg.id}>
                      {ctg.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          )}
          {mode === "delete" && <p>Do you want to delete the Record?</p>}
        </Modal>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        rowKey={(record) => record.id.toString()}
        loading={loading}
      />
    </>
  );
};

export default Records;
