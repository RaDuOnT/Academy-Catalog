import React from "react";
import { Button, message, Form, Input } from 'antd';
import "./style.css";
import { users } from "../../dummy data/users";


const ModalButton = (props) => {
    //function that displays a modal with error message that appears after submitting change password form
    const error = () => {
        message.error({
            content: 'Something went wrong! Try again!',
        });
    };
    //function that displays a modal with succes message that appears after submitting change password form
    const success = () => {
        message.success({
            content: 'Password changed succesfully!',
        });
    };
    //form functions
    const [form] = Form.useForm();
    const onFinish = (values) => {
        props.user.currentUser.password = values.newPassprops.user.currentUserword;
        form.resetFields();
        success();
    };
    const onFinishFailed = (errorInfo) => {
        form.resetFields();
        error();
    };
    return (

        <Form
            form={form}
            name="dynamic_rule"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 10,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Current Password"
                name="currentPassword"
                rules={[
                    {
                        required: true,
                        message: 'Please enter your current password!',
                    },
                    () => ({
                        validator(_, value) {
                            if (!value || props.user.currentUser.password === value) {
                                return Promise.resolve();
                            } else if (value === null || value === undefined) {
                                return Promise.reject("Please enter your current password!")
                            }
                            return Promise.reject("The password that you entered doesn't match your current password!")
                        }
                    })
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="New Password"
                name="newPassword"
                dependencies={["currentPassword"]}
                rules={[
                    {
                        required: true,
                        message: 'Please enter your new password!',
                    },
                    () => ({
                        validator(_, value) {
                            if (props.user.currentUser.password === value) {
                                return Promise.reject("The password that you entered matches your current password!")
                            }
                            else if (value === null || value === undefined) {
                                return Promise.reject("Please enter a new password!")
                            }
                            return Promise.resolve()
                        }
                    })
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 10,
                    span: 24,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Change Password
                </Button>
            </Form.Item>
        </Form>

    );
};

export default ModalButton;

