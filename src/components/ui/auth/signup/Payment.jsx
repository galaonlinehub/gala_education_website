import { useState, useEffect } from "react";
import { Button, Input, Card, Modal } from "antd";
import { localStorageFn, sessionStorageFn } from "@/src/utils/fns/client";
import {
  EMAIL_VERIFICATION_KEY,
  PLAN_CONFIRMED_KEY,
} from "@/src/config/settings";
import { decrypt } from "@/src/utils/fns/encryption";
import { LoadingOutlined } from "@ant-design/icons";
import { useTabNavigator } from "@/src/store/auth/signup";
import { useMutation } from "@tanstack/react-query";
import { apiPost } from "@/src/services/api_service";
import { PaymentStatus } from "@/src/config/settings";
import { PaymentPending } from "./PaymentStatus";
import io from "socket.io-client";

const MobilePay = () => {
  const [validationMessage, setValidationMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [plan, setPlan] = useState({});
  const [email, setEmail] = useState("");
  const setActiveTab = useTabNavigator((state) => state.setActiveTab);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [reference, setReference] = useState(null);

  const messages = {
    required: "Phone number is required",
    invalid: "Please enter valid phone number",
  };

  const isValidPhoneNumber = (number) => {
    if (!number || number.length !== 9) return false;
    if (!["6", "7"].includes(number[0])) return false;
    if (!["1", "2", "3", "4", "5", "6"].includes(number[1])) return false;
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
        email: email ?? "denis.mgya@gmail.com",
        phone_number: `255${phoneNumber}`,
        payment_plan_id: plan?.id ?? 3,
      };

      try {
        const response = await apiPost("subscribe-plan", data);
        return response.data;
      } catch (error) {
        console.error("API call failed:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log(data);
      if (data.order_response.resultcode === "000") {
        setReference(data.order_response.data[0].payment_token);
      }
      setTimeout(() => {
        setPaymentStatus(PaymentStatus.REFERENCE);
      }, 5000);
    },
    onError: (error) => {
      setTimeout(() => {
        setPaymentStatus(PaymentStatus.FAILURE);
      }, 5000);
    },
  });

  useEffect(() => {
    getPlan();
    getEmail();
  }, []);

  useEffect(() => {
    const socket = io("https://edusockets.galahub.org/payment",);
    socket.on("connect", () => {
      socket.emit("join", { email: "frankndagula@outlook.com" });
      console.log("Conneted");
    });

    socket.on("paymentResponse", (msg) => {
      console.log("Message", msg);
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    return () => socket.close();
  }, [email]);

  let getPlan = () => {
    const localStorageText = localStorageFn.get(PLAN_CONFIRMED_KEY);
    const decryptedPlan = decrypt(localStorageText);
    setPlan(decryptedPlan);
  };

  var getEmail = () => {
    const sessionStorageText = sessionStorageFn.get(EMAIL_VERIFICATION_KEY);
    const decryptedEmail = decrypt(sessionStorageText);
    setEmail(decryptedEmail);
  };

  const goBack = () => {
    setActiveTab(1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[35rem] md:p-8">
      <Card className="w-full lg:w-3/4 max-w-3xl bg-white rounded-xl p-6 md:p-8">
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            Payment Details
          </h2>

          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="">Amount</span>
              {plan ? (
                <span className="text-xl font-black">
                  {Number(plan.amount).toLocaleString()} TZS
                </span>
              ) : (
                <LoadingOutlined spin className="text-xs" />
              )}
            </div>

            <div className="flex justify-between items-center">
              <span className="">Plan</span>
              {plan ? (
                <span className="text-gray-900 font-black">{plan.name}</span>
              ) : (
                <LoadingOutlined spin className="text-xs" />
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
                <span className="text-red-500">{validationMessage}</span>
              )}
              <span className="text-gray-500">Example: 752451811</span>
            </div>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full !h-10 flex items-center justify-center gap-2 text-white 
                !bg-[#010798] !hover:bg-[#010798] !border-transparent !font-semibold
                rounded-lg transition-colors duration-200"
          >
            Request Payment
          </Button>
        </form>
        <div className="w-full mt-6">
          <span
            onClick={goBack}
            className="font-bold text-[#010798] text-xs cursor-pointer border border-[#010798] p-2 rounded-md"
          >
            Change plan
          </span>
        </div>
      </Card>
      {isModalOpen && (
        <PaymentPending
          open={isModalOpen}
          status={paymentStatus}
          reference={reference ?? null}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MobilePay;
