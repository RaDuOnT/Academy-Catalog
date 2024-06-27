import React from "react";
import "./index.css";
import { Layout, ConfigProvider } from "antd";
import DashboardCardTrainers from "../../common/DashboardCardTrainers";
import DashboardCardCourses from "../../common/DashboardCardCourses";
import {
  findAllUsers
} from "../../../store/actions/userActions";
import { connect } from "react-redux";
import { useEffect } from "react";
const { Content } = Layout;

const DashPage = ({userList ,findUsers, currentUser}) => {
  useEffect(() => {
    if (!userList || userList.length === 0) {
      findUsers();
    }
  }, [userList]);

  if(!userList || userList.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dash-page">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#F25C05",
            colorSecondary: "#F25C05",
            colorPrimaryHover: "#F25C05",
          },
        }}
      >
          <div className="column">
            <Content className="hello-dashpage">
              <div className="account">
                Hello, <span> {currentUser?.firstName + " " + currentUser?.lastName }</span>!
              </div>
            </Content>
            <DashboardCardTrainers />
          </div>
        <DashboardCardCourses />
      </ConfigProvider>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userList: state.user.users,
    currentUser: state.auth.currentUser
  };
};

const mapDispatchToProps = (dispatch) => ({
  findUsers: () => {
    dispatch(findAllUsers());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DashPage);