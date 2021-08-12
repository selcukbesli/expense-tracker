import { Form, Input, Button, Result } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import api from "../utils/api";
import { showError } from "../utils/messages";

const Login = () => {
  const history = useHistory();
  const location = useLocation<{ newSignUp?: boolean }>();

  const onFinish = async (values: any) => {
    try {
      const res = await api.post("/users/login", values);
      history.push("/");
      console.log(res.data);
    } catch (err) {
      console.log({ err });
      showError(err.response.data.errorMessage);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

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
