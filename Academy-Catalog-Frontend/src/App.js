import "./App.css";
import React from "react";
// import Dashboard from './components/Dashboard';
import MyProfile from "./components/MyProfile";
import Login from "./components/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardContent from "./components/DashboardContent/DashPage";
import Dashboard from "./components/Dashboard";
import Students from "./components/Students";
import Trainers from "./components/Trainers";
import Settings from "./components/Settings";
import Calendar from "./components/Calendar";
import Courses from "./components/courses/Courses/Courses";
import Resources from "./components/Resources/Resources";
import Signup from "./components/Signup";
import Validation from "./components/common/verifyAccount";
import Confirmation from "./components/common/emailConfirmation";
import AccountConfirm from "./components/common/succesAuth";
import { ConfigProvider, theme } from "antd";
import { useEffect } from "react";
import { useNavigate, useRouteError } from "react-router-dom";

const { useToken } = theme;

function App() {
  const { token } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/register") return;
    if (
      !localStorage.getItem("token") ||
      Date.now() < Number(localStorage.getItem("expirationDate"))
    ) {
      navigate("/");
    }
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          slider_bgcolor: "#f25c05",
          primaryColor: "rgb(242, 92, 5)",
          secondaryColor: "#F1C728",
          tertiaryColor: "#E45826",
          quaternaryColor: "#F3D92C",
          blackColor: "#000000",
          whiteColor: "#FFFFFF",
          hoverOnLink: "rgba(170, 62, 0, 0.849)",

          /* Login colors */
          whiteGrayColor: "#DFE0DF",
          whiteGraySecondaryColor: "#F2F3F5",
          blackGrayColor: "#1B1A17",
          errorSecondaryColor: "#880808",
        },
      }}
    >
      <div className="App">
        <Dashboard>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashpage" element={<DashboardContent />} />
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/students" element={<Students />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/emailConfirm/:token" element={<Confirmation />} />
            <Route path="/accValidation" element={<Validation />} />
            <Route path="/authSucces" element={<AccountConfirm />} />
          </Routes>
        </Dashboard>
      </div>
    </ConfigProvider>
  );
}

export default App;
