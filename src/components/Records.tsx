import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Row, Space, Table, Tag, TableColumnsType } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { AppState } from "../store";
import { getRecords } from "../store/actions/recordActions";
import { Record } from "../types/record";

const Records = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error, loading } = useSelector(
    (state: AppState) => state.records
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecords());
  }, [dispatch]);

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
      title: "Action",
      key: "action",
      render: (action: string, record: Record) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: "#2a4a9c", fontSize: "16px" }}
            onClick={() => {}}
          />
          <DeleteOutlined
            style={{ color: "#9e0620", fontSize: "16px" }}
            onClick={() => {}}
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
            <Button type="primary" onClick={() => {}}>
              New Record
            </Button>
          </Col>
        </Row>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        rowKey={(record) => record.id}
        loading={loading}
      />
    </>
  );
};

export default Records;
