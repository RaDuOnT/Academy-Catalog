import React from "react";
import { Button, Input, Select } from "antd";
import { Typography } from "antd";

const { Title } = Typography;

const CourseHeader = ({ showAddModal, setSearchText, onStatusChange }) => {
  return (
    <div className="courses-header">
      <Title className="courses-title" level={2}>
        Courses
      </Title>
      <div className="top-options">
        <Button className="addBtn" onClick={showAddModal}>
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
      </div>
    </div>
  );
};

export default CourseHeader;
