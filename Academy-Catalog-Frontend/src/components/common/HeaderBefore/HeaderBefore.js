import headerBeforeImage from './headerImages/IVF Academy Logo Main Wide.png';
import React from 'react';
import { Layout, Switch } from 'antd';
import './HeaderBefore.css';
import '../Colors/colors.css';
const { Header} = Layout;
const onChange = (checked) => {
  
};


function HeaderBefore() {
  return (
    <div className="headerBefore-container">
    <Layout>
      <Header>
        <div className="logo">
          <img src={headerBeforeImage} alt="logo"></img>
        </div>
        <div className="switch">
          <Switch defaultChecked onChange={onChange} />
        </div>

      </Header>
    </Layout>
    </div>
  );
};
export default HeaderBefore;