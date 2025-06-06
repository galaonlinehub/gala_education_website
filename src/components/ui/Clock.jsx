import { useState, useEffect } from 'react';

const RealTimeClock = ({ 
  showDate = true, 
  showMonth = true, 
  showYear = true, 
  showTime = true,
  hour12 = false 
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatOutput = (date) => {
    const parts = [];
    
    if (showMonth || showDate || showYear) {
      const dateOptions = {};
      if (showMonth) dateOptions.month = 'long';
      if (showDate) dateOptions.day = 'numeric';
      if (showYear) dateOptions.year = 'numeric';
      
      if (Object.keys(dateOptions).length > 0) {
        parts.push(date.toLocaleDateString("en-US", dateOptions));
      }
    }

    if (showTime) {
      const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: hour12 
      };
      parts.push(date.toLocaleTimeString("en-US", timeOptions));
    }

    return parts.join(' ');
  };

  return (
    <div className="font-black text-sm">{formatOutput(currentTime)}</div>
  );
};

export default RealTimeClock;