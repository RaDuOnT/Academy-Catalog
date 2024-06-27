import React from 'react';
import { Badge, Calendar, Modal } from 'antd';
import { Typography } from 'antd';
import './style.css'
import '../common/Colors/colors.css'
import { camelCase } from 'lodash';

const { Title } = Typography;

//The content shown in each calendar day
const getListData = (value) => {
    let listData;
    switch (value.date()) {
        case 5: listData = [
            {
                type: 'warning',
                content: 'React'
            }, {
                type: 'warning',
                content: 'FeathersJS'
            },
        ];
            break;
        case 6: listData = [
            {
                type: 'warning',
                content: 'React'
            }, {
                type: 'warning',
                content: 'FeathersJS'
            },
        ];
            break;
        case 7: listData = [
            {
                type: 'warning',
                content: 'React'
            }, {
                type: 'warning',
                content: 'FeathersJS'
            },
        ];
            break;
        case 8: listData = [
            {
                type: 'warning',
                content: 'React'
            }, {
                type: 'warning',
                content: 'FeathersJS'
            },
        ];
            break;
        case 9: listData = [
            {
                type: 'warning',
                content: 'React'
            }, {
                type: 'warning',
                content: 'FeathersJS'
            },
        ];
            break;
        case 12: listData = [
            {
                type: 'warning',
                content: 'React'
            }, {
                type: 'warning',
                content: 'MongoDB'
            },
        ];
            break;
        case 13: listData = [
            {
                type: 'warning',
                content: 'React'
            }, {
                type: 'warning',
                content: 'MongoDB'
            },
        ];
            break;
        case 14: listData = [
            {
                type: 'warning',
                content: 'React'
            }, {
                type: 'warning',
                content: 'MongoDB'
            },
        ];
            break;
        case 15: listData = [
            {
                type: 'warning',
                content: 'React'
            }, {
                type: 'warning',
                content: 'MongoDB'
            },
        ];
            break;
        case 16: listData = [
            {
                type: 'warning',
                content: 'React'
            }, {
                type: 'warning',
                content: 'MongoDB'
            },
        ];
            break;

        default:
    }
    return listData || [];
};

//Return course list for each month
const getMonthData = (value) => {
    let i = value.month();
    for (i = 0; i <= 11; i++) {
        {
            return [];
        }
    };
}
//The modal that opens when the user clicks on any day/month/year
const info = () => {
    Modal.info({
        title: 'Your courses for *date* :',
        content: (
            <div>
                <p>Course 1</p>
                <p>Course 2</p>
            </div>
        ),
        onOk() {
        },
    });
};

//
const Calendars = () => {
    // const onPanelChange = (value, mode) => {
    //     
    // };

    const monthCellRender = (value) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                {/* <section>{num}</section> */}
                <span>Courses for *month* : </span>
            </div>
        ) : null;
    };

    //Show the events/courses for each calendar day
    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {
                    listData.map((item) => (
                        <li key={
                            item.content
                        }>
                            <Badge status={
                                item.type
                            }
                                text={
                                    item.content
                                }
                            />
                        </li>
                    ))
                } </ul>
        );
    };

    return (
        <div className="calendars">
            <div className="calendars-header">
                <Title className="courses-title" level={2}>Calendar</Title>
            </div>
            <div className="calendar-content">
                {
                    //Verification to show the other calendar for devices with less than 1024 width screen resolution

                    //onSelect={info} is needed to open a modal when clicking on each
                    //day,month and even year in the calendar
                    window.innerWidth < 1024 ? <Calendar fullscreen={false}
                        onSelect={info} /> : <Calendar
                            dateCellRender={dateCellRender}
                            monthCellRender={monthCellRender}
                            fullscreen={true}
                            onSelect={info} />
                } </div>
        </div>
    );
};

export default Calendars;
