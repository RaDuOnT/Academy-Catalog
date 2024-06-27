import "./Students.css";
import {
  Button,
  Table,
  Modal,
  Input,
  Popconfirm,
  Upload,
  Form,
  message,
  Checkbox,
  Select,
  Typography,
  theme
} from "antd";
import { useState, useEffect } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
  PlusOutlined,
  StopOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import studentsData from "../../dummy data/students";
import addStudent from "./Functions/addStudents";
import deleteStudent from "./Functions/deleteStudent";
import TextArea from "antd/es/input/TextArea";
import { Tooltip } from "antd";
import {
  findAllUsers,
  createUser,
  deleteUser,
  updateUser
} from "../../store/actions/userActions";
import { createFeedback } from "../../store/actions/feedbackActions";
import { findAllCourses } from "../../store/actions/courseActions";

const { Title } = Typography;
const { useToken } = theme;
const { Option } = Select;

// Photo Upload
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

// Checkbox Edit Student

function Students({
  userList,
  findUsers,
  createUser,
  deleteUser,
  updateUser,
  error,
  createFeedback,
  currentUser,
  findAllCourses,
  courses
}) {
  let navigate = useNavigate();

  useEffect(() => {
    if (!userList || userList.length === 0) {
      findUsers();
    }

    forceUpdate({});
    if (!courses || courses.length === 0) {
      findAllCourses();
    }
  }, []);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  const { token } = useToken();
  //Modals for student details and add student
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const role = "student";

  const [email, setEmail] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [confirm, setConfirm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState({
    openModel: false,
    firstName: "",
    lastName: "",
    courses: "",
    emailAddress: "",
  });

  const [feedback_text, setFeedbackText] = useState("");
  const [feedback_mark, setFeedbackMark] = useState("");
  const [receiver_id, setReceiverId] = useState("");
  const [receiver_name, setReceiverName] = useState("");
  const [course, setCourse] = useState("");

  const onChange = (e) => {
    if (e.target.checked === true) {
      setConfirm("X");
    }
  };


  const confirmToggle = (record) => {
    let newStatus;
    if (record.enabled) {
      newStatus = false;
    }
    if (!record.enabled) {
      newStatus = true;
    }
    const newRecord = { ...record, enabled: newStatus };
    updateUser(
      newRecord,
      () => {
        message.success(
          `You have ${record.enabled ? "disabled" : "enabled"
          } the trainer called ${record.firstName}!`
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



  const confirmDelete = (firstName, id) => {
    deleteUser(
      id,
      () => {
        message.success(`You have deleted the trainer called ${firstName}!`);
      },
      () => {
        message.error(
          "There has been an error in deleting the course, try again later!"
        );
      }
    );
    findUsers();
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



  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    // DEFINE THE PROPERTIES OF THE NEW STUDENT
    const newStudent = {
      firstName: firstName,
      lastName: lastName,
      emailAddress: email,
      role: role,
      phoneNumber: phoneNumber,
      enabled: enabled,
      password: "12345678",
    };

    createUser(newStudent); // INSERT IT TO DB
    message.info("Student added!")
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOKDetails = () => {
    setIsModalOpen({
      openModel: false,
    });
    navigate("/profile");
  };

  const handleCancelDetails = () => {
    setIsModalOpen({
      openModel: false,
    });
  };

  // Photo Upload
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
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

  //Consts for editing/adding/deleting students
  const [currentId, setCurrentId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editing, setEditing] = useState(null);
  const [dataSource, setDataSource] = useState(userList);
  const [searchedText, setSearchText] = useState("");
  const columns = [

    {
      key: "1",
      title: "First name",
      dataIndex: "firstName",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.firstName).toLowerCase().includes(value.toLowerCase()) ||
          String(record.lastName).toLowerCase().includes(value.toLowerCase()) ||
          String(record.mark).toLowerCase().includes(value.toLowerCase()) ||
          String(record.emailAddress).toLowerCase().includes(value.toLowerCase()) ||
          String(record.enabled).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      key: "2",
      title: "Last name",
      dataIndex: "lastName",
    },
    {
      key: "3",
      title: "Email Address",
      dataIndex: "emailAddress",
    },
    {
      key: "4",
      title: "Mark",
      dataIndex: "mark",
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
                handleEditStudent(record);
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
        return (
          <Button
            type="primary"
            className="customizedButton"
            onClick={() => {
              setReceiverId(record._id);
              setReceiverName(`${record.firstName} ${record.lastName}`);
              setIsModalOpen({
                openModel: true,
                firstName: record.firstName,
                lastName: record.lastName,
                emailAddress: record.emailAddress,
              });
            }}
          >
            Feedback
          </Button>
        );
      },
    },
  ];

  const onDelete = (record) => {
    // deleteStudent(userList, record, deleteStudentAction);
  };

  const onEdit = (record) => {
    setIsEditing(true);
    setEditing({ ...record });
  };


  const handleEditStudent = (record) => {
    setIsEditing(true);
    setEditing({ ...record });
    setCurrentId(record._id);
    
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditing(null);
  };



  const addFeedback = () => {
    const sender_name = `${currentUser.firstName} ${currentUser.lastName}`;
    const newFeedback = {
      receiver_id: receiver_id,
      sender_id: currentUser._id,
      feedback_text: feedback_text,
      feedback_mark: feedback_mark,
      sender_name: sender_name,
      receiver_name: receiver_name,
      course: course,
    };
    setIsModalOpen({
      openModel: false,
    });
    createFeedback(newFeedback);
  };

  return (
    <div className="students">
      <Form
        form={form}
      >
        {/*Students top section*/}
        <div className="students-header">
          <Title className="courses-title" level={2}>
            Students
          </Title>
          <div className="top-options">
            <Button
              type="primary"
              onClick={showModal}
              className="customizedButton"
            >
              Add New Student
            </Button>
            <div className="search">
              <Input.Search
                placeholder="Search student"
                style={{
                  marginBottom: 15, maxWidth: 250,
                  color: token.primaryColor
                }}
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
            title="Add Student"
            open={isModalVisible}
            footer={
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
            <div className="student-add">
              <div className="student-content">
                <div className="student-left">
                  <Title level={4}>Student details</Title>

                  {/* Form for first name */}
                  <Form.Item
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
                </div>
              </div>
            </div>
          </Modal>
        </div>
        {/* Students table content */}
        <header className="students-content">
          {window.innerWidth <= 768 ? (
            <Table
              style={{ maxHeight: 350 }}
              columns={columns}
              dataSource={
                userList.filter((user) => user.role === "student")
              }
            ></Table>
          ) : window.innerWidth <= 1024 ? (
            <Table
              style={{ maxHeight: 450 }}
              columns={columns}
              dataSource={
                userList.filter((user) => user.role === "student")
              }
            ></Table>
          ) : (
            <Table
              style={{ maxHeight: 530 }}
              columns={columns}
              dataSource={
                userList.filter((user) => user.role === "student")
              }
            ></Table>
          )}
          <Modal
            open={isModalOpen.openModel}
            onCancel={handleCancelDetails}
            footer={
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <Button type="primary" onClick={addFeedback} >Add feedback</Button>
                </div>
                <div className="details-buttons">
                  <Button type="primary" onClick={handleOKDetails}>
                    View profile
                  </Button>
                  <Button
                    style={{ marginInlineStart: 0 }}
                    onClick={handleCancelDetails}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            }
          >
            <div className="student-details">
              <span>Course</span>
              <Select
                mode="single"
                allowClear
                style={{
                  width: '100%',
                }}
                onChange={(e) => { setCourse(`Course: ${e}`) }}
              >
                {courses.map((curs, index) => {
                  return <Select.Option key={index} value={curs.name} ></Select.Option>
                })}
              </Select>
              <span>Feedback</span>
              <TextArea
                onChange={(e) => { setFeedbackText(`Feedback: ${e.target.value}`) }}
              />
              <span>Mark</span>
              <Tooltip trigger={['focus']} placement="topLeft" overlayClassName="numeric-input">
                <Input
                  placeholder="Input a mark"
                  maxLength={5}
                  type="number"
                  onChange={(e) => { setFeedbackMark(`Mark: ${e.target.value}`) }}
                />
              </Tooltip>
            </div>
          </Modal>
          <Modal
            title="Edit Student"
            open={isEditing}
            okText="Save edit"
            onCancel={() => {
              resetEditing();
            }}
            onOk={() => {
              handleEditStudent();
              resetEditing();
            }}
          >
            <div className="student-edit">
              <div className="student-content">
                <div className="student-left">
                  <h3>Student details</h3>
                  <span>First name</span>
                  <Input
                    value={editing?.firstName}
                    onChange={(e) => {
                      setEditing((pre) => {
                        return { ...pre, firstName: e.target.value };
                      });
                    }}
                  />
                  <span>Last name</span>
                  <Input
                    value={editing?.lastName}
                    onChange={(e) => {
                      setEditing((pre) => {
                        return { ...pre, lastName: e.target.value };
                      });
                    }}
                  />
                  <span>Email</span>
                  <Input
                    value={editing?.emailAddress}
                    onChange={(e) => {
                      setEditing((pre) => {
                        return { ...pre, emailAddress: e.target.value };
                      });
                    }}
                  />
                  <span>Enabled</span>
                  <Select
                    defaultValue={editing?.enabled}
                    style={{
                      width: 120,
                    }}
                    onChange={(e) => {
                      setEditing((pre) => {
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
                  <Checkbox onChange={onChange}>Send email confirmation</Checkbox>
                </div>
              </div>
            </div>
          </Modal>
        </header>
      </Form>
    </div>
  );
}

// REDUX DISPATCH
const mapStateToProps = (state) => {
  return {
    userList: state.user.users,
    currentUser: state.auth.currentUser,
    courses: state.course.courses,
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
  findAllCourses: () => {
    dispatch(findAllCourses());
  },
  createUser: (user) => {
    dispatch(createUser(user));
  },
  deleteUser: (id, successMessage, failMessage) => {
    dispatch(deleteUser(id, successMessage, failMessage));
  },
  updateUser: (user, updateSuccess, updateFail) => {
    dispatch(updateUser(user, updateSuccess, updateFail));
  },
  createFeedback: (feedback) => {
    dispatch(createFeedback(feedback));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Students);
