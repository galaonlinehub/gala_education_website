"use client"
import { Divider, Steps, Result, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
  PaymentDetails,
  PayForm,
  MobilePay,
  SwitchPay,
} from "./PaymentDetails";
import { useDevice } from "@/src/hooks/useDevice";
import { usePay, usePaySteps } from "@/src/store/pay";

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
      content: (
        <div className="w-full h-[calc(100vh-20rem)] flex flex-col items-center justify-center gap-4">
          <LoadingOutlined style={{ fontSize: 24 }} />
          <span>Processing payment...</span>

          <Result
            status="success"
            title="Successfully Purchased Cloud Server ECS!"
            subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
            extra={[
              <Button type="primary" key="console">
                Go Console
              </Button>,
              <Button key="buy">Buy Again</Button>,
            ]}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Steps current={currentStep} items={steps} />
      <div>{steps[currentStep].content}</div>
    </>
  );
};


