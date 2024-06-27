import React from "react";
import { Modal, Input, message, Select, DatePicker } from "antd";
import { Typography } from "antd";
import dayjs from "dayjs";

const { Title } = Typography;
const { TextArea } = Input;

const EditCourse = ({
  openEditModal,
  setOpenEditModal,
  editedCourse,
  setEditedCourse,
  tagOptions,
  editCourse,
  formValidationFields,
  setFormValidationFields,
}) => {
  const handleEditCourse = () => {
    if (
      !formValidationFields.editName ||
      !formValidationFields.editDescription ||
      !formValidationFields.editDuration
    ) {
      return;
    }

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
    setOpenEditModal(false);
  };

  const descriptionChangeHandler = (e) => {
    setEditedCourse((prevCourse) => {
      return { ...prevCourse, description: e.target.value };
    });
    if (e.target.value.length < 1 || e.target.value.trim() === "") {
      setFormValidationFields((prevState) => {
        return { ...prevState, editDescription: false };
      });
    } else {
      setFormValidationFields((prevState) => {
        return { ...prevState, editDescription: true };
      });
    }
  };

  const nameChangeHandler = (e) => {
    setEditedCourse((prevCourse) => {
      return { ...prevCourse, name: e.target.value };
    });

    if (e.target.value.length < 1 || e.target.value.trim() === "") {
      setFormValidationFields((prevState) => {
        return { ...prevState, editName: false };
      });
    } else {
      setFormValidationFields((prevState) => {
        return { ...prevState, editName: true };
      });
    }
  };

  const durationChangeHandler = (e) => {
    setEditedCourse((prevCourse) => {
      return { ...prevCourse, duration: e.target.value };
    });

    if (e.target.value.length < 1 || e.target.value.trim() === "") {
      setFormValidationFields((prevState) => {
        return { ...prevState, editDuration: false };
      });
    } else {
      setFormValidationFields((prevState) => {
        return { ...prevState, editDuration: true };
      });
    }
  };
  const dateFormat = "YYYY-MM-DD";

  let todayDate = new Date();
  const offset = todayDate.getTimezoneOffset();
  todayDate = new Date(todayDate.getTime() - offset * 60 * 1000); //current date based on location

  return (
    <Modal
      title="Edit Student"
      open={openEditModal}
      okText="Save edit"
      onCancel={() => {
        setOpenEditModal(false);
      }}
      onOk={() => {
        handleEditCourse();
      }}
    >
      <div className="course-details">
        <Title level={4} className="title">
          Course details
        </Title>
        <span>Course name</span>
        <Input value={editedCourse.name} onChange={nameChangeHandler} />
        {!formValidationFields?.editName && (
          <p className="form-validation-error">
            Please fill the description field!
          </p>
        )}
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
        <span>Course duration (hours)</span>
        <Input
          type="number"
          value={editedCourse.duration}
          onChange={durationChangeHandler}
        />
        {!formValidationFields?.editDuration && (
          <p className="form-validation-error">
            Please fill the duration field!
          </p>
        )}
        <span>Description</span>
        <TextArea
          value={editedCourse.description}
          onChange={descriptionChangeHandler}
        />
        {!formValidationFields?.editDescription && (
          <p className="form-validation-error">
            Please fill the description field!
          </p>
        )}
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
              return <Select.Option key={index} value={option}></Select.Option>;
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
  );
};

export default EditCourse;
