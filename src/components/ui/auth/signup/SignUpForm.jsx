import SignupPage from "@/app/(auth)/signup/page";
import StudentSignUpVectorSvg from "@/src/utils/vector-svg/sign-up/StudentSignUpVectorSvg";
import {Button, Input} from "antd";

const SignUpForm = () => {

    return(
        <section className="flex flex-col items-center justify-center h-full w-screen py-12">
            <div className="flex flex-col items-center justify-center h-full w-screen lg:w-1/2 gap-4">
                <span className={'text-center text-[12px] leading-5 font-semibold'}>
                    Step into the realm of endless possibilities! Your adventure in knowledge
                    begins here—unlock doors to boundless learning, forge your path, and let curiosity be your guide.
                    Sign up and let the journey of brilliance unfold!
                </span>
                <form className='flex flex-col justify-center items-center w-full px-5 md:px-10 gap-4'>
                    <div className='items-start flex flex-col w-full font-black text-[16px] gap-3'>
                        <span className='text-[16px] leading-5'>Full Name *</span>
                        <Input placeholder="Enter Full Name"
                               className="!border-[3px] !rounded-none !border-[#030DFE] !text-xs !font-semibold  !w-[100%] !h-[49.79px]"/>
                    </div>

                    <div className='items-start flex flex-col w-full font-black text-[16px] gap-3'>
                        <span className='text-[16px] leading-5'>Username *</span>
                        <Input placeholder="Enter Full Name"
                               className="!border-[3px] !rounded-none !border-[#030DFE] !text-xs !font-semibold !w-[100%] !h-[49.79px]"/>
                    </div>

                    <div className='items-start flex flex-col w-full font-black text-[16px] gap-3'>
                        <span className='text-[16px] leading-5'>Email *</span>
                        <Input placeholder="Enter Full Name"
                               className="!border-[3px] !rounded-none !border-[#030DFE] !text-xs !font-semibold  !w-[100%] !h-[49.79px]"/>
                    </div>
                    <div className='items-start flex flex-col w-full font-black text-[16px] gap-3'>
                        <span className='text-[16px] leading-5'>Password *</span>
                        <Input placeholder="Enter Full Name"
                               className="!border-[3px] !rounded-none !border-[#030DFE] !text-xs !font-semibold  !w-[100%] !h-[49.79px]"/>
                    </div>

                    <Button type='submit'
                            className="!w-[117.46px] !h-[42.27px] !bg-[#030DFE] self-center  !text-[16px] !font-black !text-[#FFFFFF]">
                        Sign Up
                    </Button>
                </form>

                <span className="text-center text-[12px]">
                    Creating an account means you’re okay with our <span className="text-[#030DFE] font-bold"> Terms of Service</span> &<span
                    className="text-[#030DFE] font-bold"> Privacy Policy</span>.
                </span>

            </div>

           <StudentSignUpVectorSvg/>
        </section>
    )
}

export default SignUpForm;
