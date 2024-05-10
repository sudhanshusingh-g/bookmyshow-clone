import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onFinish = () => {
    console.log("Success:", { email, password });
    message.success("Registration successful");
    setEmail("");
    setPassword("");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="center">
      <h1>Login</h1>
      <Form
        className="form"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 800,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
      
        <Form.Item
          className="formItem"
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input name="email" value={email} onChange={handleEmailChange} />
        </Form.Item>
        <Form.Item
          className="formItem"
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 2,
            span: 16,
          }}
        >
          <Button className="button" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        <p>Not registered? Login</p>
      </Form>
    </div>
  );
}

export default Login;
