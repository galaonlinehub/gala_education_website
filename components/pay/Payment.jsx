"use client";
import { Divider, Steps } from "antd";

import { useDevice } from "@/hooks/misc/useDevice";
import { usePay, usePaySteps } from "@/store/pay";

import { ConfirmEnrollPay } from "./Confirm";
import {
  PaymentDetails,
  PayForm,
  MobilePay,
  SwitchPay,
} from "./PaymentDetails";

const { Step } = Steps;

export const Payment = () => {
  const { currentStep, setCurrentStep } = usePaySteps();
  const { width } = useDevice();
  const { mobilePay } = usePay();

  const steps = [
    {
      title: "Pay",

      content: (
        <div className="w-full flex-col flex lg:flex-row justify-between lg:p-[5rem] gap-y-12">
          <PaymentDetails />
          {width < 1024 ? (
            <Divider className="!bg-black w-[30rem]" type="horizontal" />
          ) : (
            <Divider className="!bg-black !h-[30rem]" type="vertical" />
          )}
          <div className="flex flex-col items-center gap-12 w-full">
            <SwitchPay className="w-full" />
            {mobilePay ? (
              <MobilePay className="w-full" />
            ) : (
              <PayForm className="w-full" />
            )}
          </div>
        </div>
      ),
    },
    {
      title: "Confirmation",
      content: <ConfirmEnrollPay />,
    },
  ];

  return (
    <>
      <Steps
        current={currentStep}
        items={steps}
        direction={"horizontal"}
        responsive={false}
      />
      <div>{steps[currentStep].content}</div>
    </>
  );
};
