import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Checkbox,
  DatePicker,
  ConfigProvider,
  message,
} from "antd";
import ProfilePic from "./profilePic";
import { findAllUsers, updateUser } from "../../store/actions/userActions";
import { connect } from "react-redux";
import { useEffect } from "react";
import dayjs from "dayjs";


const { TextArea } = Input;

const EditProfile = ({ userList, findUsers, updateUser, user }) => {
  useEffect(() => {
    if (!userList || userList.length === 0) {
      findUsers();
    }
    forceUpdate({});
  }, []);

  // checkbox function
  const [visibleDetails, setVisibleDetails] = useState(false);
  const onCheckboxChange = (e) => {
    setVisibleDetails(e.target.checked);
  };
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  const currentUserId = user.currentUser?._id;
  const [currentProfile, setCurrentProfile] = useState({
    ...user.currentUser,
    _id: currentUserId,
  });

  const handleUpdate = () => {
    updateUser(
      currentProfile,
      () => {
        message.success(`Updated succesfully!`);
      },
      () => {
        message.error(
          `There has been an error in updating your profile, try again later!`
        );
      }
    );
  };

  if (userList.length === 0) {
    return <div>Mai asteapta putin...</div>;
  }

  // display form
  return (
    <div className="edit-form">
      <Form
        form={form}
        initialValues={{
          gender: user.currentUser?.gender,
          firstName: user.currentUser?.firstName,
          lastName: user.currentUser?.lastName,
          emailAddress: user.currentUser?.emailAddress,
          phoneNumber: user.currentUser?.phoneNumber,
          address: user.currentUser?.address,
          description: user.currentUser?.description,
          data: user.currentUser?.dateOfBirth,
          profilePicture: user.currentUser?.profilePicture
        }}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        layout="horizontal"
      >
        <Form.Item
          wrapperCol={{
            span: 24,
          }}
          name="profilePicture"
          valuePropName="fileList"
        >
          <ConfigProvider
            theme={{
              token: {
                borderRadius: "50%",
              },
            }}
          >
            <ProfilePic user={user.currentUser} setNewPic={setCurrentProfile} />
          </ConfigProvider>
        </Form.Item>
        <Form.Item
          name="firstName"
          label="First Name"
          validateStatus="warning"
          rules={[
            {
              required: true,
              message: "Please input your first name!",
            },
          ]}
          onChange={(e) => {
            setCurrentProfile((prevUser) => {
              return { ...prevUser, firstName: e.target.value };
            });
          }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[
            {
              required: true,
              message: "Please input your last name!",
            },
          ]}
          onChange={(e) => {
            setCurrentProfile((prevUser) => {
              return { ...prevUser, lastName: e.target.value };
            });
          }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: 6 }}
          name="emailAddress"
          label="Email adress"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please write a valid email!",
            },
          ]}
          onChange={(e) => {
            setCurrentProfile((prevUser) => {
              return { ...prevUser, emailAddress: e.target.value };
            });
          }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please write a valid phone number!",
            },
          ]}
          onChange={(e) => {
            setCurrentProfile((prevUser) => {
              return { ...prevUser, phoneNumber: e.target.value };
            });
          }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="visibleEmail"
          wrapperCol={{
            span: 24,
          }}
        >
          <Checkbox onChange={onCheckboxChange}>
            Set personal details vissible for everyone
          </Checkbox>
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          onChange={(e) => {
            setCurrentProfile((prevUser) => {
              return { ...prevUser, gender: e.target.value };
            });
          }}
        >
          <Radio.Group>
            <Radio value="male"> Male </Radio>
            <Radio value="female"> Female </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="address" label="Address">
          <TextArea
            rows={2}
            onChange={(e) => {
              setCurrentProfile((prevUser) => {
                return { ...prevUser, address: e.target.value };
              });
            }}
          />
        </Form.Item>
        <Form.Item
          label="Date of birth"
          onChange={(e) => {
            setCurrentProfile((prevUser) => {
              return { ...prevUser, dateOfBirth: e.target.value };
            });
          }}
        >
          <DatePicker
            style={{ display: "flex" }}
            format={"YYYY/MM/DD"}
            defaultValue={dayjs(user.currentUser?.dateOfBirth, "YYYY-MM-DD") }
            onChange={(e) => {
              setCurrentProfile((prevUser) => {
                return { ...prevUser, dateOfBirth: dayjs(e).format("YYYY-MM-DD") };
              });
            }}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          onChange={(e) => {
            setCurrentProfile((prevUser) => {
              return { ...prevUser, description: e.target.value };
            });
          }}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          shouldUpdate
          wrapperCol={{
            span: 24,
          }}
          style={{ display: "flex", justifyContent: "center" }}
        >
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleUpdate}
              disabled={
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Edit
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userList: state.user.users,
    error: {
      updateError: state.user.updateError,
      messsage: state.user.errorMessage,
    },
  };
};

const mapDispatchToProps = (dispatch) => ({
  findUsers: () => {
    dispatch(findAllUsers());
  },
  updateUser: (user, updateSuccess, updateFail) => {
    dispatch(updateUser(user, updateSuccess, updateFail));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
