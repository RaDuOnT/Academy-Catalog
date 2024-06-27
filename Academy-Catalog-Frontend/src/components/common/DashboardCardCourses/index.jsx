
import React from "react";
import { Layout, Divider, Avatar, Button } from "antd";
import {
  AntDesignOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

function DashboardCardCourses() {
    const navigate = useNavigate();
  return (
    <Content className="added-courses">
      <div className="header">
        <Divider orientation="left" style={{ margin: 0 }}>
          Your courses<span style={{ color: "#F25C05" }}> (5)</span>
        </Divider>
        <div className="list">
          <div className="course">
            ReactJS <span style={{fontSize:"16px", color:"#f25c05"}}> added by X</span>
          </div>
          <div className="course">
            Ant Design <span style={{fontSize:"16px", color:"#f25c05"}}> added by X</span>
          </div>
          <div className="course">
            NextJS <span style={{fontSize:"16px", color:"#f25c05"}}> added by X</span>
          </div>
          <div className="course">
            Angular <span style={{fontSize:"16px", color:"#f25c05"}}> added by X</span>
          </div>
          <div className="course">
            Laravel <span style={{fontSize:"16px", color:"#f25c05"}}> added by X</span>
          </div>
        </div>
        <div className="go-to-btn">
          <Divider orientation="right">
            <Button type="dashed" onClick={() => navigate("/Courses")}>
              See more
            </Button>
          </Divider>
        </div>
      </div>
    </Content>
  );
}

export default DashboardCardCourses;