import loginImage from "./loginImages/IVFuture-Academy.png";
import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import {connect} from 'react-redux';
import {authUser} from  "../../store/actions/authenticationActions";
import "../common/Colors/colors.css";


const LoginForm = ({authUser1}) => {
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errMsg, setErrMsg] = useState("");

  //   useEffect(() => {
  //     userRef.current.focus();
  //   }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pass]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    authUser1({
      emailAddress: email,
      password: pass,
      strategy: "local",
    },
    () => {
      navigate("/dashpage");
    }
      )

  };


  const onFinish = (values) => {};
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="login-container">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <Form
        onSubmit={handleSubmit}
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item>
          <h1 className="login-title">Login</h1>
          <hr className="login-title-hr"></hr>
        </Form.Item>
        <Form.Item
          name="Email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
            { type: "email", message: "Please input a valid email address" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
            {
              min: 6,
              message: "Password must be at least 8 characters long",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            id="pass"
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className="login-form-remember">Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" onClick={() => showModal(true)}>
            Forgot password?
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            onClick={handleSubmit}
            type="primary"
            // htmlType="submit"
            className="login-form-button"
            // onClick={() => navigate("/dashpage")}
          >
            Log in
          </Button>
        </Form.Item>

        <Form.Item>
          <div className="login-register-now">
            Or <a href="/register">register now!</a>
          </div>
        </Form.Item>
      </Form>
      <Modal
        title="Forgot Password"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="Don't Send"
        okText="Send"
      >
        <h3 className="login-form-forgot-undertitle">
          Enter your Email Address
        </h3>
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
        <div className="login-form-forgot-password-email-info">
          <p>
            Make sure the Email you insert is correct. <br />
            If the Email is correct, you'll recieve a link to create a new
            password via Email.
          </p>
        </div>

        <p className="login-form-forgot-password-resend">
          {" "}
          Didn't receive an Email? <a>Resend</a>
        </p>
      </Modal>
      <div>
        <img className="login-image-content" src={loginImage}></img>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.users
  };
};

const mapDispatchToProps = (dispatch) => ({
  authUser1: (userInfo,success) => {
    dispatch(authUser(userInfo,success)); 
  }
});
export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);
