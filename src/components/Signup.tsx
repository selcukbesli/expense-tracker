import { Form, Input, Button } from "antd";
import { useHistory } from "react-router-dom";
import api from "../utils/api";
import { showError } from "../utils/messages";

const Signup = () => {
  const history = useHistory();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  /* eslint-disable no-template-curly-in-string */

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  /* eslint-disable no-template-curly-in-string */

  const onFinish = async (values: any) => {
    try {
      await api.post("/users/register", values.user);
      history.push("login", { newSignUp: true });
    } catch (err: any) {
      showError(err.response.data.errorMessage);
    }
  };

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={["user", "username"]}
        label="Name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["user", "password"]}
        label="Password"
        rules={[
          { required: true, message: "Please input your password!", min: 6 },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name={["user", "email"]}
        label="Email"
        rules={[{ type: "email", required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name={["user", "full_name"]} label="Full name">
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Signup;
