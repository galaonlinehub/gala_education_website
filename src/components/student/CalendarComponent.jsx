import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Image from 'next/image'
import { FaPlus } from 'react-icons/fa6';

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  const reminders = [
    { title: 'Eng - Speaking test', date: '10.06.2026', day: 'Friday' },
    { title: 'Eng - Vocabulary test', date: '10.06.2026', day: 'Friday' },
    { title: 'Eng test', date: '10.06.2026', day: 'Friday' },
  ];

  return (
    <div className="bg-[#001840] w-full lg:w-1/3 text-white p-5 rounded-lg shadow-md mb-5 lg:mb-0">
      {/* Calendar Section */}
      <div className=" gap-0 items-center">

        <Calendar
          onChange={setDate}
          value={date}
          className=" !bg-[#001F52] !border-none !w-full"
          tileClassName="text-white"
        />
        
        {/* End Time Display */}
        <div className="flex items-center bg-[#001F52] p-4 justify-between w-full ">
          <span className="text-xs">Ends</span>
          <span className="text-sm font-semibold text-[#d9d9d9] p-2 rounded-md">
            8:00 
          </span>
          <span className='bg-white px-2 py-1 text-xs rounded text-blue-950'>AM</span>
          <span className='text-xs'>PM</span>
        </div>
      </div>

      {/* Reminders Section */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xs font-semibold">Reminders</h2>
          <span className=" text-xs bg-white p-1 rounded">
            <FaPlus className='text-blue-900' />
          </span>
        </div>
        
        {/* Reminder List */}
        <div className="space-y-4">
          {reminders.map((reminder, index) => (
            <div
              key={index}
              className="flex items-center gap-x-5 bg-[#001F52] border border-white px-3 py-1 rounded-lg"
            >
              <Image src={'/svg/reminderIcon.svg'} width={20} height={20} alt="reminder icon" />
              <div>
                <p className="font-semibold text-sm text-white">{reminder.title}</p>
                <p className="text-xs text-[#b9b8b8]">
                  {reminder.date} . {reminder.day}
                </p>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
