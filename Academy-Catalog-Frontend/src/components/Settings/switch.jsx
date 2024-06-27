import React from "react";
import { Switch, Divider, ConfigProvider, theme } from 'antd';
import "./style.css";


const ColorSwitch = ({setIsDarkMode}) => {
const onChange = (checked) => {
    ConfigProvider.config({
        algorithm: theme.darkAlgorithm,
      })

    setIsDarkMode(checked); 
};
    return(
        <div>
            <Divider>Display</Divider>
            <div className="flex-row">
                <div>Dark mode: </div>
                <Switch onChange={onChange} />
            </div>
        </div>
    )
}

export default ColorSwitch;