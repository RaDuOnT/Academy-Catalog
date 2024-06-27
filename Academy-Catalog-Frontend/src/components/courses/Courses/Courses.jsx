import React, { useEffect, useState } from "react";
import "./Courses.css";
import "../../common/Colors/colors.css";
import { Table, Tag, Button, message, Popconfirm } from "antd";

import {
  findAllCourses,
  addCourse,
  editCourse,
  deleteCourse,
  toggleStatusCourse,
} from "../../../store/actions/courseActions";
import { connect } from "react-redux";
import {
  EditOutlined,
  DeleteOutlined,
  StopOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import AddCourse from "../AddCourse/AddCourse";
import EditCourse from "../EditCourse/EditCourse";
import CourseDetails from "../CourseDetails/CourseDetails";
import CourseHeader from "../CourseHeader/CourseHeader";

function Courses({
  coursesList,
  findAllCourses,
  error,
  addCourse,
  editCourse,
  deleteCourse,
  toggleStatusCourse,
}) {
  const [searchedText, setSearchText] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState({
    openModel: false,
    name: "",
    duration: "",
    stage: "",
    description: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const [editedCourse, setEditedCourse] = useState({});
  const [formValidationFields, setFormValidationFields] = useState({
    addName: false,
    addDescription: false,
    addDuration: false,
    editName: true,
    editDescription: true,
    editDuration: true,
  });

  useEffect(() => {
    if (!coursesList || coursesList.length === 0) {
      findAllCourses();
    }
  }, []);

  const showAddModal = () => {
    setIsAddModalOpen(true);
  };

  const onEdit = (record) => {
    setIsEditing(true);
    setEditedCourse(record);
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
                <DeleteOutlined style={{ color: "red", marginLeft: 12 }} />
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

  return (
    <div className="courses-content-container">
      <CourseHeader showAddModal={showAddModal} setSearchText={setSearchText} />
      <AddCourse
        setIsModalOpen={setIsAddModalOpen}
        isModalOpen={isAddModalOpen}
        tagOptions={tagOptions}
        addCourse={addCourse}
        formValidationFields={formValidationFields}
        setFormValidationFields={setFormValidationFields}
      />
      <EditCourse
        editedCourse={editedCourse}
        setEditedCourse={setEditedCourse}
        openEditModal={isEditing}
        setOpenEditModal={setIsEditing}
        tagOptions={tagOptions}
        editCourse={editCourse}
        formValidationFields={formValidationFields}
        setFormValidationFields={setFormValidationFields}
      />
      <div className="courses-content">
        {error.findAllError && (
          <div className="error-message">
            <p>There has been an error in fetching your data</p>
            <p> {error.message}</p>
          </div>
        )}
          <Table columns={columns} dataSource={coursesList}></Table>
       
        <CourseDetails
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
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
