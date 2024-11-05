"use client"
import React, { useState } from "react";

export default function StudentClassroom() {
  const [showSidebar, setShowSidebar] = useState(false);

  const reminders = [
    { name: "Eng - Speaking Test", time: "10.06.2026", day: "Friday" },
    { name: "Eng - Vocabulary Test", time: "10.06.2026", day: "Friday" },
    { name: "Eng Test", time: "10.06.2026", day: "Friday" },
  ];

  const pdfDownloads = [
    { name: "Descriptive Writing", size: "2.5MB", type: "PDF" },
    { name: "Essay Structure", size: "1.8MB", type: "DOC" },
  ];

  const schedule = [
    { time: "19:00", monday: "ICT", tuesday: "Science", wednesday: "", thursday: "Art", friday: "", saturday: "Science" },
    { time: "20:00", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "Geog", saturday: "" },
    { time: "21:00", monday: "English", tuesday: "", wednesday: "History", thursday: "", friday: "", saturday: "Math" },
  ];

  const ReminderIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_277_3603)">
        <path
          d="M17.9391 0.763359H17.2533C17.271 0.706565 17.2893 0.649771 17.2893 0.58687C17.2893 0.263206 17.0255 0 16.7012 0C16.377 0 16.1144 0.263206 16.1144 0.58687C16.1144 0.649771 16.1315 0.706565 16.1504 0.763359H13.9031C13.9208 0.706565 13.9391 0.649771 13.9391 0.58687C13.9379 0.263206 13.6753 0 13.3504 0C13.0267 0 12.7635 0.263206 12.7635 0.58687C12.7635 0.649771 12.7812 0.706565 12.7995 0.763359H10.5516C10.5693 0.706565 10.587 0.649771 10.587 0.58687C10.587 0.263206 10.3244 0 10.0002 0C9.67588 0 9.41329 0.263206 9.41329 0.58687C9.41329 0.649771 9.43039 0.706565 9.44871 0.763359H7.20077C7.21848 0.706565 7.2368 0.649771 7.2368 0.58687C7.2368 0.263206 6.97359 0 6.64993 0C6.32565 0 6.06245 0.263206 6.06245 0.58687C6.06245 0.649771 6.07955 0.706565 6.09787 0.763359H3.85054C3.86886 0.706565 3.88657 0.649771 3.88657 0.58687C3.88657 0.262595 3.62397 0 3.2997 0C2.97542 0 2.71222 0.263206 2.71222 0.58687C2.71222 0.649771 2.72932 0.706565 2.74764 0.763359H2.06123C1.1342 0.763359 0.381836 1.51634 0.381836 2.44275V18.3206C0.381836 19.2476 1.1342 20 2.06123 20H16.0429L19.6185 16.4244V2.44275C19.6185 1.51695 18.8661 0.763359 17.9391 0.763359ZM18.7024 16.0446L18.5125 16.2345H17.0744C16.4014 16.2345 15.853 16.7841 15.853 17.4559V18.894L15.6631 19.084H2.06123C1.64046 19.084 1.29787 18.7414 1.29787 18.3206V3.05344H18.7024V16.0446Z"
          fill="white"
        />
        <path d="M3.89869 7.19387H4.72067V6.58379H5.08587V5.94074H4.72067V4.26807H3.91579L2.55029 5.89066V6.58379H3.89869V7.19387ZM3.20129 5.94074L3.89869 5.04852V5.94074H3.20129Z" fill="white" />
        <path d="M4.63281 9.2843C4.63281 9.2843 5.69419 11.1487 7.85052 13.3051C7.99587 13.4492 8.13938 13.589 8.28106 13.724C8.24197 13.7551 8.20106 13.7826 8.16442 13.8186C7.72167 14.262 7.72167 14.9802 8.16442 15.4235C8.609 15.8675 9.32655 15.8675 9.76991 15.4235C9.84503 15.3484 9.90243 15.2629 9.9519 15.1756C11.0841 16.0703 11.8633 16.5142 11.8633 16.5142C11.4615 14.5081 13.4395 12.011 14.3006 10.8666C15.6179 9.11575 14.9681 7.58353 14.2701 6.88552C13.5708 6.18689 12.0411 5.53895 10.289 6.85437C9.14335 7.71483 6.64808 9.69407 4.63281 9.2843ZM9.68808 8.27666C10.8221 7.14201 12.1589 6.64063 12.5192 7.00155C12.8801 7.36246 11.2997 7.62078 10.1656 8.75483C9.03159 9.88888 7.30152 10.0104 6.48075 9.72643C7.30457 9.68857 8.55342 9.41132 9.68808 8.27666Z" fill="white" />
      </g>
      <defs>
        <clipPath id="clip0_277_3603">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  const AddIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.99984 18.3333C6.07146 18.3333 4.10728 18.3333 2.8869 17.1129C1.6665 15.8925 1.6665 13.9283 1.6665 9.99996C1.6665 6.07158 1.6665 4.1074 2.8869 2.88702C4.10728 1.66663 6.07146 1.66663 9.99984 1.66663C13.9282 1.66663 15.8924 1.66663 17.1128 2.88702C18.3332 4.1074 18.3332 6.07158 18.3332 9.99996C18.3332 13.9283 18.3332 15.8925 17.1128 17.1129C15.8924 18.3333 13.9282 18.3333 9.99984 18.3333ZM9.99984 6.87496C10.345 6.87496 10.6248 7.15478 10.6248 7.49996V9.37496H12.4998C12.845 9.37496 13.1248 9.65479 13.1248 9.99996C13.1248 10.3451 12.845 10.625 12.4998 10.625H10.6248V12.5C10.6248 12.8451 10.345 13.125 9.99984 13.125C9.65467 13.125 9.37484 12.8451 9.37484 12.5V10.625H7.49984C7.15466 10.625 6.87484 10.3451 6.87484 9.99996C6.87484 9.65479 7.15466 9.37496 7.49984 9.37496H9.37484V7.49996C9.37484 7.15478 9.65467 6.87496 9.99984 6.87496Z"
        fill="white"
      />
    </svg>
  );

  const DownloadIcon = () => (
    <svg width="14" height="16" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.625 0.806396C5.625 0.460693 5.3457 0.181396 5 0.181396C4.6543 0.181396 4.375 0.460693 4.375 0.806396V5.54663L2.94141 4.11304C2.69727 3.8689 2.30078 3.8689 2.05664 4.11304C1.8125 4.35718 1.8125 4.75366 2.05664 4.9978L4.55664 7.4978C4.80078 7.74194 5.19727 7.74194 5.44141 7.4978L7.94141 4.9978C8.18555 4.75366 8.18555 4.35718 7.94141 4.11304C7.69727 3.8689 7.30078 3.8689 7.05664 4.11304L5.625 5.54663V0.806396ZM1.25 7.0564C0.560547 7.0564 0 7.61694 0 8.3064V8.9314C0 9.62085 0.560547 10.1814 1.25 10.1814H8.75C9.43945 10.1814 10 9.62085 10 8.9314V8.3064C10 7.61694 9.43945 7.0564 8.75 7.0564H6.76758L5.88281 7.94116C5.39453 8.42944 4.60352 8.42944 4.11523 7.94116L3.23242 7.0564H1.25ZM8.4375 8.15015C8.56182 8.15015 8.68105 8.19953 8.76896 8.28744C8.85686 8.37535 8.90625 8.49458 8.90625 8.6189C8.90625 8.74322 8.85686 8.86244 8.76896 8.95035C8.68105 9.03826 8.56182 9.08765 8.4375 9.08765C8.31318 9.08765 8.19395 9.03826 8.10604 8.95035C8.01814 8.86244 7.96875 8.74322 7.96875 8.6189C7.96875 8.49458 8.01814 8.37535 8.10604 8.28744C8.19395 8.19953 8.31318 8.15015 8.4375 8.15015Z"
        fill="white"
      />
    </svg>
  );

  const FileIcon = ({ type }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="white" stroke={type === "PDF" ? "red" : "#2B579A"} strokeWidth="2" />
      <polyline points="14 2 14 8 20 8" fill="white" stroke={type === "PDF" ? "red" : "#2B579A"} strokeWidth="2" />
      <text x="50%" y="65%" fontSize="6" fill={type === "PDF" ? "red" : "#2B579A"} textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="bold">
        {type}
      </text>
    </svg>
  );

  return (
    <div className="flex flex-col lg:flex-row p-4 gap-6">
      <div className="w-full lg:w-2/3">
        <h1 className="text-lg font-bold mb-6">Welcome to your class, Diana Malle</h1>
        
        <section className="mb-8">
          <h2 className="text-sm font-bold mb-4">Your Schedule</h2>
          <div className="border border-gray-300 rounded-lg p-4 overflow-x-auto">
            <div className="flex gap-2 mb-4">
              {["Block", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                <div key={index} className="flex-shrink-0 w-20 h-12 bg-blue-950 text-white rounded-lg flex items-center justify-center text-sm">
                  {day}
                </div>
              ))}
            </div>
            {schedule.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-2 mb-2">
                <div className="flex-shrink-0 w-20 h-12 bg-blue-950 text-white rounded-lg flex items-center justify-center text-sm">
                  {row.time}
                </div>
                {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].map((day, dayIndex) => (
                  
                  <div
                    key={dayIndex}
                    className={`flex-shrink-0 w-20 h-12 rounded-lg flex items-center justify-center text-xs ${
                      row[day] ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                  >
                    {row[day]}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-bold mb-4">Homework Download/Submission</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="bg-white border border-gray-300 rounded-lg p-4 flex-1">
              <h3 className="text-xs font-bold mb-2">Download</h3>
              {pdfDownloads.map((item, index) => (
                <div key={index} className="bg-[#0C6667] mb-2 flex items-center gap-2 rounded-md p-2 text-white">
                  <FileIcon type={item.type} />
                  <div>
                    <p className="text-xs">{item.name}</p>
                    <p className="text-xs text-gray-200">{item.size}</p>
                  </div>
                  <DownloadIcon />
                </div>
              ))}
            </div>
            <div className="bg-white border border-gray-300 rounded-lg p-4 flex-1">
              <h3 className="text-xs font-bold mb-2">Upload Assignment</h3>
              {pdfDownloads.map((item, index) => (
                <div key={index} className="bg-[#0C6667] mb-2 flex items-center gap-2 rounded-md p-2 text-white">
                  <FileIcon type={item.type} />
                  <div>
                    <p className="text-xs">{item.name}</p>
                    <p className="text-xs text-gray-200">{item.size}</p>
                  </div>
                  <DownloadIcon />
                </div>
              ))}
              <button className="bg-[#0C6667] text-white rounded-md p-2 text-xs w-full mt-2 flex items-center justify-center">
                <AddIcon /> Add
              </button>
            </div>
          </div>
        </section>
      </div>

      <div className="w-full lg:w-1/3">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="lg:hidden bg-blue-600 text-white p-2 rounded-md mb-4 w-full"
        >
          {showSidebar ? "Hide Sidebar" : "Show Sidebar"}
        </button>
        
        <div className={`lg:block ${showSidebar ? 'block' : 'hidden'}`}>
          <section className="bg-white border border-gray-300 rounded-lg p-4 mb-6">
            <h2 className="font-bold text-sm mb-2">Announcements</h2>
            <p className="text-xs text-gray-600 italic">
              This is where you will find important updates on assignments, subjects, and homework. 
              Stay tuned for new announcements to keep track of any changes or additional tasks!
            </p>
          </section>

          <section className="bg-blue-950 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-white text-sm">Reminders</h2>
              <AddIcon />
            </div>
            {reminders.map((item, index) => (
              <div key={index} className="border border-white rounded-md p-2 mb-2 flex items-center gap-2 text-white">
                <ReminderIcon />
                <div>
                  <p className="text-xs font-bold">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.time} • {item.day}</p>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}