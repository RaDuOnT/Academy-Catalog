import React, { useState } from "react";
import Logo from "../Dashboard/logo";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ContactsOutlined,
  UserOutlined,
  SolutionOutlined,
  ReadOutlined,
  CalendarOutlined,
  ContainerOutlined,
  HomeOutlined,
  BellOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Avatar, Badge, Popover, ConfigProvider, Drawer, theme } from "antd";
import "../Dashboard/style.css";
import Notifications from "../common/Notification";
import notification_items from "../../dummy data/notifications";
import { useLocation, useNavigate } from "react-router-dom";
import AvatarPopupContent from "./avatar";
import {
  findAllUsers
} from "../../store/actions/userActions";
import { connect } from "react-redux";
import { useEffect } from "react";
import Settings from "../Settings";


const { Header, Sider } = Layout;
const { defaultAlgorithm, darkAlgorithm } = theme;


//valori din dummy data
let counter = notification_items.length;

const Dashboard = ({userList, findUsers, children, currentUser }) => {

  useEffect(() => {
    if (!userList || userList.length === 0) {
      findUsers();
    }
  }, [userList]);

  

  const navigate = useNavigate();
  let [collapsed, setCollapsed] = useState(false);
  const Signout = () => {
      const userToken = localStorage.getItem("token");
      if (userToken) {
        localStorage.clear("token");
        localStorage.clear("expirationDate");
        setOpen(false);
        navigate("/");
      }
    };
    
  // function for avatar popover on click
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  // function for notification drawer on click
  const [opennotif, setOpennotif] = useState(false);
  const showDrawer = (checked) => {
    setOpennotif(true);
    counter = 0;
  };
  const onClose = () => {
    setOpennotif(false);
  };

  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();


  if (location.pathname === "/" || location.pathname === "/register") {

    return(
      <ConfigProvider
      theme={{algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm}}
      style={{overflow:"scroll"}}
    > {children}
      </ConfigProvider>

    )

    
  }

  return (
    <ConfigProvider
    theme={{algorithm : isDarkMode ? darkAlgorithm : defaultAlgorithm}}
  >
    <div className="dashboard" style={{ height: "100vh" }}>
      <Layout style={{ height: "100%" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={160}
          style={{
            background: "#f25c05",
            color: "white",
          }}
          className="slider"
        >
          <div className="logo-container">
            <Menu
              theme=""
              mode="inline"
              items={[
                {
                  key: "1",
                  icon: <Logo />,
                  label: "AFF",
                },
              ]}
              style={{
                background: "#f25c05",
                pointerEvents: "none",
                color: "white",
              }}
              className="menu-dashboard-logo"
            />
          </div>
          <Menu
            onClick={({ key }) => {
              navigate(key);
            }}
            theme=""
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
          
            items={[
              {
                key: "/dashpage",
                icon: <HomeOutlined />,
                label: "Dashboard",
              },
              {
                key: "/trainers",
                icon: <ContactsOutlined />,
                label: "Trainers",
              },
              {
                key: "/students",
                icon: <SolutionOutlined />,
                label: "Students",
              },
              {
                key: "/courses",
                icon: <ReadOutlined />,
                label: "Courses",
              },
              {
                key: "/resources",
                icon: <ContainerOutlined />,
                label: "Resources",
              },
              {
                key: "/calendar",
                icon: <CalendarOutlined />,
                label: "Calendar",
              },
              {
                key: "/settings",
                icon: <SettingOutlined />,
                label: "Settings",
              },
            ]}
            className="menu-dashboard-slider" 
            
          />
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => {setCollapsed(!collapsed)},
              style: {
                width: "100%",
                margin: "0 auto",
                fontSize: "30px",
                
              },
            }
          )}
        </Sider>

        <Layout className="site-layout">
          <Header className="header-bar" style={{ background: "white" }}>
            <div className="right-side">
              <div className="notif-btn" onClick={showDrawer}>
                <Badge count={counter} size="small" className="bell-badge">
                  <BellOutlined className="bell-icon" />
                </Badge>
              </div>
              <Drawer
                title="Notifications"
                placement="right"
                onClose={onClose}
                open={opennotif}
              >
                {notification_items.map(item => {
                return <Notifications
                    key={item}
                    title={item.title}
                    icon={item.icon}
                />
            } )}
              </Drawer>
              <div className="account">
                <div className="user-account-name">
                  {
                    currentUser.firstName === undefined 
                    ? <p></p> 
                    : <p>{`${currentUser.firstName} ${currentUser.lastName}`}</p>
                  }

                <p>{currentUser.emailAddress}</p>
              </div>
              <Popover
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
                placement="topLeft"
                content={()=><AvatarPopupContent link={hide} userName={currentUser.firstName+ " " + currentUser.lastName} email={currentUser.emailAddress} signout={Signout} />}
              >
                <Avatar
                  shape="circle"
                  size="large"
                  icon={<UserOutlined />}
                  className="avatar"
                />
              </Popover>
              </div>
              
            </div>
          </Header>
          {children}
        </Layout>
      </Layout>
    </div>
    </ConfigProvider>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
