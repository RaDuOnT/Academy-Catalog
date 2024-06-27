import React from 'react';
import { Button } from 'antd';
import { Layout } from 'antd';
import './FooterBefore.css';
import { FacebookFilled } from '@ant-design/icons';
import LogoFooter from './LogoFooter';
import { TwitterOutlined } from '@ant-design/icons';
import { InstagramOutlined } from '@ant-design/icons';
import { LinkedinOutlined } from '@ant-design/icons';
import '../Colors/colors.css';
import { useLocation } from "react-router-dom";
const { Footer } = Layout;
const facebook = 'https://www.facebook.com/IVFutureSRL';
const website = 'https://www.ivfuture.ro/';
const twitter = 'https://mobile.twitter.com/ivfuturesrl';
const instragram = 'https://www.instagram.com/ivfuture_ro/?hl=ro';
const linkedin = 'https://ro.linkedin.com/company/iv-future';


function FooterBefore() {
  return (
    <div className="footerBefore-container">
      <Layout>
         <Footer>
            <div className="footerBefore-text">
              <p>© 2022 IVF Academy. All rights reserved.</p>
            </div>
            <div className="footerBefore-icons">
              <Button className='icons-footer' type="text" href={linkedin} target="_blank">
                <LinkedinOutlined />
              </Button>
              <Button className='icons-footer' type="text" href={instragram} target="_blank">
                <InstagramOutlined />
              </Button>
              <Button className='icons-footer' type="text" href={twitter} target="_blank">
                <TwitterOutlined />
              </Button>
              <Button className='icons-footer' type="text" href={facebook} target="_blank">
                <FacebookFilled />
              </Button>
              <Button className='icons-footer' type="text" href={website} target="_blank">
                <LogoFooter className="footer-logo-official" />
              </Button>
            </div>
          </Footer>


      </Layout>
    </div>
  );
};
export default FooterBefore;