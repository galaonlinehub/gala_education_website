import React from 'react';
import { Calendar, theme } from 'antd';
import dayjs from 'dayjs';

const CalendarComponent = ({ lessons = [] }) => {
  const { token } = theme.useToken();
  
  const wrapperStyle = {
    width: '100%',
    maxWidth: '600px',
    minWidth: '280px',
    margin: '0 auto',
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
    fontSize: '16px',
    padding: '10px', 
  };

  const isPastLesson = (lesson) => {
    const lessonDateTime = new Date(`${lesson.date} ${lesson.time}`);
    const now = new Date();
    return now > lessonDateTime;
  };

  const getLessonsForDate = (date) => {
    const dateStr = date.format('MMM DD, YYYY');
    
    return lessons.filter(lesson => {
      return lesson.date === dateStr;
    });
  };

  const getStatusColor = (lesson) => {
    if (lesson.status === 'Upcoming' && isPastLesson(lesson)) {
      return 'bg-gray-400';
    }
    
    switch(lesson.status) {
      case 'Upcoming':
        return 'bg-blue-500';
      case 'Completed':
        return 'bg-green-500';
      case 'Canceled':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  const dateCellRender = (value) => {
    const dayLessons = getLessonsForDate(value);
    
    if (dayLessons.length > 0) {
      return (
        <div className="flex justify-center items-center gap-1 mt-1">
          {dayLessons.slice(0, 3).map((lesson, index) => (
            <div
              key={lesson.id || index}
              className={`w-2 h-2 rounded-full ${getStatusColor(lesson)}`}
              title={`${lesson.class_name}: ${lesson.topic} - ${lesson.time}`}
            />
          ))}
          {dayLessons.length > 3 && (
            <div className="w-2 h-2 rounded-full bg-gray-300" />
          )}
        </div>
      );
    }
    return null;
  };

  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return (
    <div style={wrapperStyle}>
      <Calendar 
        fullscreen={false} 
        onPanelChange={onPanelChange}
        cellRender={dateCellRender}
      />
    </div>
  );
};

export default CalendarComponent;