import { useState } from "react";
import { Form, Input, Button } from "antd";
import { useHistory } from "react-router-dom";

import api from "../utils/api";
import { showError } from "../utils/messages";

const Signup = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [formDisabled, setFormDisabled] = useState(true);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  /* eslint-disable no-template-curly-in-string */

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
    whitespace: "${label} cannot be empty",
    string: {
      min: "${label} must be at least ${min} characters",
    },
  };
  /* eslint-disable no-template-curly-in-string */

  const fieldsChangeHandler = () => {
    const isAllFieldsTouched = form
      .getFieldsError()
      .every(({ name }) => form.isFieldTouched(name) === true);

    const formHasError = form
      .getFieldsError()
      .some(({ errors }) => errors.length > 0);

    isAllFieldsTouched && setFormDisabled(formHasError);
  };

  const onFinish = async (values: any) => {
    try {
      await api().post("/users/register", values.user);
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
      form={form}
      onFieldsChange={fieldsChangeHandler}
    >
      <Form.Item
        name={["user", "username"]}
        label="Name"
        rules={[{ type: "string", required: true, whitespace: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["user", "password"]}
        label="Password"
        rules={[{ type: "string", required: true, min: 6 }]}
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
      <Form.Item
        name={["user", "full_name"]}
        label="Full name"
        rules={[{ type: "string", required: true, whitespace: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" disabled={formDisabled}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Signup;
