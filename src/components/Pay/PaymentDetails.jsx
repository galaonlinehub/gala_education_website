import { Button, Input, Card, Switch } from "antd";
import { CiCreditCard1, CiMobile4, CiCreditCardOff } from "react-icons/ci";
import {
  FaRegClock,
  FaBookOpen,
  FaGraduationCap,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { GoShieldCheck } from "react-icons/go";
import React, { useState, useEffect } from "react";
import { usePay, usePaySteps } from "@/src/store/pay";
import {
  CreditCardOutlined,
  UserOutlined,
  CalendarOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useEnroll } from "@/src/hooks/useEnroll";
import { useMutation } from "@tanstack/react-query";
import { PaymentStatus } from "@/src/config/settings";
import notificationService from "../ui/notification/Notification";
import { apiPost } from "@/src/services/api_service";
import { useEnrollPay } from "@/src/store/student/useEnrollMe";

const PaymentDetails = () => {
  const { enrollMeCohort, enrollMeCohortIsFetching, enrollMeCohortError } =
    useEnroll();

  if (enrollMeCohortIsFetching) {
    return (
      <Card className="!flex !flex-col !items-center !justify-center !w-full !lg:w-1/2 !border-none">
        <>
          <div className="loader"></div>
          <style>
            {`
          .loader {
            width: 50px;
            aspect-ratio: 1;
            border-radius: 50%;
            border: 8px solid #001840;
            animation:
              l20-1 0.8s infinite linear alternate,
              l20-2 1.6s infinite linear;
          }
          @keyframes l20-1 {
            0%    { clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%); }
            12.5% { clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%); }
            25%   { clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 100%); }
            50%   { clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%); }
            62.5% { clip-path: polygon(50% 50%, 100% 0, 100% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%); }
            75%   { clip-path: polygon(50% 50%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 50% 100%, 0% 100%); }
            100%  { clip-path: polygon(50% 50%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 0% 100%); }
          }
          @keyframes l20-2 {
            0%    { transform: scaleY(1) rotate(0deg); }
            49.99%{ transform: scaleY(1) rotate(135deg); }
            50%   { transform: scaleY(-1) rotate(0deg); }
            100%  { transform: scaleY(-1) rotate(-135deg); }
          }
        `}
          </style>
        </>
      </Card>
    );
  }
  return (
    <Card className="!flex !flex-col !items-start !justify-start !w-full !lg:w-1/2 !border-none">
      <div className="w-full mb-6">
        <div className="space-y-2">
          <span className="text-sm text-gray-500">Total Amount</span>
          <div className="flex items-baseline">
            <span className="text-3xl lg:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
              Tshs {enrollMeCohort?.price?.toLocaleString()}
            </span>
            <span className="text-xl text-gray-600 ml-1">/=</span>
          </div>
        </div>
      </div>
      <div className="w-full space-y-8">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-gray-600">
            <FaUsers className="w-4 h-4" />
            <span className="text-sm font-medium">Class Name </span>
          </div>
          <span className="font-bold text-xl line-clamp-2 w-full text-gray-800">
            {enrollMeCohort?.cohort_name}
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-gray-600">
            <FaBookOpen className="w-4 h-4" />
            <span className="text-sm font-medium">Topic</span>
          </div>
          <span className="font-bold text-xl line-clamp-2 w-full text-gray-800">
            {enrollMeCohort?.topic_title}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-gray-600">
            <FaGraduationCap className="w-4 h-4" />
            <span className="text-sm font-medium">Subject</span>
          </div>
          <div className="font-semibold text-lg text-gray-800">
            {enrollMeCohort?.subject}
          </div>
        </div>

        <div>
          <div className="space-y-3">
            <div className="space-y-2">
              <span className="text-sm text-gray-600 flex items-center space-x-2">
                <FaUser className="w-4 h-4" />
                <span className="text-sm font-medium">Instructor</span>
              </span>
              <div className="font-semibold text-lg text-gray-800 capitalize">
                {enrollMeCohort?.instructor_name}
              </div>
            </div>

            <div className="flex items-center space-x-2 text-gray-600 pt-1 border-t border-gray-200">
              <FaRegClock className="w-4 h-4" />
              <div className="flex items-baseline">
                <span className="font-semibold text-lg">
                  {enrollMeCohort?.total_weeks}
                </span>
                <span className="ml-1 text-sm">Weeks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const MobilePay = () => {
  const [validationMessage, setValidationMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { setCurrentStep } = usePaySteps();
  const { setEnrollPayStatus, setReference } = useEnrollPay();
  const { enrollMeCohort } = useEnroll();

  const messages = {
    required: "Phone number is required",
    invalid: "Please enter valid phone number",
  };

  const isValidPhoneNumber = (number) => {
    if (!number || number.length !== 9) return false;
    if (!["6", "7"].includes(number[0])) return false;
    if (!["1", "2", "3", "4", "5", "6", "7", "8"].includes(number[1]))
      return false;
    if (!["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(number[2]))
      return false;
    return true;
  };

  const validateInput = (value) => {
    if (!value) return messages.required;
    if (!isValidPhoneNumber(value)) return messages.invalid;
    return "";
  };

  const handleKeyPress = (e) => {
    if (
      [
        "Enter",
        "Shift",
        "CapsLock",
        "Tab",
        "Control",
        "Alt",
        "Meta",
        "ArrowLeft",
        "ArrowRight",
        "Backspace",
        "Delete",
        "ArrowUp",
        "ArrowDown",
        "Home",
      ].includes(e.key)
    ) {
      return;
    }

    if (!/^\d$/.test(e.key) || e.target.value.length >= 9) {
      e.preventDefault();
      setValidationMessage(messages.invalid);
      return;
    }

    const newValue = e.target.value;
    setPhoneNumber(newValue);
    setValidationMessage(validateInput(newValue));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setValidationMessage(validateInput(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const validationResult = validateInput(phoneNumber);
      if (validationResult) {
        setValidationMessage(validationResult);
        return;
      }
      mutation.mutate();
      setEnrollPayStatus(PaymentStatus.LOADING);
    } catch (e) {
      notificationService.error({
        message: "",
        customStyle: { paddingTop: "0px" },
      });
    } finally {
    }
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const data = {
        phone_number: `255${phoneNumber}`,
        cohort_id: enrollMeCohort?.cohort_id,
      };

      try {
        const response = await apiPost("join_cohort", data);
        return response.data;
      } catch (error) {
        console.error("API call failed:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      if (data.order_response.resultcode === "000") {
        setCurrentStep(1);
        setReference(data.order_response.data[0].payment_token);
      }
    },
    onError: (error) => {
      notificationService.error({
        message: "",
        description: `${error?.message},\tFailed to process payment please try again later`,
        duration: 10,
        customStyle: { paddingTop: "0px" },
      });
    },
  });

  return (
    <Card className="!border-none !w-full !lg:w-1/2 !h-full !bg-transparent ">
      <span className="font-black text-3xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 pb-3 mb-8 inline-block">
        Mobile Payment
      </span>
      <form
        onSubmit={handleSubmit}
        className="flex flex-1 flex-col gap-6 !w-full"
      >
        <div className="flex flex-col gap-1 !w-full">
          <span className="text-xs">Phone Number</span>
          <Input
            className="!w-full"
            addonBefore="+255"
            value={phoneNumber}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            onPaste={(e) => {
              e.preventDefault();
              setValidationMessage(messages.invalid);
            }}
            autoComplete="off"
            maxLength={9}
          />
          <div className="flex justify-between w-full">
            {validationMessage && (
              <span className="text-red-500 text-[10px]">
                {validationMessage}
              </span>
            )}
            <span className="text-[10px] self-end">Example (752451811)</span>
          </div>
        </div>
        <Button
          loading={mutation.isPending}
          type="primary"
          htmlType="submit"
          className="!flex !w-full !items-center !justify-center !gap-2 !text-white !bg-gradient-to-r from-gray-800 to-gray-600 !text-[10px] !border-transparent !hover:border-transparent"
        >
          Request Payment <GoShieldCheck />
        </Button>
      </form>
    </Card>
  );
};

const PayForm = () => {
  return (
    <Card className="!border-none !w-full !lg:w-1/2 !h-full !bg-transparent ">
      <span className="font-black text-3xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 pb-3 mb-8 inline-block">
        Card Payment
      </span>
      <div className="flex flex-col gap-6">
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 bottom-0 opacity-50 z-10 rounded-lg" />

          <div className="flex flex-col gap-6">
            <Input
              prefix={<CreditCardOutlined />}
              placeholder="Card Number"
              disabled
            />
            <Input
              prefix={<UserOutlined />}
              placeholder="Card Holder Name"
              disabled
            />
            <div className="flex justify-between gap-6">
              <Input
                prefix={<CalendarOutlined />}
                placeholder="MM/YY"
                className="w-1/2"
                disabled
              />
              <Input
                prefix={<LockOutlined />}
                placeholder="CVC"
                className="w-1/2"
                disabled
              />
            </div>
          </div>

          <Button
            className="w-full mt-6 flex items-center justify-center gap-2 !text-white !text-[10px] !cursor-not-allowed"
            type="primary"
            disabled
            style={{
              background:
                "linear-gradient(to right, rgb(31, 41, 55), rgb(75, 85, 99))",
            }}
          >
            Pay
          </Button>
        </div>

        <div className="text-black mt-2 text-[12px] flex flex-col items-center gap-1">
          <CiCreditCardOff size={40} />
          Card payment is currently unavailable
        </div>
      </div>
    </Card>
  );
};

const SwitchPay = () => {
  const { setMobilePay, mobilePay } = usePay();

  const switchPay = () => {
    setMobilePay((isMobile) => !isMobile);
  };

  return (
    <div className="w-3/4 self-center flex items-center justify-center">
      <Switch
        className="!w-1/2"
        checked={mobilePay}
        checkedChildren={
          <div className="flex items-center justify-center gap-2 items-xs">
            Mobile
            <CiMobile4 size={15} />
          </div>
        }
        unCheckedChildren={
          <div className="flex items-center justify-center gap-2 items-xs">
            Card
            <CiCreditCard1 size={15} />
          </div>
        }
        onChange={switchPay}
      />
    </div>
  );
};

export { PaymentDetails, PayForm, MobilePay, SwitchPay };
