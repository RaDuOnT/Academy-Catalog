import React from "react";
import "./style.css";
// import ColorSwitch from "./switch";
import { Switch, Divider, ConfigProvider, theme } from 'antd';


const Settings = ({ setIsDarkMode }) => {
       
                const onChange = (checked) => {
                        ConfigProvider.config({
                                algorithm: theme.darkAlgorithm,
                        })

                        setIsDarkMode(checked);
                };
                return (
                        <div>
                                <Divider>Display</Divider>
                                <div className="flex-row">
                                        <div>Dark mode: </div>
                                        <Switch onChange={onChange} />
                                </div>
                        </div>
                )
        
}


export default Settings;