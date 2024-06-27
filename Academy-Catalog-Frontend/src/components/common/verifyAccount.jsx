import "./emailConfirmation.css";
import "../common/Colors/colors.css";
import React from 'react';
import { FacebookFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { Layout } from 'antd';
import { TwitterOutlined } from '@ant-design/icons';
import { InstagramOutlined } from '@ant-design/icons';
import { LinkedinOutlined } from '@ant-design/icons';

const { Footer } = Layout;
const facebook = 'https://www.facebook.com/IVFutureSRL';
const website = 'https://www.ivfuture.ro/';
const twitter = 'https://mobile.twitter.com/ivfuturesrl';
const instragram = 'https://www.instagram.com/ivfuture_ro/?hl=ro';
const linkedin = 'https://ro.linkedin.com/company/iv-future';

function Validation() {
    return (
        <div className="emailConfirmContainer">

            <div className="emailConfirmText">
                <img src={require('../common/images/IVF.png')} />
                <h1>Check your email!</h1>
                <p>Please confirm that you want to use this as your mail address. After receiving
                    the email follow the link provided to complete your registration.
                </p>
                <p>If you did not sign for this account you can ignore this email.</p>
                <div className="footerBefore-container-verify">
                    <p>Stay in touch!</p>
                    <Button className='icons-footer-verify' type="text" href={linkedin} target="_blank">
                        <LinkedinOutlined />
                    </Button>
                    <Button className='icons-footer-verify' type="text" href={instragram} target="_blank">
                        <InstagramOutlined />
                    </Button>
                    <Button className='icons-footer-verify' type="text" href={twitter} target="_blank">
                        <TwitterOutlined />
                    </Button>
                    <Button className='icons-footer-verify' type="text" href={facebook} target="_blank">
                        <FacebookFilled />
                    </Button>
                </div>

            </div>
        </div>
    )
}
export default Validation;