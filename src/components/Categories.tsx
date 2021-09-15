import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tag } from "antd";

import { Category } from "../types/category";
import { getCategories } from "../store/actions/categoryActions";
import { AppState } from "../store";

const Categories = () => {
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
  const { data, loading, error } = useSelector(
    (state: AppState) => state.categories
  );

  console.log(data, loading, error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return <Table columns={columns} dataSource={data} />;
};

export default Categories;
