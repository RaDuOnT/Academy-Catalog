import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import "../common/Colors/colors.css";

import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  ConfigProvider,
  message,
} from "antd";
import { connect } from "react-redux";
import { createUser } from "../../store/actions/userActions";

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 8,
      offset: 0,
    },
    sm: {
      span: 12,
      offset: 0,
    },
    lg: {
      span: 9,
      offset: 0,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 12,
      offset: 0,
    },
    lg: {
      span: 24,
      offset: 0,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 0,
    },
    lg: {
      span: 24,
      offset: 0,
    },
  },
};
const SignupForm = ({ createUser }) => {
  const [form] = Form.useForm();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState();
  const [gender, setGender] = useState("");
  const [checked, setChecked] = useState("");

  const navigate = useNavigate();

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }


  const registerDetails = (e) => {
    
    if (!firstName || !lastName || !isValidEmail(email) || !checked) {
      message.error("Please fill in the required fields");
      return;
    }

    const newUser = {
      firstName,
      lastName,
      role: "student",
      emailAddress: email,
      password: "12345678",
      phoneNumber: phone,
      address,
      gender,
      enabled: "true",
    };
    createUser(newUser); // Insert the user to DB
    navigate("/");
    message.info("Account created! You can login now");
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#F25C05",
          colorSecondary: "#F25C05",
          colorTertiary: "#F25C05",
          colorPrimaryHover: "#F25C05",
        },
      }}
    >
      <div className="signup-form-container-page">
        <div className="signup-form-container">
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            scrollToFirstError
          >
            <Form.Item>
              <h1 className="signup-form-title">Sign Up</h1>
            </Form.Item>
            <Form.Item
              name="firstname"
              label="First Name"
              tooltip="What's your First Name?"
              rules={[
                {
                  required: true,
                  message: "Please input your First Name!",
                  whitespace: true,
                },
              ]}
            >
              <Input onChange={(e) => setFirstName(e.target.value)} />
            </Form.Item>

            <Form.Item
              name="lastname"
              label="Last Name"
              tooltip="What's your Last Name?"
              rules={[
                {
                  required: true,
                  message: "Please input your Last Name!",
                  whitespace: true,
                },
              ]}
            >
              <Input onChange={(e) => setLastName(e.target.value)} />
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
            <Form.Item
              name="residence"
              label="Address"
              rules={[
                {
                  message: "Please select your address!",
                },
              ]}
            >
              <Input onChange={(e) => setAddress(e.target.value)}></Input>
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input type="number" onChange={(e) => setPhone(e.target.value)} />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[
                {
                  message: "Please select gender!",
                },
              ]}
            >
              <Select
                placeholder="select your gender"
                onChange={(e) => setGender(e.value)}
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              type="primary"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("Should accept agreement")),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox onChange={(e) => setChecked(e.target.checked)}>
                I have read the <span class="detail-color">agreement</span>
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" value="Submit" onClick={registerDetails}>
                Register
              </Button>
            </Form.Item>
            <Form.Item>
              <p className="signup-form-already-account">
                Already have an account?{" "}
                <a onClick={() => navigate("/")}>Sign in</a>
              </p>
            </Form.Item>
          </Form>
        </div>
      </div>
    </ConfigProvider>
  );
};
const mapDispatchToProps = (dispatch) => ({
  createUser: (user) => {
    dispatch(createUser(user));
  },
});
export default connect(null, mapDispatchToProps)(SignupForm);
