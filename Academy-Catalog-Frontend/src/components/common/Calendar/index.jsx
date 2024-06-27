import React from 'react';
import { Calendar } from 'antd';

const CalendarComponent = () => {
  const onPanelChange = (value, mode) => {
    
  };
  return (
    <div className="site-calendar-demo-card">
      <Calendar fullscreen={false} onPanelChange={onPanelChange} />
    </div>
  );
};

export default CalendarComponent;