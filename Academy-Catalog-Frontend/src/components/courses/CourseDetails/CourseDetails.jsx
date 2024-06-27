import React from "react";
import { Button, Modal, Input } from "antd";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;
const { TextArea } = Input;

const CourseDetails = ({ setIsModalVisible, isModalVisible }) => {
  let navigate = useNavigate();

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
  return (
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
  );
};

export default CourseDetails;
