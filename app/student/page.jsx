"use client";

import { useState, useRef } from "react";
import ReadMoreContainer from "@/components/layout/ui/ReadMore";
import Image from "next/image";
import { Calendar, theme } from "antd";
import LeftTiltedBook from "@/components/vectors/LeftTiltedBook";
import CalendarComponent from "@/src/components/student/CalendarComponent";

export default function Component() {
  const reminders = [
    {
      name: "Eng - Speaking Test",
      time: "10.06.2026",
      day: "Friday",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17.9391 0.763359H17.2533C17.271 0.706565 17.2893 0.649771 17.2893 0.58687C17.2893 0.263206 17.0255 0 16.7012 0C16.377 0 16.1144 0.263206 16.1144 0.58687C16.1144 0.649771 16.1315 0.706565 16.1504 0.763359H13.9031C13.9208 0.706565 13.9391 0.649771 13.9391 0.58687C13.9379 0.263206 13.6753 0 13.3504 0C13.0267 0 12.7635 0.263206 12.7635 0.58687C12.7635 0.649771 12.7812 0.706565 12.7995 0.763359H10.5516C10.5693 0.706565 10.587 0.649771 10.587 0.58687C10.587 0.263206 10.3244 0 10.0002 0C9.67588 0 9.41329 0.263206 9.41329 0.58687C9.41329 0.649771 9.43039 0.706565 9.44871 0.763359H7.20077C7.21848 0.706565 7.2368 0.649771 7.2368 0.58687C7.2368 0.263206 6.97359 0 6.64993 0C6.32565 0 6.06245 0.263206 6.06245 0.58687C6.06245 0.649771 6.07955 0.706565 6.09787 0.763359H3.85054C3.86886 0.706565 3.88657 0.649771 3.88657 0.58687C3.88657 0.262595 3.62397 0 3.2997 0C2.97542 0 2.71222 0.263206 2.71222 0.58687C2.71222 0.649771 2.72932 0.706565 2.74764 0.763359H2.06123C1.1342 0.763359 0.381836 1.51634 0.381836 2.44275V18.3206C0.381836 19.2476 1.1342 20 2.06123 20H16.0429L19.6185 16.4244V2.44275C19.6185 1.51695 18.8661 0.763359 17.9391 0.763359ZM18.7024 16.0446L18.5125 16.2345H17.0744C16.4014 16.2345 15.853 16.7841 15.853 17.4559V18.894L15.6631 19.084H2.06123C1.64046 19.084 1.29787 18.7414 1.29787 18.3206V3.05344H18.7024V16.0446Z"
            fill="white"
          />
          <path d="M3.89869 7.19387H4.72067V6.58379H5.08587V5.94074H4.72067V4.26807H3.91579L2.55029 5.89066V6.58379H3.89869V7.19387ZM3.20129 5.94074L3.89869 5.04852V5.94074H3.20129Z" fill="white" />
          <path d="M4.63281 9.2843C4.63281 9.2843 5.69419 11.1487 7.85052 13.3051C7.99587 13.4492 8.13938 13.589 8.28106 13.724C8.24197 13.7551 8.20106 13.7826 8.16442 13.8186C7.72167 14.262 7.72167 14.9802 8.16442 15.4235C8.609 15.8675 9.32655 15.8675 9.76991 15.4235C9.84503 15.3484 9.90243 15.2629 9.9519 15.1756C11.0841 16.0703 11.8633 16.5142 11.8633 16.5142C11.4615 14.5081 13.4395 12.011 14.3006 10.8666C15.6179 9.11575 14.9681 7.58353 14.2701 6.88552C13.5708 6.18689 12.0411 5.53895 10.289 6.85437C9.14335 7.71483 6.64808 9.69407 4.63281 9.2843ZM9.68808 8.27666C10.8221 7.14201 12.1589 6.64063 12.5192 7.00155C12.8801 7.36246 11.2997 7.62078 10.1656 8.75483C9.03159 9.88888 7.30152 10.0104 6.48075 9.72643C7.30457 9.68857 8.55342 9.41132 9.68808 8.27666Z" fill="white" />
        </svg>
      ),
    },
    {
      name: "Eng - Vocabulary Test",
      time: "10.06.2026",
      day: "Friday",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17.9391 0.763359H17.2533C17.271 0.706565 17.2893 0.649771 17.2893 0.58687C17.2893 0.263206 17.0255 0 16.7012 0C16.377 0 16.1144 0.263206 16.1144 0.58687C16.1144 0.649771 16.1315 0.706565 16.1504 0.763359H13.9031C13.9208 0.706565 13.9391 0.649771 13.9391 0.58687C13.9379 0.263206 13.6753 0 13.3504 0C13.0267 0 12.7635 0.263206 12.7635 0.58687C12.7635 0.649771 12.7812 0.706565 12.7995 0.763359H10.5516C10.5693 0.706565 10.587 0.649771 10.587 0.58687C10.587 0.263206 10.3244 0 10.0002 0C9.67588 0 9.41329 0.263206 9.41329 0.58687C9.41329 0.649771 9.43039 0.706565 9.44871 0.763359H7.20077C7.21848 0.706565 7.2368 0.649771 7.2368 0.58687C7.2368 0.263206 6.97359 0 6.64993 0C6.32565 0 6.06245 0.263206 6.06245 0.58687C6.06245 0.649771 6.07955 0.706565 6.09787 0.763359H3.85054C3.86886 0.706565 3.88657 0.649771 3.88657 0.58687C3.88657 0.262595 3.62397 0 3.2997 0C2.97542 0 2.71222 0.263206 2.71222 0.58687C2.71222 0.649771 2.72932 0.706565 2.74764 0.763359H2.06123C1.1342 0.763359 0.381836 1.51634 0.381836 2.44275V18.3206C0.381836 19.2476 1.1342 20 2.06123 20H16.0429L19.6185 16.4244V2.44275C19.6185 1.51695 18.8661 0.763359 17.9391 0.763359ZM18.7024 16.0446L18.5125 16.2345H17.0744C16.4014 16.2345 15.853 16.7841 15.853 17.4559V18.894L15.6631 19.084H2.06123C1.64046 19.084 1.29787 18.7414 1.29787 18.3206V3.05344H18.7024V16.0446Z"
            fill="white"
          />
          <path d="M3.89869 7.19387H4.72067V6.58379H5.08587V5.94074H4.72067V4.26807H3.91579L2.55029 5.89066V6.58379H3.89869V7.19387ZM3.20129 5.94074L3.89869 5.04852V5.94074H3.20129Z" fill="white" />
          <path d="M4.63281 9.2843C4.63281 9.2843 5.69419 11.1487 7.85052 13.3051C7.99587 13.4492 8.13938 13.589 8.28106 13.724C8.24197 13.7551 8.20106 13.7826 8.16442 13.8186C7.72167 14.262 7.72167 14.9802 8.16442 15.4235C8.609 15.8675 9.32655 15.8675 9.76991 15.4235C9.84503 15.3484 9.90243 15.2629 9.9519 15.1756C11.0841 16.0703 11.8633 16.5142 11.8633 16.5142C11.4615 14.5081 13.4395 12.011 14.3006 10.8666C15.6179 9.11575 14.9681 7.58353 14.2701 6.88552C13.5708 6.18689 12.0411 5.53895 10.289 6.85437C9.14335 7.71483 6.64808 9.69407 4.63281 9.2843ZM9.68808 8.27666C10.8221 7.14201 12.1589 6.64063 12.5192 7.00155C12.8801 7.36246 11.2997 7.62078 10.1656 8.75483C9.03159 9.88888 7.30152 10.0104 6.48075 9.72643C7.30457 9.68857 8.55342 9.41132 9.68808 8.27666Z" fill="white" />
        </svg>
      ),
    },
    {
      name: "Eng Test",
      time: "10.06.2026",
      day: "Friday",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17.9391 0.763359H17.2533C17.271 0.706565 17.2893 0.649771 17.2893 0.58687C17.2893 0.263206 17.0255 0 16.7012 0C16.377 0 16.1144 0.263206 16.1144 0.58687C16.1144 0.649771 16.1315 0.706565 16.1504 0.763359H13.9031C13.9208 0.706565 13.9391 0.649771 13.9391 0.58687C13.9379 0.263206 13.6753 0 13.3504 0C13.0267 0 12.7635 0.263206 12.7635 0.58687C12.7635 0.649771 12.7812 0.706565 12.7995 0.763359H10.5516C10.5693 0.706565 10.587 0.649771 10.587 0.58687C10.587 0.263206 10.3244 0 10.0002 0C9.67588 0 9.41329 0.263206 9.41329 0.58687C9.41329 0.649771 9.43039 0.706565 9.44871 0.763359H7.20077C7.21848 0.706565 7.2368 0.649771 7.2368 0.58687C7.2368 0.263206 6.97359 0 6.64993 0C6.32565 0 6.06245 0.263206 6.06245 0.58687C6.06245 0.649771 6.07955 0.706565 6.09787 0.763359H3.85054C3.86886 0.706565 3.88657 0.649771 3.88657 0.58687C3.88657 0.262595 3.62397 0 3.2997 0C2.97542 0 2.71222 0.263206 2.71222 0.58687C2.71222 0.649771 2.72932 0.706565 2.74764 0.763359H2.06123C1.1342 0.763359 0.381836 1.51634 0.381836 2.44275V18.3206C0.381836 19.2476 1.1342 20 2.06123 20H16.0429L19.6185 16.4244V2.44275C19.6185 1.51695 18.8661 0.763359 17.9391 0.763359ZM18.7024 16.0446L18.5125  16.2345H17.0744C16.4014  16.2345 15.853 16.7841 15.853 17.4559V18.894L15.6631 19.084H2.06123C1.64046 19.084 1.29787 18.7414 1.29787 18.3206V3.05344H18.7024V16.0446Z"
            fill="white"
          />
          <path d="M3.89869 7.19387H4.72067V6.58379H5.08587V5.94074H4.72067V4.26807H3.91579L2.55029 5.89066V6.58379H3.89869V7.19387ZM3.20129 5.94074L3.89869 5.04852V5.94074H3.20129Z" fill="white" />
          <path d="M4.63281 9.2843C4.63281 9.2843 5.69419 11.1487 7.85052 13.3051C7.99587 13.4492 8.13938 13.589 8.28106 13.724C8.24197 13.7551 8.20106 13.7826 8.16442 13.8186C7.72167 14.262 7.72167 14.9802 8.16442 15.4235C8.609 15.8675 9.32655 15.8675 9.76991 15.4235C9.84503 15.3484 9.90243 15.2629 9.9519 15.1756C11.0841 16.0703 11.8633 16.5142 11.8633 16.5142C11.4615 14.5081 13.4395 12.011 14.3006 10.8666C15.6179 9.11575 14.9681 7.58353 14.2701 6.88552C13.5708 6.18689 12.0411 5.53895 10.289 6.85437C9.14335 7.71483 6.64808 9.69407 4.63281 9.2843ZM9.68808 8.27666C10.8221 7.14201 12.1589 6.64063 12.5192 7.00155C12.8801 7.36246 11.2997 7.62078 10.1656 8.75483C9.03159 9.88888 7.30152 10.0104 6.48075 9.72643C7.30457 9.68857 8.55342 9.41132 9.68808 8.27666Z" fill="white" />
        </svg>
      ),
    },
  ];

  const subjects = [
    { name: "English Grade 1", classSize: 10, days: 30 },
    { name: "Mathematics Grade 7", classSize: 10, days: 30 },
    { name: "Physics Form 1", classSize: 10, days: 30 },
    { name: "Chemistry Form 4", classSize: 10, days: 30 },
  ];

  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  const { token } = theme.useToken();
  const wrapperStyle = {
    width: "100%",
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const scrollRef = useRef(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row  gap-12 justify-between p-6 bg-orange-100">
      <div className="flex flex-col w-full lg:w-3/4">
        <div className="p-4 z-10 h-fit mt-20 w-full border-blue-600 border-2 rounded-xl flex flex-col relative">
          <div>
            <div className="flex flex-col">
              <div className="font-bold text-sm">Welcome back, Diana Malle!</div>
              <div>
                <ReadMoreContainer />
              </div>
            </div>
            <div className="absolute -top-16 right-4">
              <Image className="h-auto w-auto" src="/sitting_on_books.png" alt="An image of a character sitting on books" width={130} height={130} />
            </div>
          </div>
        </div>
        <div className="pt-5">
          <h2 className="text-xs font-bold mb-2">Your Subjects</h2>
          {/* <div className="block md:hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="p-2 text-left">Subject</th>
                  <th className="p-2 text-left">Class Size</th>
                  <th className="p-2 text-left">Days</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                    <td className="p-2 border">{subject.name}</td>
                    <td className="p-2 border">{subject.classSize}</td>
                    <td className="p-2 border">{subject.days}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
          <div className="">
            <div className="flex items-center mt-2">
              <div ref={scrollRef} className="flex overflow-x-auto space-x-4 pb-4">
                {subjects.map((subject, index) => (
                  <div key={index} className="flex-none flex-col text-xs font-bold rounded-md w-60 h-28 p-5 bg-blue-900 text-white">
                    <div className="mb-3">{subject.name}</div>
                    <div>Class size: {subject.classSize}</div>
                    <div>Days: {subject.days}</div>
                  </div>
                ))}
              </div>
              <button onClick={scrollRight} className="ml-2 p-2 rounded-full transition flex items-center justify-center">
                <svg width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.0595 10.9406C13.6454 11.5265 13.6454 12.4781 13.0595 13.064L5.55947 20.564C4.97353 21.15 4.02197 21.15 3.43604 20.564C2.8501 19.9781 2.8501 19.0265 3.43604 18.4406L9.87666 12L3.44072 5.55935C2.85479 4.97341 2.85479 4.02185 3.44072 3.43591C4.02666 2.84998 4.97822 2.84998 5.56416 3.43591L13.0642 10.9359L13.0595 10.9406Z" fill="black" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="pt-5 mb-20 w-full">
          <span className="text-xs font-bold">Your Classes</span>
          <div className="overflow-x-auto">
            <div className="min-w-[600px] flex flex-col gap-3">
              <div className="bg-blue-950 w-full flex justify-between items-center font-bold text-xs text-white rounded-md p-2">
                {["Class", "Members", "Starting", "End", "Material", "Percentage"].map((header, index) => (
                  <span key={index} className="text-center py-2 flex-1">
                    {header}
                  </span>
                ))}
              </div>
              {["Math", "English"].map((subject, index) => (
                <div key={index} className="border-2 border-blue-600 flex items-center justify-between font-bold text-xs rounded-md w-full p-2">
                  <span className="text-center overflow-auto py-2 flex-1">{subject}</span>
                  <span className="text-center overflow-auto py-2 flex-1">10</span>
                  <span className="text-center overflow-auto py-2 flex-1">10.05.2026</span>
                  <span className="text-center overflow-auto py-2 flex-1">10.06.2026</span>
                  <span className="text-center overflow-auto py-2 flex-1">View</span>
                  <span className="text-center overflow-auto py-2 flex-1">{index === 0 ? "45%" : "05%"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button onClick={() => setShowSidebar(!showSidebar)} className="fixed bottom-4 right-4 lg:hidden bg-blue-900 text-white p-2 rounded-full z-10" aria-label={showSidebar ? "Hide Sidebar" : "Show Sidebar"}>
        {showSidebar ? "Hide" : "Show"} Sidebar
      </button>

      {/* <div className={`fixed inset-y-0 left-0 z-50 bg-blue-900 transform transition-transform duration-300 ease-in-out ${showSidebar ? "translate-x-0" : "-translate-x-full"} lg:relative lg:translate-x-0 lg:w-1/3`}>
        <button onClick={() => setShowSidebar(false)} className="lg:hidden absolute top-4 right-4 text-white" aria-label="Close Sidebar">
          ✕
        </button>
        <div className="h-full overflow-y-auto flex flex-col items-center justify-center p-6">
          <div style={wrapperStyle} className="mb-6 bg-gray-50">
            <Calendar fullscreen={false} onPanelChange={onPanelChange} />
          </div>
          <hr className="bg-white w-5/6 mb-6" style={{ height: "0.4px", border: "none" }} />

          <div className="flex justify-between p-4 w-full">
            <div className="text-white text-sm p-1">Ends</div>
            <div className="flex gap-2">
              <div className="text-white rounded-md w-16 text-center bg-blue-950 p-1 text-sm">8:00</div>
              <div className="flex gap-1">
                <span className="p-1 rounded-md w-10 text-center bg-white text-sm">AM</span>
                <span className="p-1 rounded-md w-10 text-center bg-blue-950 text-white text-sm">PM</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between w-full px-4 p-1">
            <div className="font-bold text-white text-sm">Reminders</div>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.99984 18.3333C6.07146 18.3333 4.10728 18.3333 2.8869 17.1129C1.6665 15.8925 1.6665 13.9283 1.6665 9.99996C1.6665 6.07158 1.6665 4.1074 2.8869 2.88702C4.10728 1.66663 6.07146 1.66663 9.99984 1.66663C13.9282 1.66663 15.8924 1.66663 17.1128 2.88702C18.3332 4.1074 18.3332 6.07158 18.3332 9.99996C18.3332 13.9283 18.3332 15.8925 17.1128 17.1129C15.8924 18.3333 13.9282 18.3333 9.99984 18.3333ZM9.99984 6.87496C10.345 6.87496 10.6248 7.15478 10.6248 7.49996V9.37496H12.4998C12.845 9.37496 13.1248 9.65479 13.1248 9.99996C13.1248 10.3451 12.845 10.625 12.4998 10.625H10.6248V12.5C10.6248 12.8451 10.345 13.125 9.99984 13.125C9.65467 13.125 9.37484 12.8451 9.37484 12.5V10.625H7.49984C7.15466 10.625 6.87484 10.3451 6.87484 9.99996C6.87484 9.65479 7.15466 9.37496 7.49984 9.37496H9.37484V7.49996C9.37484 7.15478 9.65467 6.87496 9.99984 6.87496Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="w-full p-4">
            {reminders.map((item, index) => (
              <div key={index} className="border mb-2 border-white flex justify-start gap-4 items-center rounded-md p-2 h-12">
                {item.icon}
                <div className="flex flex-col">
                  <span className="text-xs text-white font-bold">{item.name}</span>
                  <span className="text-xs text-gray-400">
                    {item.time}.{item.day}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
      <CalendarComponent />
    </div>
  );
}
