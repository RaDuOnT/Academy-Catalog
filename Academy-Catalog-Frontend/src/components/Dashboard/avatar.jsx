import {Avatar} from "antd";
import {Link} from "react-router-dom";
import {UserOutlined} from "@ant-design/icons";
import "../common/Colors/colors.css";
import "./avatar.css";

const AvatarPopupContent = ({userName, email, link, signout}) => {
    return(<div className="avt-pop-content">
    <div className="avt-pop-account">
      <Avatar
        size={"large"}
        shape="circle"
        icon={<UserOutlined />}
        className="avatar"
      />
      <div className="account-info">
        <p className="account-name">{userName}</p>
        <p className="account-email">
          <a>{email}</a>
        </p>
      </div>
    </div>
    <hr />
    <div className="popup-buttons">
      <a onClick={link}>
        <Link to={"/profile"}>My Profile</Link>
      </a>
      <a onClick={link}>
        <Link to={"/settings"}>Settings</Link>
      </a>
      <a onClick={signout}>
        <Link>Sign out</Link>
      </a>
    </div>
  </div>)
}



export default AvatarPopupContent;