
'use client'

import React from 'react';
import ConfirmPlan from "@/src/components/ui/auth/signup/ConfirmPlan";
import { Tabs } from 'antd';
import '../../../src/styles/auth/signup.css'
import SignUpForm from "@/src/components/ui/auth/signup/SignUpForm";
import Payment from "@/src/components/ui/auth/signup/Payment";
import InstructorSignUpForm from "@/src/components/ui/auth/signup/InstructorSignUpForm";


const SignupPage = () => {

    return(
        <main className="w-screen min-h-screen flex items-center justify-center">
            <div className='flex justify-center items-center'>
                <Tabs
                className="flex flex-col items-center justify-center"
                centered
                tabBarStyle={{ marginBottom: '20px' }}
                defaultActiveKey="1"
                tabGutter={24}
                indicator={{

                    size: (origin) => origin + 20,
                }}
                items={[
                    {
                        label: <span className='text-black font-bold text-[12px] px-1 sm:px-6'>Confirm Plan</span>,
                        key: '1',
                        children: <ConfirmPlan/>,
                    },
                    {
                        label: <span className='text-black font-bold text-[12px] px-1 sm:px-6'>Sign Up</span>,
                        key: '2',
                        children:(<>
                            { true ? <InstructorSignUpForm/>:
                                         <SignUpForm/>}
                                 </>)
                    },
                    {
                        label: <span className='text-black font-bold text-[12px] px-1 sm:px-6'>Payment</span>,
                        key: '3',
                        children: <Payment/>,
                    }
                ]}
                />
            </div>

        </main>)

}

export default SignupPage;
