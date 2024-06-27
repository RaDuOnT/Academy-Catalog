
import React from "react";
import { Layout, Divider, Avatar, Button } from "antd";
import {
  AntDesignOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

function DashboardCardTrainers() {
    const navigate = useNavigate();
  return (
    <Content className="online-trainers">
      <div className="header">
        <Divider orientation="left" style={{ margin: 0 }}>
          Your trainers <span style={{ color: "#F25C05" }}> (3)</span>
        </Divider>
        <div className="list">
          <div className="trainer">
            <Avatar icon={<AntDesignOutlined />}></Avatar>
            Petrica jr.
          </div>
          <div className="trainer">
            <Avatar icon={<AntDesignOutlined />}></Avatar>
            Petrica jr.
          </div>
          <div className="trainer">
            <Avatar icon={<AntDesignOutlined />}></Avatar>
            Petrica jr.
          </div>
        </div>
        <div className="go-to-btn">
          <Divider orientation="right">
            <Button type="dashed" onClick={() => navigate("/trainers")}>
              See more
            </Button>
          </Divider>
        </div>
      </div>
    </Content>
  );
}

export default DashboardCardTrainers;