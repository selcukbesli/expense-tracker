import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Form, Input, Button, Result } from "antd";

import { useAppDispatch, useAppSelector } from "../store";
import { login } from "../store/actions/userActions";
import { LoginForm } from "../types/user";
import * as messages from "../utils/messages";

const Login = () => {
  const history = useHistory();
  const location = useLocation<{ newSignUp?: boolean }>();
  const dispatch = useAppDispatch();

  const { data, error } = useAppSelector((state) => state.user);
  const { message } = data;

  const onFinish = (values: LoginForm) => {
    dispatch(login(values));
  };

  useEffect(() => {
    error && messages.showError(error);
  }, [error]);

  useEffect(() => {
    message && messages.showSuccess(message);
  }, [message]);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      history.push("/");
    }
  }, [history, data]);

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {location.state?.newSignUp && (
        <Result
          status="success"
          title="You successfully signed up !"
          subTitle="Please login using your credentials."
        />
      )}
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Please input your password!", min: 6 },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
