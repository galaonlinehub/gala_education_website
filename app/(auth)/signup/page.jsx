'use client'

import React, { useState } from 'react';
import '../../../src/styles/auth/signup.css';
import SignUpForm from "@/src/components/ui/auth/signup/SignUpForm";
import Payment from "@/src/components/ui/auth/signup/Payment";
import InstructorSignUpForm from "@/src/components/ui/auth/signup/InstructorSignUpForm";
import ConfirmPlan from "@/src/components/ui/auth/signup/ConfirmPlan";
import { useTabNavigator } from "@/src/store/auth/signup";
import { message } from 'antd';


const SignupPage = () => {
  const {activeTab, setActiveTab} = useTabNavigator((state) => state)
  const tabs = [
    {
      key: 1,
      label: <span className='text-black font-bold text-[10px] sm:text-[14px] px-1 sm:px-6 whitespace-nowrap overflow-hidden truncate'>Sign Up</span>,
      content: <>{true ? <InstructorSignUpForm /> : <SignUpForm />}</>,
    },
    {
      key: 2,
      label: <span className='text-black font-bold text-[10px] sm:text-[14px] px-1 sm:px-6 whitespace-nowrap overflow-hidden truncate'>Confirm Plan</span>,
      content: <ConfirmPlan />,
    },
    {
      key: 3,
      label: <span className='text-black font-bold text-[10px] sm:text-[14px] px-1 sm:px-6 whitespace-nowrap overflow-hidden truncate'>Payment</span>,
      content: <Payment />,
    },
  ];

  const handleTabClick = i => {
    if (i === activeTab) return;

    const messageText = i < activeTab
        ? "You can not go back, finish all steps."
        : "Complete this stage to proceed.";

    message.info(messageText);
};


  const TabPane = ({ children, isActive }) => (
    <div
      className={`w-full  ${
        isActive ? 'block tab-enter' : 'hidden tab-exit'
      }`}
    >
      {children}
    </div>
  );

  return (
    <main className="p-3 w-screen min-h-screen flex flex-col items-center">
      <div className="relative">
        <div className="absolute rounded-sm bottom-0 w-full h-2 bg-gray-300"></div>
        <nav className="relative flex justify-around">
          {tabs.map((tab, index) => (
            <div key={tab.key} className="relative">
              <button
                onClick={() => handleTabClick(index)}
                className={`
                  relative py-6 px-8 text-sm font-medium
                  ${
                    activeTab === index
                      ? 'text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }
                  focus:outline-none focus:text-blue-800
                  transition-colors duration-200
                `}
              >
                {tab.label}
                {activeTab === index && (
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#010798] rounded-sm"></div>
                )}
              </button>
            </div>
          ))}
        </nav>
      </div>

      <div className="mt-1 w-full">
        {tabs.map((tab, index) => (
          <TabPane key={tab.key} isActive={activeTab === index}>
            {tab.content}
          </TabPane>
        ))}
      </div>
    </main>
  );
};

export default SignupPage;
