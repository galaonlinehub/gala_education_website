'use client'
import BookAndPersonSvg from "@/src/utils/vector-svg/BookAndPersonSvg";
import {Calendar, theme} from "antd";
import "../../../src/styles/teacher/dashboard.css"


const onPanelChange = (value, mode) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};

export default function Home() {
  return (
    <div className="flex justify-start w-full h-full px-8 gap-5">
      <div className="w-8/12 my-20">
        <div className="border-[2px] border-[#030DFE] h-[143px] rounded-[10px] flex relative">
          <span className="flex flex-col items-start justify-center p-6 w-3/5">
            <span className="font-black text-black text-[20px]">
              Welcome back, Denis Mgaya!
            </span>
            <span className="text-[12px] font-medium">
              You’ve successfully logged in to your Teachers Dashboard. Here's where you can manage your classes. Here, you can create new classes, enroll students, schedule live sessions, and keep track of your Learn more....
            </span>
          </span>
          <BookAndPersonSvg/>
        </div>
      </div>
      <div className="flex flex-col items-center py-8 px-6 my-3 w-4/12 bg-[#001840] rounded-[10px]">
        <div className="!w-[300px] !bg-[#001e52] !h-[143px]">
          <Calendar className="!border !border-[#001e52] custom-calendar" fullscreen={false} />
        </div>
        <div>
          <span>Reminders</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M9.00008 17.3333C5.07171 17.3333 3.10752 17.3333 1.88714 16.1129C0.666748 14.8925 0.666748 12.9283 0.666748 8.99996C0.666748 5.07158 0.666748 3.1074 1.88714 1.88702C3.10752 0.666626 5.07171 0.666626 9.00008 0.666626C12.9284 0.666626 14.8927 0.666626 16.113 1.88702C17.3334 3.1074 17.3334 5.07158 17.3334 8.99996C17.3334 12.9283 17.3334 14.8925 16.113 16.1129C14.8927 17.3333 12.9284 17.3333 9.00008 17.3333ZM9.00008 5.87496C9.34525 5.87496 9.62508 6.15478 9.62508 6.49996V8.37496H11.5001C11.8452 8.37496 12.1251 8.65479 12.1251 8.99996C12.1251 9.34513 11.8452 9.62496 11.5001 9.62496H9.62508V11.5C9.62508 11.8451 9.34525 12.125 9.00008 12.125C8.65491 12.125 8.37508 11.8451 8.37508 11.5V9.62496H6.50008C6.15491 9.62496 5.87508 9.34513 5.87508 8.99996C5.87508 8.65479 6.15491 8.37496 6.50008 8.37496H8.37508V6.49996C8.37508 6.15478 8.65491 5.87496 9.00008 5.87496Z"
                  fill="white"/>
          </svg>
       </div>
      </div>
    </div>
  );
}
