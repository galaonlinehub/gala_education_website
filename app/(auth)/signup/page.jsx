"use client";

import React, { useEffect } from "react";
import { Steps, message } from "antd";
import SignUpForm from "@/src/components/ui/auth/signup/SignUpForm";
import SignupPay from "@/src/components/ui/auth/signup/Payment";
import InstructorSignUpForm from "@/src/components/ui/auth/signup/InstructorSignUpForm";
import ConfirmPlan from "@/src/components/ui/auth/signup/ConfirmPlan";
import { useTabNavigator, useAccountType } from "@/src/store/auth/signup";
import { SIGN_UP_NAVIGATOR_KEY } from "@/src/config/settings";

const SignupPage = () => {
  const { accountType } = useAccountType();
  const { activeTab, setActiveTab } = useTabNavigator();

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === SIGN_UP_NAVIGATOR_KEY) {
        const newValue = JSON.parse(e.newValue);
        setActiveTab(newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [setActiveTab]);

  const steps = [
    {
      title: "Sign Up",
      content:
        accountType === "instructor" ? (
          <InstructorSignUpForm />
        ) : (
          <SignUpForm />
        ),
    },
    {
      title: "Confirm Plan",
      content: <ConfirmPlan />,
    },
    {
      title: "Payment",
      content: <SignupPay />,
    },
  ];

  const handleStepChange = (current) => {
    if (current === activeTab) return;

    const messageText =
      current < activeTab
        ? "You can not go back, finish all steps."
        : "Complete this stage to proceed.";

    message.info({
      content: (
        <div className="font-extralight text-xs py-1">{messageText}</div>
      ),
      duration: 10.0,
    });
  };

  const items = steps.map((step) => ({
    key: step.title,
    title: step.title,
  }));

  return (
    <main className="p-3 w-screen flex flex-col items-center ">
      <div className="w-full max-w-4xl">
        <Steps
          className="!w-full !overflow-x-scroll"
          current={activeTab}
          onChange={handleStepChange}
          items={items}
          responsive={false}
          direction={"horizontal"}
        />

        {steps[activeTab].content}
      </div>
    </main>
  );
};

export default SignupPage;
