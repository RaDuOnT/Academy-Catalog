import "./emailConfirmation.css";
import "../common/Colors/colors.css";
import React from "react";
import { FacebookFilled } from "@ant-design/icons";
import { Button } from "antd";
import { Layout } from "antd";
import { TwitterOutlined } from "@ant-design/icons";
import { InstagramOutlined } from "@ant-design/icons";
import { LinkedinOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";

const { Footer } = Layout;
const facebook = "https://www.facebook.com/IVFutureSRL";
const website = "https://www.ivfuture.ro/";
const twitter = "https://mobile.twitter.com/ivfuturesrl";
const instragram = "https://www.instagram.com/ivfuture_ro/?hl=ro";
const linkedin = "https://ro.linkedin.com/company/iv-future";

function Confirmation() {
  let { token } = useParams();
  const navigate = useNavigate();

  const confirmEmailHandler = async () => {
    try {
      const body = {
        action: "verifySignupLong",
        value: token,
      };
      const result = await fetch("http://localhost:3030/auth-management", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (result.ok) {
        navigate("/authSucces");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="emailConfirmContainer">
      <div className="emailConfirmText">
        <img src={require("../common/images/IVF.png")} />
        <h1>Thank you for signing in!</h1>
        <p id="verify">Verify your account.</p>
        <p>
          Please confirm that you want to use this as your mail address by
          clicking the button below this message.
        </p>
        <button onClick={confirmEmailHandler} className="confirmBtn">
          Verify your account here!
        </button>
        <div className="footerBefore-container-verify">
          <p>Stay in touch!</p>
          <Button
            className="icons-footer"
            type="text"
            href={linkedin}
            target="_blank"
          >
            <LinkedinOutlined />
          </Button>
          <Button
            className="icons-footer"
            type="text"
            href={instragram}
            target="_blank"
          >
            <InstagramOutlined />
          </Button>
          <Button
            className="icons-footer"
            type="text"
            href={twitter}
            target="_blank"
          >
            <TwitterOutlined />
          </Button>
          <Button
            className="icons-footer"
            type="text"
            href={facebook}
            target="_blank"
          >
            <FacebookFilled />
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Confirmation;
