"use client";

import { useState } from "react";
import Image from "next/image";
import ReadMoreContainer from "@/components/layout/ui/ReadMore";

const Live = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const liveClasses = [
    {
      class_name: "Math",
      date: "Oct 10, 2024",
      time: "10:00 AM",
      duration: "1 hour",
      enrolled: "10",
      link: "https://zoom.us/j/1234567890?pwd=abcdef12345",
    },
    {
      class_name: "English",
      date: "Oct 12, 2024",
      time: "10:00 AM",
      duration: "1 hour",
      enrolled: "8",
      link: "https://zoom.us/j/1234567890?pwd=abcdef12345",
    },
    {
      class_name: "Physics",
      date: "Oct 14, 2024",
      time: "10:00 AM",
      duration: "1 hour",
      enrolled: "10",
      link: "https://zoom.us/j/1234567890?pwd=abcdef12345",
    },
  ];

  const ReminderIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.9391 0.763359H17.2533C17.271 0.706565 17.2893 0.649771 17.2893 0.58687C17.2893 0.263206 17.0255 0 16.7012 0C16.377 0 16.1144 0.263206 16.1144 0.58687C16.1144 0.649771 16.1315 0.706565 16.1504 0.763359H13.9031C13.9208 0.706565 13.9391 0.649771 13.9391 0.58687C13.9379 0.263206 13.6753 0 13.3504 0C13.0267 0 12.7635 0.263206 12.7635 0.58687C12.7635 0.649771 12.7812 0.706565 12.7995 0.763359H10.5516C10.5693 0.706565 10.587 0.649771 10.587 0.58687C10.587 0.263206 10.3244 0 10.0002 0C9.67588 0 9.41329 0.263206 9.41329 0.58687C9.41329 0.649771 9.43039 0.706565 9.44871 0.763359H7.20077C7.21848 0.706565 7.2368 0.649771 7.2368 0.58687C7.2368 0.263206 6.97359 0 6.64993 0C6.32565 0 6.06245 0.263206 6.06245 0.58687C6.06245 0.649771 6.07955 0.706565 6.09787 0.763359H3.85054C3.86886 0.706565 3.88657 0.649771 3.88657 0.58687C3.88657 0.262595 3.62397 0 3.2997 0C2.97542 0 2.71222 0.263206 2.71222 0.58687C2.71222 0.649771 2.72932 0.706565 2.74764 0.763359H2.06123C1.1342 0.763359 0.381836 1.51634 0.381836 2.44275V18.3206C0.381836 19.2476 1.1342 20 2.06123 20H16.0429L19.6185 16.4244V2.44275C19.6185 1.51695 18.8661 0.763359 17.9391 0.763359ZM18.7024 16.0446L18.5125 16.2345H17.0744C16.4014 16.2345 15.853 16.7841 15.853 17.4559V18.894L15.6631 19.084H2.06123C1.64046 19.084 1.29787 18.7414 1.29787 18.3206V3.05344H18.7024V16.0446Z"
        fill="currentColor"
      />
      <path d="M3.89869 7.19387H4.72067V6.58379H5.08587V5.94074H4.72067V4.26807H3.91579L2.55029 5.89066V6.58379H3.89869V7.19387ZM3.20129 5.94074L3.89869 5.04852V5.94074H3.20129Z" fill="currentColor" />
      <path d="M4.63281 9.2843C4.63281 9.2843 5.69419 11.1487 7.85052 13.3051C7.99587 13.4492 8.13938 13.589 8.28106 13.724C8.24197 13.7551 8.20106 13.7826 8.16442 13.8186C7.72167 14.262 7.72167 14.9802 8.16442 15.4235C8.609 15.8675 9.32655 15.8675 9.76991 15.4235C9.84503 15.3484 9.90243 15.2629 9.9519 15.1756C11.0841 16.0703 11.8633 16.5142 11.8633 16.5142C11.4615 14.5081 13.4395 12.011 14.3006 10.8666C15.6179 9.11575 14.9681 7.58353 14.2701 6.88552C13.5708 6.18689 12.0411 5.53895 10.289 6.85437C9.14335 7.71483 6.64808 9.69407 4.63281 9.2843ZM9.68808 8.27666C10.8221 7.14201 12.1589 6.64063 12.5192 7.00155C12.8801 7.36246 11.2997 7.62078 10.1656 8.75483C9.03159 9.88888 7.30152 10.0104 6.48075 9.72643C7.30457 9.68857 8.55342 9.41132 9.68808 8.27666Z" fill="currentColor" />
    </svg>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md mb-8">
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex-grow">
                  <h2 className="text-2xl font-bold mb-2">Welcome back, Diana Malle!</h2>
                  <ReadMoreContainer />
                </div>
                <div className="flex-shrink-0">
                  <Image className="h-auto w-auto" src="/sitting_on_books.png" alt="An image of a character sitting on books" width={130} height={130} />
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4">Upcoming Live Classes</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-2 text-left">Class Name</th>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Time</th>
                  <th className="p-2 text-left">Duration</th>
                  <th className="p-2 text-left">Enrolled</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {liveClasses.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                    <td className="p-2">{item.class_name}</td>
                    <td className="p-2">{item.date}</td>
                    <td className="p-2">{item.time}</td>
                    <td className="p-2">{item.duration}</td>
                    <td className="p-2">{item.enrolled}</td>
                    <td className="p-2">
                      <a href={item.link} className="text-blue-600 underline block mb-2" target="_blank" rel="noopener noreferrer">
                        {item.link}
                      </a>
                      <div className="flex gap-2 items-center justify-center">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">Share</button>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">Cancel</button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Schedule a Class</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Class Name
                  </label>
                  <input type="text" id="fullName" name="fullName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" placeholder="Enter your full name" />
                </div>
            
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input type="date" id="date" name="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                    Time
                  </label>
                  <select id="time" name="time" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                    <option value="19:00">19:00 PM</option>
                    <option value="19:30">19:30 PM</option>
                    <option value="20:00">20:00 PM</option>
                    <option value="09:00">09:00 AM</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                    Duration
                  </label>
                  <select id="time" name="time" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                    <option value="30">30 min</option>
                    <option value="45">45 min</option>
                    <option value="60">60 min</option>
                  
                  </select>
                  </div>
                <div className="flex items-center text-xs italic">"Enter the class details, choose the date and time, then click to generate the link."</div>
                <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-3xl hover:bg-blue-700 transition-colors">
                  Generate Link
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Live;
