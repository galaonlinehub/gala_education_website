'use client';

import { Steps, message } from 'antd';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';

import InstructorContract from '@/components/student/StudentContract';
import StudentContract from '@/components/teacher/InstructorContract';
import ConfirmPlan from '@/components/ui/auth/signup/ConfirmPlan';
import InstructorSignUpForm from '@/components/ui/auth/signup/InstructorSignUpForm';
import SignupPay from '@/components/ui/auth/signup/Payment';
import SignUpForm from '@/components/ui/auth/signup/SignUpForm';
import { SIGN_UP_NAVIGATOR_KEY } from '@/config/settings';
import { useTabNavigator, useAccountType } from '@/store/auth/signup';

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

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [setActiveTab]);

  const t = useTranslations('sign_up');

  const steps = [
    {
      title: t('sign_up'),
      content: accountType === 'instructor' ? <InstructorSignUpForm /> : <SignUpForm />,
    },
    {
      title: t('confirm_plan'),
      content: <ConfirmPlan />,
    },
    {
      title: t('payment'),
      content: <SignupPay />,
    },
  ];

  const handleStepChange = (current) => {
    if (current === activeTab) return;

    const messageText = current < activeTab ? t('complete_all_steps') : t('complete_step');

    message.info({
      content: <div className="font-extralight text-xs py-1">{messageText}</div>,
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
          direction={'horizontal'}
        />

        {steps[activeTab].content}
      </div>
      {accountType == 'instructor' ? <StudentContract /> : <InstructorContract />}
    </main>
  );
};

export default SignupPage;
