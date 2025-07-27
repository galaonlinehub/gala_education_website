import { useMutation } from "@tanstack/react-query";
import { Button, Input, Card } from "antd";
import { useState, useEffect } from "react";
import io from "socket.io-client";

import { Contact } from "@/src/components/layout/Contact";
import {
  EMAIL_VERIFICATION_KEY,
  PLAN_CONFIRMED_KEY,
  socket_base_url,
} from "@/src/config/settings";
import { PaymentStatus } from "@/src/config/settings";
import { useUser } from "@/src/hooks/data/useUser";
import { apiPost } from "@/src/services/api/api_service";
import { useTabNavigator } from "@/src/store/auth/signup";
import { localStorageFn, sessionStorageFn } from "@/src/utils/fns/client";
import { decrypt } from "@/src/utils/fns/encryption";

import { PaymentPending } from "./PaymentStatus";
import SlickSpinner from "../../loading/template/SlickSpinner";


const MobilePay = () => {
  const [validationMessage, setValidationMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [plan, setPlan] = useState({});
  const [email, setEmail] = useState("");
  const { setActiveTab, activeTab } = useTabNavigator();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [reference, setReference] = useState(null);
  const { user } = useUser();

  const messages = {
    required: "Phone number is required",
    invalid: "Please enter valid phone number",
  };

  const isValidPhoneNumber = (number) => {
    if (!number || number.length !== 9) return false;
    if (!["6", "7"].includes(number[0])) return false;
    if (!["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(number[1]))
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
      if (plan) {
        setIsModalOpen(true);
        setPaymentStatus(PaymentStatus.LOADING);
        mutation.mutate();
      }
    } catch (e) {
      console.error(e);
    } finally {
    }
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const data = {
        email: email,
        phone_number: `255${phoneNumber}`,
        payment_plan_id: plan?.id,
      };

      try {
        const response = await apiPost("/subscribe-plan", data);
        return response.data;
      } catch (error) {
        console.error("API call failed:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      if (data.order_response.resultcode === "000") {
        setReference(data.order_response.data[0].payment_token);
      }
    },
    onError: (error) => {
      setPaymentStatus(PaymentStatus.FAILURE);
    },
  });

  useEffect(() => {
    const socket = io(`${socket_base_url}payment`);
    if (!email) return;
    socket.on("connect", () => {
      socket.emit("join", { id: email });
    });

    socket.on("paymentResponse", (msg) => {
      if (msg.status === "success") {
        setPaymentStatus(PaymentStatus.SUCCESS);
      } else {
        setPaymentStatus(PaymentStatus.REFERENCE);
      }
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    return () => socket.close();
  }, [email, user]);

  useEffect(() => {
    const getEmail = () => {
      const sessionStorageText = sessionStorageFn.get(EMAIL_VERIFICATION_KEY);
      const decryptedEmail = user ? user.email : decrypt(sessionStorageText);
      setEmail(decryptedEmail);
    };

    const getPlan = () => {
      const localStorageText = localStorageFn.get(PLAN_CONFIRMED_KEY);
      const decryptedPlan = localStorageText && decrypt(localStorageText);
      setPlan(decryptedPlan);
    };

    getPlan();
    getEmail();
  }, [user]);

  const goBack = () => {
    setActiveTab(activeTab - 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[35rem] xs:p-4 md:p-8">
      <Card
        className="w-full lg:w-3/4 max-w-3xl bg-white rounded-xl border-0 md:border-[0.8px] md:border-gray-200
          [&_.ant-card-body]:!p-0 sm:[&_.ant-card-body]:!p-3 md:[&_.ant-card-body]:!p-8 !py-2 md:!py-0"
      >
        <div className="mb-8">
          <h2 className="text-sm xxs:text-lg xs:text-text-xl sm:text-2xl md:text-2xl font-bold text-gray-900 mb-4">
            Payment Details
          </h2>

          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex flex-col xxs:flex-row justify-between items-start xxs:items-center">
              <span className="text-xs sm:text-sm mb-1 xxs:mb-0">Amount</span>
              {plan ? (
                <span className="text-xl font-black">
                  {Number(plan.amount).toLocaleString()} TZS
                </span>
              ) : (
                <SlickSpinner color="#010798" size={12} />
              )}
            </div>

            <div className="flex flex-col xxs:flex-row justify-between items-start xxs:items-center">
              <span className="text-xs sm:text-sm mb-1 xxs:mb-0">Plan</span>
              {plan ? (
                <span className="text-gray-900 font-black">{plan.name}</span>
              ) : (
                <SlickSpinner color="#010798" size={12} />
              )}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <Input
              className="w-full rounded-lg"
              addonBefore={
                <span className="text-gray-600 font-medium">255</span>
              }
              value={phoneNumber}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              onPaste={(e) => {
                e.preventDefault();
                setValidationMessage(messages.invalid);
              }}
              autoComplete="off"
              maxLength={9}
              placeholder="752451811"
            />

            <div className="flex justify-between items-center text-xs mt-1">
              {validationMessage && (
                <span className="text-red-500 text-[10px] xxs:text-xs line-clamp-2">
                  {validationMessage}
                </span>
              )}
              <span className="text-gray-500 text-[10px] xxs:text-xs line-clamp-2">
                Example: 752451811
              </span>
            </div>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full !h-10 flex items-center justify-center gap-2 text-white 
                !bg-[#010798] hover:!opacity-80 !border-transparent !font-semibold
                rounded-lg transition-colors duration-200 text-[11px] xxs:text-sm"
          >
            Request Payment
          </Button>
        </form>
        <div className="w-full mt-6 flex justify-between">
          <div
            onClick={goBack}
            className="font-bold text-[#010798] text-xs cursor-pointer border border-[#010798] p-2 rounded-md"
          >
            Change plan
          </div>

          <Contact useBillingContact={true} />
        </div>
      </Card>
      {isModalOpen && (
        <PaymentPending
          open={isModalOpen}
          status={paymentStatus}
          setStatus={setPaymentStatus}
          reference={reference ?? null}
          amount={plan.amount ?? null}
          onClose={() => setIsModalOpen(false)}
          mutationFn={mutation.mutate}
        />
      )}
    </div>
  );
};

export default MobilePay;
