/* eslint-disable no-sparse-arrays */
import React, { useEffect, useState } from "react";
import "./Courses.css";
import "../common/Colors/colors.css";
import {
  Table,
  Tag,
  Button,
  Modal,
  Input,
  message,
  Popconfirm,
  Select,
  DatePicker,
} from "antd";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import {
  findAllCourses,
  addCourse,
  editCourse,
  deleteCourse,
  toggleStatusCourse,
} from "../../store/actions/courseActions";
import { connect } from "react-redux";
import {
  EditOutlined,
  DeleteOutlined,
  StopOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
const { Title } = Typography;
const { TextArea } = Input;

function Courses({
  coursesList,
  findAllCourses,
  error,
  addCourse,
  editCourse,
  deleteCourse,
  toggleError,
  toggleStatusCourse,
  addCourseStatus,
}) {
  const [searchedText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState({
    openModel: false,
    name: "",
    duration: "",
    stage: "",
    description: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [stage, setStage] = useState(1);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([""]);
  const [enabled, setEnabled] = useState(true);
  const [trainerId, setTrainerId] = useState("ceva");
  const [startDate, setStartDate] = useState(new Date().toISOString());
  const [editedCourse, setEditedCourse] = useState({});
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  
  useEffect(() => {
    if (!coursesList || coursesList.length === 0) {
      findAllCourses();
    }
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const newCourse = {
      name: name,
      duration: duration,
      stage: stage,
      description: description,
      trainerID: trainerId,
      startDate: startDate,
      enabled: enabled,
      tags: tags,
    };
    addCourse(
      newCourse,
      () => {
        message.success("You have added a course!");
      },
      () => {
        message.error(
          "There has been an error in adding the course, try again later!"
        );
      }
    );

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancelDetails = () => {
    setIsModalVisible({
      openModel: false,
    });
  };

  const handleOKDetails = () => {
    setIsModalVisible({
      openModel: false,
    });
    navigate("/resources");
  };

  const onDelete = (record) => {};

  const onEdit = (record) => {
    setIsEditing(true);
    setEditedCourse(record);
  };

  const handleEditCourse = () => {
    editCourse(
      editedCourse,
      () => {
        message.success("You have edited the course!");
      },
      () => {
        message.error(
          "There has been an error in editing the course, try again later!"
        );
      }
    );
  };

  const confirmDelete = (name, id) => {
    deleteCourse(
      id,
      () => {
        message.success(`You have deleted the course called ${name}!`);
      },
      () => {
        message.error(
          "There has been an error in deleting the course, try again later!"
        );
      }
    );
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
    toggleStatusCourse(
      newRecord,
      () => {
        message.success(
          `You have ${
            record.enabled ? "disabled" : "enabled"
          } the course called ${record.name}!`
        );
      },
      () => {
        message.error(
          "There has been an error in toggling the course, try again later!"
        );
      }
    );
  };

  const onStatusChange = (value) => {};
  const onStatusSearch = (value) => {};

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };

  const tagOptions = [
    "NodeJS",
    "FeathersJS",
    "MongoDB",
    "Laravel",
    "MySQL",
    "HTML",
    "CSS",
    "Javascript",
    "Ant Design",
    "Typescript",
    "MobX",
    "Nest JS",
  ];
  const dateFormat = "YYYY-MM-DD";

  let todayDate = new Date();
  const offset = todayDate.getTimezoneOffset();
  todayDate = new Date(todayDate.getTime() - offset * 60 * 1000); //current date based on location
  let todayDateFormat = todayDate.toISOString().split("T")[0]; // YYYY-MM-DD

  const handleChangeAdd = (value) => {
    setTags(value);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record?.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record?.stage).toLowerCase().includes(value.toLowerCase()) ||
          String(record?.duration)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record?.tags).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: "Stage",
      dataIndex: "stage",
      key: "stage",
    },
    {
      title: "Duration (hours)",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Technologies",
      dataIndex: "tags",
      key: "tags",
      render: (tags) => (
        <>
          {tags?.map((tag) => (
            <Tag color="#f25c05d1" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    ,
    {
      title: "Status",
      dataIndex: "enabled",
      filters: [
        {
          text: "Enabled",
          value: true,
        },
        {
          text: "Disabled",
          value: false,
        },
      ],
      onFilter: (value, record) => {
        if (record.enabled === value) {
        }
      },
      render: (record) => {
        return <>{record ? "enabled" : "disabled"}</>;
      },
    },
    {
      key: "actions",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEdit(record);
              }}
            />
            <Popconfirm
              placement="top"
              title={`Are you sure you want to ${
                record.enabled ? "disable" : "enable"
              } this course?`}
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
                title="Are you sure you want to delete this course?"
                onConfirm={() => confirmDelete(record.name, record._id)}
                okText="Yes"
                okType="danger"
                cancelText="No"
              >
                <DeleteOutlined
                  onClick={() => {
                    onDelete(record);
                  }}
                  style={{ color: "red", marginLeft: 12 }}
                />
              </Popconfirm>
            )}
          </>
        );
      },
    },
    {
      className: "actions",
      title: "Details",
      key: "action",
      render: (record) => {
        return (
          <Button
            type="primary"
            className="customizedButton"
            onClick={() => {
              setIsModalVisible({
                openModel: true,
                name: record.name,
                duration: record.duration,
                stage: record.stage,
                description: record.description,
              });
            }}
          >
            Details
          </Button>
        );
      },
    },
  ];
  let navigate = useNavigate();
  return (
    <div className="courses-content-container">
      <div className="courses-header">
        <Title className="courses-title" level={2}>
          Courses
        </Title>
        <div className="top-options">
          <Button className="addBtn" onClick={showModal}>
            Add new course
          </Button>
          <div className="search">
            <Input.Search
              placeholder="Search course"
              onSearch={(value) => {
                setSearchText(value);
              }}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
          </div>
          <Select
            showSearch
            placeholder="Select the status"
            optionFilterProp="children"
            onChange={onStatusChange}
            onSearch={onStatusSearch}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: true,
                label: "Enabled",
              },
              {
                value: false,
                label: "Disabled",
              },
              {
                value: "all",
                label: "All",
              },
            ]}
          />
        </div>

        <Modal
          title="Add new course"
          open={isModalOpen}
          onOk={handleOk}
          okText={"Add course"}
          onCancel={handleCancel}
        >
          <hr className="add-new-course-hr"></hr>
          <div className="courses-modal-content">
            <div className="inputs">
              <div className="input-course">
                <Title level={5}>Name</Title>
                <Input
                  id="input1"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-course">
                <Title level={5}>Duration</Title>
                <Input
                  id="input2"
                  placeholder="Duration"
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              <div className="input-course">
                <Title level={5}>Stage</Title>

                <Select
                  defaultValue={1}
                  style={{
                    width: 120,
                  }}
                  onChange={(value) => {
                    setStage(value);
                  }}
                  options={[
                    {
                      value: 1,
                      label: "1",
                    },
                    {
                      value: 2,
                      label: "2",
                    },
                    {
                      value: 3,
                      label: "3",
                    },
                  ]}
                />
              </div>
            </div>
            <div className="input-course">
              <Title level={5}>Description</Title>
              <TextArea
                rows={4}
                placeholder="Add description here"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <Title level={5}>Tags</Title>
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Tags"
              onChange={handleChangeAdd}
            >
              {tagOptions.map((option, index) => {
                return (
                  <Select.Option key={index} value={option}></Select.Option>
                );
              })}
            </Select>
            <div className="input-course">
              <Title level={5}>Starting date</Title>
              <DatePicker
                value={dayjs(todayDateFormat, dateFormat)}
                onChange={(date, dateString) => setStartDate(dateString)}
              />
            </div>
            <div className="input-course">
              <Title level={5}>Enabled status</Title>
              <Select
                defaultValue={true}
                style={{
                  width: 120,
                }}
                onChange={(value) => {
                  setEnabled(value);
                }}
                options={[
                  {
                    value: true,
                    label: "Enabled",
                  },
                  {
                    value: false,
                    label: "Disabled",
                  },
                ]}
              />
            </div>
          </div>
        </Modal>
      </div>
      <div className="courses-content">
        {error.findAllError && (
          <div className="error-message">
            <p>There has been an error in fetching your data</p>
            <p> {error.message}</p>
          </div>
        )}
        {window.innerWidth <= 768 ? (
          <Table columns={columns} dataSource={coursesList}></Table>
        ) : window.innerWidth <= 1024 ? (
          <Table columns={columns} dataSource={coursesList}></Table>
        ) : (
          <Table columns={columns} dataSource={coursesList}></Table>
        )}
        <Modal
          open={isModalVisible.openModel}
          onCancel={handleCancelDetails}
          footer={
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div className="details-buttons">
                <Button type="primary" onClick={handleOKDetails}>
                  View resources
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
          <div className="course-details">
            <Title level={4} className="title">
              Course details
            </Title>
            <span>Course name</span>
            <Input value={isModalVisible.name} />
            <span>Stage</span>
            <Input value={isModalVisible.stage} />
            <span>Course duration</span>
            <Input value={isModalVisible.duration} />
            <span>Description</span>
            <TextArea value={isModalVisible.description} />
          </div>
        </Modal>
        <Modal
          title="Edit Student"
          open={isEditing}
          okText="Save edit"
          onCancel={() => {
            setIsEditing(false);
          }}
          onOk={() => {
            handleEditCourse();
            setIsEditing(false);
          }}
        >
          <div className="course-details">
            <Title level={4} className="title">
              Course details
            </Title>
            <span>Course name</span>
            <Input
              value={editedCourse.name}
              onChange={(e) => {
                setEditedCourse((prevCourse) => {
                  return { ...prevCourse, name: e.target.value };
                });
              }}
            />
            <span>Stage</span>

            <Select
              defaultValue={1}
              style={{
                width: 120,
              }}
              onChange={(value) => {
                setEditedCourse((prevCourse) => {
                  return { ...prevCourse, stage: value };
                });
              }}
              options={[
                {
                  value: 1,
                  label: "1",
                },
                {
                  value: 2,
                  label: "2",
                },
                {
                  value: 3,
                  label: "3",
                },
              ]}
            />
            <span>Course duration</span>
            <Input
              type="number"
              value={editedCourse.duration}
              onChange={(e) => {
                setEditedCourse((prevCourse) => {
                  return { ...prevCourse, duration: e.target.value };
                });
              }}
            />
            <span>Description</span>
            <TextArea
              value={editedCourse.description}
              onChange={(e) => {
                setEditedCourse((prevCourse) => {
                  return { ...prevCourse, description: e.target.value };
                });
              }}
            />
            <Title level={5}>Tags</Title>
            <div className="input-course">
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Tags"
                onChange={(value) => {
                  setEditedCourse((prevCourse) => {
                    return { ...prevCourse, tags: value };
                  });
                }}
                defaultValue={editedCourse.tags}
              >
                {tagOptions.map((option, index) => {
                  return (
                    <Select.Option key={index} value={option}></Select.Option>
                  );
                })}
              </Select>
            </div>
            <div className="input-course">
              <Title level={5}>Starting date</Title>
              <DatePicker
                value={dayjs(editedCourse.startDate, dateFormat)}
                format={dateFormat}
                onChange={(date, dateString) => {
                  setEditedCourse((prevCourse) => {
                    return { ...prevCourse, startDate: dateString };
                  });
                }}
              />
            </div>
            <div className="input-course">
              <Title level={5}>Enabled status</Title>
              <Select
                defaultValue={editedCourse.enabled}
                style={{
                  width: "100%",
                }}
                onChange={(value) => {
                  setEditedCourse((prevCourse) => {
                    return { ...prevCourse, enabled: value };
                  });
                }}
                options={[
                  {
                    value: true,
                    label: "Enabled",
                  },
                  {
                    value: false,
                    label: "Disabled",
                  },
                ]}
              />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    coursesList: state.course.courses,
    error: {
      findAllError: state.course.findAllError,
      addError: state.course.addError,
      editError: state.course.editError,
      deleteError: state.course.deleteError,
      toggleError: state.course.toggleError,
      message: state.course.errorMessage,
    },
    addCourseStatus: state.course.addCourseActionCompleted,
  };
};

const mapDispatchToProps = (dispatch) => ({
  findAllCourses: () => {
    dispatch(findAllCourses());
  },
  addCourse: (course, successFunction, failFunction) => {
    dispatch(addCourse(course, successFunction, failFunction));
  },
  editCourse: (course, successFunction, failFunction) => {
    dispatch(editCourse(course, successFunction, failFunction));
  },
  deleteCourse: (id, successFunction, failFunction) => {
    dispatch(deleteCourse(id, successFunction, failFunction));
  },
  toggleStatusCourse: (course, successFunction, failFunction) => {
    dispatch(toggleStatusCourse(course, successFunction, failFunction));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
