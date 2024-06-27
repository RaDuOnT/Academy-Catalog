import React from "react";
import { Dropdown, Space } from "antd";
import "./style.css";
const onMenuClick = (e) => {
  
};
const items = [
  {
    key: "1",
    label: "Go to it",
  },
  {
    key: "2",
    label: "Delete",
  },
  {
    key: "3",
    label: "Mark as read",
  },
];
const Notifications = (props) => (
  <Space direction="vertical" className="space">
    <Dropdown.Button
      menu={{
        items,
        onClick: onMenuClick,
      }}
      className="notifications-button"
    >
      <div className="main-btn">
        {props.icon}
        {props.title}
      </div>
    </Dropdown.Button>
  </Space>
);
export default Notifications;
