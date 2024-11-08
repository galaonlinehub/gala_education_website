"use client";
import React from "react";
import { Switch } from "antd";

const StudentProfile = () => {
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <div className="flex flex-col justify-center w-full items-center p-8">
      <img src="/avatar.png" alt="Avatar" width="72px" height="72px" />
      <div className="text-sm">Profile Settings</div>
      <div className=" w-full mt-5 text-xs md:flex justify-center px-20 flex-col md:flex-row ">
        <div className="flex w-full  border border-blue-700 p-6 flex-col gap-2">
          <div className="flex flex-col">
            <span>Username</span>
            <input type="text" className="p-2 border border-blue-700" />
          </div>
          <div className="flex flex-col">
            <span>Full Name</span>
            <input type="text" className="p-2 border border-blue-700" />
          </div>
          <div className="flex flex-col">
            <span>Email</span>
            <input type="text" className="p-2 border border-blue-700" />
          </div>
          <div className="flex flex-col">
            <span>Password</span>
            <input type="text" className="p-2 border border-blue-700" />
          </div>

          <div className="flex gap-5 mt-2">
            <button className="p-1.5 bg-blue-700 text-white w-24">Cancel</button>
            <button className="p-1.5 bg-blue-700 text-white w-24">Save Changes</button>
          </div>
        </div>
        <div className="bg-[#001840] border border-blue-700 w-full  p-6  text-white">
          <span className="text-white font-semibold mb-2 flex">Toggle account functionalities</span>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span>New Courses</span>
              <Switch defaultChecked onChange={onChange} size="small" className="border border-white" />
            </div>
            <div className="flex justify-between items-center">
              <span>New Instructors</span>
              <Switch defaultChecked onChange={onChange} size="small" className="border border-white" />
            </div>
            <div className="flex justify-between items-center">
              <span>Course Updates</span>
              <Switch defaultChecked onChange={onChange} size="small" className="border border-white" />
            </div>
            <div className="flex justify-between items-center">
              <span>Sales</span>
              <Switch defaultChecked onChange={onChange} size="small" className="border border-white" />
            </div>
          </div>
          <span className="text-white font-semibold mt-6 mb-2 flex">Toggle course experience</span>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span>Lesson quizzes</span>
              <Switch defaultChecked onChange={onChange} size="small" className="border border-white" />
            </div>
            <div className="flex justify-between items-center">
              <span>Homework/Assignment Reminders</span>
              <Switch defaultChecked onChange={onChange} size="small" className="border border-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
