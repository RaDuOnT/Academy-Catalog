import React, { useState } from "react";

import { Modal, Input, message, Select, DatePicker } from "antd";
import { Typography } from "antd";
import dayjs from "dayjs";

const { Title } = Typography;
const { TextArea } = Input;

const dateFormat = "YYYY-MM-DD";
let todayDate = new Date();
const offset = todayDate.getTimezoneOffset();
todayDate = new Date(todayDate.getTime() - offset * 60 * 1000); //current date based on location
let todayDateFormat = todayDate.toISOString().split("T")[0]; // YYYY-MM-DD

const AddCourse = ({
  isModalOpen,
  setIsModalOpen,
  tagOptions,
  addCourse,
  formValidationFields,
  setFormValidationFields,
}) => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [stage, setStage] = useState(1);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([""]);
  const [enabled, setEnabled] = useState(true);
  const [trainerID, setTrainerID] = useState("ceva");
  const [startDate, setStartDate] = useState(todayDateFormat);

  const handleChangeAdd = (value) => {
    setTags(value);
  };
  const handleOk = () => {
    const newCourse = {
      name,
      duration,
      stage,
      description,
      trainerID,
      startDate,
      enabled,
      tags,
    };

    if (
      !formValidationFields.addName ||
      !formValidationFields.addDescription ||
      !formValidationFields.addDuration
    ) {
      return;
    }

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
  const descriptionChangeHandler = (e) => {
    setDescription(e.target.value);
    if (e.target.value.length < 1 || e.target.value.trim() === "") {
      setFormValidationFields((prevState) => {
        return { ...prevState, addDescription: false };
      });
    } else {
      setFormValidationFields((prevState) => {
        return { ...prevState, addDescription: true };
      });
    }
  };

  const nameChangeHandler = (e) => {
    setName(e.target.value);
    if (e.target.value.length < 1 || e.target.value.trim() === "") {
      setFormValidationFields((prevState) => {
        return { ...prevState, addName: false };
      });
    } else {
      setFormValidationFields((prevState) => {
        return { ...prevState, addName: true };
      });
    }
  };

  const durationChangeHandler = (e) => {
    setDuration(e.target.value);
    if (e.target.value.length < 1 || e.target.value.trim() === "") {
      setFormValidationFields((prevState) => {
        return { ...prevState, addDuration: false };
      });
    } else {
      setFormValidationFields((prevState) => {
        return { ...prevState, addDuration: true };
      });
    }
  };

  return (
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
              onChange={nameChangeHandler}
            />
            {!formValidationFields?.addName && (
              <p className="form-validation-error">
                Please fill the name field!
              </p>
            )}
          </div>
          <div className="input-course">
            <Title level={5}>Duration (Hours)</Title>
            <Input
              type="number"
              id="input2"
              placeholder="Duration"
              onChange={durationChangeHandler}
            />
            {!formValidationFields?.addDuration && (
              <p className="form-validation-error">
                Please fill the duration field!
              </p>
            )}
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
            onChange={descriptionChangeHandler}
          />
          {!formValidationFields?.addDescription && (
            <p className="form-validation-error">
              Please fill the description field!
            </p>
          )}
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
            return <Select.Option key={index} value={option}></Select.Option>;
          })}
        </Select>
        <div className="input-course">
          <Title level={5}>Starting date</Title>
          <DatePicker
            value={dayjs(startDate, dateFormat)}
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
  );
};

export default AddCourse;
