import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  const reminders = [
    { title: 'Eng - Speaking test', date: '10.06.2026', day: 'Friday' },
    { title: 'Eng - Vocabulary test', date: '10.06.2026', day: 'Friday' },
    { title: 'Eng test', date: '10.06.2026', day: 'Friday' },
  ];

  return (
    <div className="bg-blue-900 text-white p-5 rounded-lg shadow-md w-80">
      {/* Calendar Section */}
      <div className="flex flex-col items-center">
        <Calendar
          onChange={setDate}
          value={date}
          className="mb-4 !bg-blue-950"
          tileClassName="text-white"
        />
        
        {/* End Time Display */}
        <div className="flex items-center justify-between w-full mt-4">
          <span className="text-lg">Ends</span>
          <span className="text-xl font-semibold bg-blue-800 p-2 rounded-md">
            8:00 AM
          </span>
        </div>
      </div>

      {/* Reminders Section */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Reminders</h2>
          <button className="text-white bg-blue-600 p-1 rounded">+</button>
        </div>
        
        {/* Reminder List */}
        <div className="space-y-2">
          {reminders.map((reminder, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-blue-800 p-3 rounded-lg"
            >
              <div>
                <p className="font-semibold">{reminder.title}</p>
                <p className="text-sm text-gray-400">
                  {reminder.date} . {reminder.day}
                </p>
              </div>
              <span className="text-white bg-blue-600 rounded-full p-2">
                🗓️
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
