import "./Trainer.css";
import {
  Button,
  Table,
  Modal,
  Input,
  Upload,
  message,
  Popconfirm,
  Checkbox,
  Tag,
  Form,
  Select,
  Typography,
  InputNumber
} from "antd";
import { useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
  PlusOutlined,
  StopOutlined,
  CheckCircleOutlined,

} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import React from "react";
import addTrainer from "./Functions/addTrainer";
import TextArea from "antd/es/input/TextArea";
import {
  findAllUsers,
  createUser,
  deleteUser,
  updateUsers
} from "../../store/actions/userActions";
import { createFeedback } from "../../store/actions/feedbackActions";
import { connect } from "react-redux";
import { useEffect } from "react";
import { flatMap } from "lodash";

const { Title } = Typography;
const { Option } = Select;


// Photo Upload
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};
// 

// Checkbox Edit Trainer
const onChange = (e) => {

};
const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select
      style={{
        width: 70,
      }}
    >
      <Option value="40">+40</Option>
    </Select>
  </Form.Item>
);


// Cursuri
// const handleChangeAdd = (value) => {

// };


// const handleChangeAddEnabled = (value) => {

// };

// const handleChangeEditEnabled = (value) => {

// };

// Main function of the trainers section
const Trainers = ({
  userList,
  findUsers,
  createUser,
  deleteUser,
  updateUsers,
  error,
  formValidationFields,
  setFormValidationFields,
  currentUser,
  createFeedback
  }) => {
  // const handleEditTrainer = ()=>{
  //   if (
  //     !formValidationFields.editFirstName)
  //     {
  //       return;
  //     }
  // }
  const [imageUrl, setImageUrl] = useState();


  let navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(
    {
      openModel: false,
      firstName: "",
      lastName: "",
      courses: "",
      emailAddress: "",
    }
  );

  //defining useEffect for get method
  useEffect(() => {
    if (!userList || userList.length === 0) {
      findUsers();
    }
    forceUpdate({});
  }, [])


  const handleOKDetails = () => {
    setIsModalOpen({
      openModel: false
    });
    navigate("/profile");
  };
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  const handleCancelDetails = () => {
    setIsModalOpen({
      openModel: false
    });
  };

  const confirmDelete = (firstName, id) => {
    deleteUser(
      id,
      () => {
        message.success(`You have deleted the trainer called ${firstName}!`);
      },
      () => {
        message.error(
          "There has been an error in deleting , try again later!"
        );
      }
    );
    findUsers();
  };

  // Cursuri predate options
  const options = ['NodeJS', 'FeathersJS', 'MongoDB', 'Laravel', 'MySQL', 'HTML', 'CSS', 'Javascript', 'Ant Design', 'Typescript', 'MobX', 'Nest JS']


  // Photo Upload
  const [loading, setLoading] = useState(false);
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  //
  const confirmToggle = (record) => {
    let newStatus;
    if (record.enabled) {
      newStatus = false;
    }
    if (!record.enabled) {
      newStatus = true;
    }
    const newRecord = { ...record, enabled: newStatus };
    updateUsers(
      newRecord,
      () => {
        message.success(
          `You have ${record.enabled ? "disabled" : "enabled"} 
           the trainer called ${record.firstName}!`
        );
      },
      () => {
        message.error(
          "There has been an error in toggling the trainer, try again later!"
        );
      }
    );
    findUsers();
  };

  // Search box
  const [searchedText, setSearchText] = useState("");

  // Table
  const [isEditing, setIsEditing] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState(null);
  const [dataSource, setDataSource] = useState();

  //PUT Method

  const [courses, setCourses] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const role = "trainer";
  const [enabled, setEnabled] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState("");

  const [feedback_text, setFeedbackText] = useState("");
  const [receiver_id, setReceiverId] = useState("");
  const [receiver_name, setReceiverName] = useState("");

  // Cursuri
  const handleChangeAdd = (value) => {

    setCourses(value);
  };

  const columns = [
    {
      key: "1",
      title: "First name",
      dataIndex: "firstName",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.userId).toLowerCase().includes(value.toLowerCase()) ||
          String(record.firstName).toLowerCase().includes(value.toLowerCase()) ||
          String(record.lastName).toLowerCase().includes(value.toLowerCase()) ||
          String(record.courses).toLowerCase().includes(value.toLowerCase()) ||
          String(record.emailAddress).toLowerCase().includes(value.toLowerCase()) ||
          String(record.enabled).toLowerCase().includes(value.toLowerCase());
      }
    },
    {
      key: "2",
      title: "Last name",
      dataIndex: "lastName",
    },
    {
      key: "3",
      title: "Courses",
      dataIndex: "courses",
      render: (_, { courses }) => (
        <>
          {courses?.map((cursuri) => {
            let color = cursuri.length > 5 ? 'NodeJS' : 'volcano';
            // eslint-disable-next-line no-lone-blocks
            {
              cursuri === 'Python'
                ? color = 'coral'
                : cursuri === 'FeathersJS'
                  ? color = 'volcano'
                  : cursuri === 'NodeJS'
                    ? color = 'coral'
                    : cursuri === 'MongoDB'
                      ? color = 'coral'
                      : cursuri === 'Laravel'
                        ? color = 'volcano'
                        : cursuri === 'MySQL'
                          ? color = '	coral'
                          : cursuri === 'HTML'
                            ? color = 'volcano'
                            : cursuri === 'CSS'
                              ? color = 'volcano'
                              : cursuri === 'Javascript'
                                ? color = 'coral'
                                : color = 'coral'
            }
            return (
              <Tag color={color} key={cursuri}>
                {cursuri.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      key: "4",
      title: "Email Address",
      dataIndex: "emailAddress"
    },
    {
      key: "5",
      title: "Enabled",
      // dataIndex: "enabled"
      render: (record) => {
        return (
          <>
            {
              record.enabled ? "Enabled" : "Disabled"
            }
          </>
        )
      }
    },
    {
      key: "6",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditTrainer(record);
              }}
            />
            <Popconfirm
              placement="top"
              title={`Are you sure you want to ${record.enabled ? "disable" : "enable"
                } this trainer?`}
              onConfirm={() => confirmToggle(record)}
              okText="Yes"
              okType="danger"
              cancelText="No"
            >
              {record.enabled ? (
                <StopOutlined style={{ marginLeft: 12 }} />
              ) : (
                <CheckCircleOutlined style={{ marginLeft: 12 }} />
              )}
            </Popconfirm>
            {!record.enabled && (
              <Popconfirm
                placement="top"
                title="Are you sure you want to delete this trainer?"
                onConfirm={() => confirmDelete(record.firstName, record._id)}
                okText="Yes"
                okType="danger"
                cancelText="No"
              >
                <DeleteOutlined
                  style={{ color: "red", marginLeft: 12 }}
                />
              </Popconfirm>
            )}
          </>
        );
      },
    },
    {
      key: "7",
      title: "Feedback",
      render: (record) => {
        return (<Button type="primary"
          className="customizedButton"
          onClick={() => {
            // setDetails(record);
            setReceiverId(record._id);
            setReceiverName(`${record.firstName} ${record.lastName}`);
            setIsModalOpen({
              openModel: true,
              firstName: record.firstName,
              lastName: record.lastName,
              courses: record.courses,
              emailAddress: record.emailAddress
            });
          }}>
          Feedback
        </Button>)

      },
    }
  ];


  const confirmAddTrainer = () => {
    if (!error.addError) {
      message.info(`Trainer added succesfully`);
    }
    if (error.addError) {
      message.error(
        "There has been an error when trying to add a new trainer"
      );
    }
  }

  // Function used to delete trainers
  const onDeleteTrainer = (id) => {
    deleteUser(id);
    findUsers();
  };

  const onEditTrainer = (record) => {
    setIsEditing(true);
    setEditingTrainer({ ...record });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingTrainer(null);

  };

  // Modal Add Trainer
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  }


  const handleOk = () => {
    setIsModalVisible(false);
    setCourses(null)

    const newTrainer = {
      firstName: firstName,
      lastName: lastName,
      emailAddress: email,
      phoneNumber: phoneNumber,
      role: role,
      enabled: enabled,
      password: "12345678",
    }
    createUser(newTrainer);
    confirmAddTrainer();


  }
  const handleCancel = () => {
    setIsModalVisible(false);
  }

  const updateUserSuccess = () => {
    if (!error.updateUsers) {
      message.info(`Trainer updated succesfully!`);
    }

    if (error.updateUsers) {
      message.error(
        "There has been an error in editing the trainer, try again later!"
      );
    }
  }

  const addFeedback = () => {
    const sender_name = `${currentUser.firstName} ${currentUser.lastName}`;

    const newFeedback = {
      receiver_id: receiver_id,
      sender_id: currentUser._id,
      feedback_text: feedback_text,
      sender_name: sender_name,
      receiver_name: receiver_name,
    };
    setIsModalOpen({
      openModel: false,
    });
    createFeedback(newFeedback);
  };

  return (
    <div className="trainers">
      <Form
        form={form}
      >

        {/* Trainers top section */}
        <div className="trainers-header">
          <Title className="courses-title" level={2}>
            Trainers
          </Title>
          <div className="top-options">
            {/* Adding onclick method to use states defined earlier */}
            <Button type="primary" onClick={showModal} className="customizedButton">Add New Trainer</Button>
            <div className="search">
              <Input.Search
                placeholder="Search trainer"
                style={{ marginBottom: 15, maxWidth: 250 }}
                onSearch={(value) => {
                  setSearchText(value);
                }}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
            </div>
          </div>
          <Modal

            title="Add Trainer"
            open={isModalVisible}
            // buton for add course
            onOk={handleOk}

            //buton for add trainer
            okText="Add Trainer"
            onCancel={handleCancel}
            // onClick={showModal}
            // className="customizedButton"
            footer = {
              <Form.Item shouldUpdate>
                  {() => (
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={handleOk}
                      disabled={
                form.getFieldsError().filter(({ errors }) => errors.length).length
              }
                    >
                      Submit
                    </Button>
                      )}
                  </Form.Item>
            }
          >
            <div className="trainer-add">
              <div className="trainer-content">
                <div className="trainer-left">

                  <Title level={4}>Trainer details</Title>

                  {/* Form for first name */}
                  <Form.Item
                    shouldUpdate
                    // {({ getFieldsValue }) => {
                    //   const { firstName,
                    //     lastName,
                    //     emailAddress,
                    //     phoneNumber } = getFieldsValue();
                    //     const formIsComplete = !!firstName && !!lastName && !!emailAddress && !!phoneNumber;

                    //   }}
                    name="firstName"
                    label="First Name"
                    validateStatus="warning"
                    rules={[
                      {
                        required: true,
                        message: "Please input your first name!",
                      }]}
                    onChange={(e) => setFirstName(e.target.value)}
                  >
                    <Input />
                  </Form.Item>

                  {/* Form for last name */}
                  <Form.Item
                    shouldUpdate
                    name="lastName"
                    label="Last Name"
                    validateStatus="warning"
                    rules={[
                      {
                        required: true,
                        message: "Please input your first name!",
                      }]}
                    onChange={(e) => setLastName(e.target.value)}
                  >
                    <Input />
                  </Form.Item>

                  {/* Form for email validation */}
                  <Form.Item
                    shouldUpdate
                    name="emailAddress"
                    label="Email adress"
                    rules={[
                      {
                        type: "email",
                        required: true,
                        message: "Please write a valid email!",
                      }]}
                    onChange={(e) => setEmail(e.target.value)}
                  >
                    <Input />
                  </Form.Item>


                  <Form.Item
                    shouldUpdate
                    name="phone"
                    label="Phone Number"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your phone number!',
                      },
                    ]}
                  >
                    <Input
                      type="number"
                      addonBefore={prefixSelector}
                      style={{
                        width: '100%',
                      }}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </Form.Item>

                  <Checkbox style={{ marginTop: 8 }} onChange={onChange}>Send email confirmation</Checkbox>
                  
                </div>
              </div>
            </div>
          </Modal>
        </div>

        {/* Trainers table content */}
        <header className="trainers-content">

          {
            window.innerWidth <= 768
              ? <Table
                style={{ maxHeight: 350 }}
                columns={columns}
                dataSource={
                  userList.filter((user) => user.role === "trainer")
                }
              ></Table>
              : window.innerWidth <= 1024
                ? <Table
                  style={{ maxHeight: 450 }}
                  columns={columns}
                  dataSource={
                    userList.filter((user) => user.role === "trainer")
                  }
                ></Table>
                : <Table
                  style={{ maxHeight: 530 }}
                  columns={columns}
                  dataSource={
                    userList.filter((user) => user.role === "trainer")
                  }
                ></Table>
          }

          <Modal
            open={isModalOpen.openModel}
            onCancel={handleCancelDetails}
            footer={
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div><Button type="primary" onClick={addFeedback}>
                  Add feedback
                </Button>
                </div>
                <div className="details-buttons">
                  <Button type="primary" onClick={handleOKDetails}>
                    View profile
                  </Button>
                  <Button style={{ marginInlineStart: 0 }} onClick={handleCancelDetails}>
                    Cancel
                  </Button></div>
              </div>
            }
          >
            {/* Start of the modal where detailas are shown */}
            <div className="student-details">
              <Title level={4} className="title">Trainer details</Title>
              <span>First name</span>
              <Input value={isModalOpen.firstName} />
              <span>Last name</span>
              <Input value={isModalOpen.lastName} />
              <span>Trainer Email address</span>
              <Input type="email" value={isModalOpen.emailAddress} />
              <span>Feedback</span>
              <TextArea 
               onChange={(e) => setFeedbackText(e.target.value)}
               />
            </div>
          </Modal>

          <Modal
            title="Edit Trainer"
            open={isEditing}
            okText="Save edit"
            
            
            onCancel={() => {
              resetEditing();
            }}
            onOk={() => {
              updateUsers(editingTrainer);
              updateUserSuccess();
              findUsers();
              resetEditing();
              // handleEditTrainer();
            }}
          >
            <div className="trainer-edit">
              <div className="trainer-content">
                <div className="trainer-left">
                  <Title level={4}>Trainer details</Title>
                  <span>First name</span>
                  <Input
                    value={editingTrainer?.firstName}
                    onChange={(e) => {
                      setEditingTrainer((pre) => {
                        return { ...pre, firstName: e.target.value };
                      });
                    }}
                  />
                  <span>Last name</span>
                  <Input
                    value={editingTrainer?.lastName}
                    onChange={(e) => {
                      setEditingTrainer((pre) => {
                        return { ...pre, lastName: e.target.value };
                      });
                    }}
                  />
                  <span>Courses</span>
                  <Select
                    mode="multiple"
                    allowClear
                    style={{
                      width: '100%',
                    }}
                    value={editingTrainer?.courses}
                    onChange={(value) => {
                      setEditingTrainer((pre) => {
                        return { ...pre, courses: value };
                      });
                    }}
                  >
                    {/* mapping used to return into table all the values for courses */}
                    {options.map((option, index) => {
                      return <Select.Option key={index} value={option} onChange={(e) => { setCourses(e.target.option) }}></Select.Option>
                    })}
                  </Select>


                  <Form.Item
                    name="Email"
                    label="Email Address"
                    rules={[
                      {
                        type: "email",

                        message: "Please write a valid email!",
                      }]
                    }
                  >
                    <Input
                      value={editingTrainer?.emailAdress}
                      onChange={(e) => {
                        setEditingTrainer((pre) => {
                          return { ...pre, emailAddress: e.target.value };
                        });
                      }}
                    />
                  </Form.Item>

                  <span>Enabled</span>
                  <Select
                    defaultValue={editingTrainer?.enabled}
                    style={{
                      width: 120,
                    }}
                    onChange={(e) => {
                      setEditingTrainer((pre) => {
                        return { ...pre, enabled: e };
                      });
                    }}
                    options={[
                      {
                        value: true,
                        label: 'Enabled',
                      },
                      {
                        value: false,
                        label: 'Disabled',
                      }
                    ]}
                    value={userList.enabled}
                  />
                  <Checkbox style={{ marginTop: 8 }} onChange={onChange}>Send email confirmation</Checkbox>
                </div>
              </div>
            </div>
          </Modal>
        </header>
      </Form>
    </div>
  );
}
//dispatch for Get, Post methods
const mapStateToProps = (state) => {
  return {
    userList: state.user.users,
    currentUser: state.auth.currentUser,
    error: {
      findUsers: state.trainer.findUsers,
      addError: state.trainer.addError,
      editError: state.trainer.updateUser,
      deleteError: state.trainer.deleteError,
      message: state.trainer.errorMessage,
    }
  };
};

const mapDispatchToProps = (dispatch) => ({
  findUsers: () => {
    dispatch(findAllUsers());
  },
  createUser: (user) => {
    dispatch(createUser(user));
  },
  deleteUser: (id, successMessage, failMessage) => {
    dispatch(deleteUser(id, successMessage, failMessage));
  },
  updateUsers: (user, updateSuccess, updateFail) => {
    dispatch(updateUsers(user, updateSuccess, updateFail));
  },
  createFeedback: (feedback) => {
    dispatch(createFeedback(feedback));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Trainers);