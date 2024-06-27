import React from "react";
import "./style.css";
import EditProfile from "./editProfile";
import ModalButton from "./passwordBtn";
import { Collapse } from "antd";
import FeedbackCards from "./Feedback";
import { users } from "../../dummy data/users";

const { Panel } = Collapse;
const ProfileOptions = (currentUser) => (
  <Collapse accordion defaultActiveKey={1}>
    <Panel header="Edit Profile" key="2">
      <EditProfile user={currentUser}/>
    </Panel>
    <Panel header="Change Password" key="3">
      <ModalButton user={currentUser} />
    </Panel>
    <Panel header="Feedback" key="1">
      <FeedbackCards />
    </Panel>
  </Collapse>
);
export default ProfileOptions;
