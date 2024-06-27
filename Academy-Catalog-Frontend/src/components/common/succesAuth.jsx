import "./emailConfirmation.css";
import "./succesAuth.css";
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

function AccountConfirm() {
    return (
        <div className="emailSuccessContainer">
            <div className="emailSuccessText">
                <img src={require('../common/images/IVF.png')} />
                <h1>Account made with succes!</h1>
                <p>Log in and that's all!</p>
                <div className="footerBefore-container-succes">
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
export default AccountConfirm;