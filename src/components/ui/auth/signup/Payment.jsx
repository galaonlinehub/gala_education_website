import {Button, Input, Select} from "antd";
import "../../../../styles/auth/signup.css";

const Payment = () => {
    return(
        <section className="py-12">
            <div className="flex flex-col items-center justify-center w-full gap-3 px-4">
                <span className="font-black text-[16px]">
                    Payment
                </span>
                <span>
                   <span className="font-black text-[12px] leading-5 flex flex-col items-center">10,000 TSH</span>
                   <span className="font-bold text-[12px] leading-5 flex flex-col items-center">(Billed Annually)</span>
                </span>
                <span className="font-semibold text-[14px]">
                    Your subscription will auto-renew yearly until cancelled
                </span>

                <div className="flex gap-6">
                    <Button
                        className="!h-[59.28px] !w-[328.9px] !bg-[#001840] !rounded-[5px] !text-[16px] !text-white !font-black">
                        Bank A/C
                    </Button>
                    <Button
                        className="!h-[59.28px] !w-[328.9px] !bg-[#001840] !rounded-[5px] !text-[16px] !text-white !font-black">
                        Mobile Payment
                    </Button>
                </div>

                <div className="flex gap-3 justify-start items-start">
                    <div className="flex flex-col items-start gap-2">
                        <span className="text-[16px] font-extrabold text-black">Card Number</span>
                        <Input
                            className="!h-[64.52px] !w-[390.06px] !bg-[#001840] !rounded-[5px] !placeholder-[#8C8B8D] placeholder:font-semibold placeholder:text-[13px]"
                            placeholder="1234 1234 1234 1234"/>
                    </div>

                    <div className="flex flex-col items-start gap-2">
                        <span className="text-[16px] font-extrabold text-black">Expiration Date</span>
                        <Input
                            className="!w-[136.14px] !h-[64.52px] !bg-[#001840] !rounded-[5px] !placeholder-[#8C8B8D] placeholder:font-semibold placeholder:text-[13px]"
                            placeholder="MM/YY"/>
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <span className="text-[16px] font-extrabold text-black">Security Code</span>
                        <Input
                            className="!w-[136.14px] !h-[64.52px] !bg-[#001840] !rounded-[5px] !placeholder-[#8C8B8D] placeholder:font-semibold placeholder:text-[13px]"
                            placeholder="CVC"/>
                    </div>

                </div>
                <div className="flex flex-col items-start gap-2">
                        <span className="text-[16px] font-extrabold text-black">
                            Country
                        </span>
                    <div className="!bg-[#001840] !w-[684.12px] !h-[64.52px] !rounded-[5px] flex items-center">
                        {/*<Select*/}
                        {/*    className="w-full h-full !appearance-none !text-white !bg-transparent !border-none"*/}
                        {/*/>*/}
                    </div>
                </div>

                <span className="text-[12px] font-bold text-center !w-[684.12px]">By providing your card information, you allow Gala Education to charge your card for future payments in accordance with their terms.</span>

                <Button className="!bg-[#030DFE] !w-[117.46px] !h-[42.27px] !rounded-[5px] !font-black !text-[16px] !text-white">
                  Pay
                </Button>

            </div>
        </section>
    )
}

export default Payment
