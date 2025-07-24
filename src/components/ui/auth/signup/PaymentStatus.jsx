import { useState, useEffect, useMemo } from "react";
import { Result, Modal, Progress } from "antd";
import { PaymentStatus, SUPPORT_EMAIL } from "@/src/config/settings";
import { CloseCircleOutlined } from "@ant-design/icons";
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { useDevice } from "@/src/hooks/misc/useDevice";
import InstructorSignUpFeedback from "@/src/components/teacher/InstructorSignUpFeedback";
import SlickSpinner from "../../loading/template/SlickSpinner";
import {
  LuCircleCheckBig,
  LuHash,
  LuLock,
  LuShieldCheck,
  LuWallet,
} from "react-icons/lu";
import { useAccountType } from "@/src/store/auth/signup";
import { usePathname } from "next/navigation";
import { useUser } from "@/src/hooks/data/useUser";
import { Contact } from "@/src/components/layout/Contact";
import { useQueryClient } from "@tanstack/react-query";

export const RenderLoadingState = ({ setStatus }) => {
  const [percent, setPercent] = useState(0);
  const [seconds, setSeconds] = useState(45);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prevPercent) => {
        if (prevPercent >= 93) return prevPercent;
        return prevPercent + 1;
      });

      setSeconds((prevSeconds) => {
        if (prevSeconds <= 5) return prevSeconds;
        return prevSeconds - 1;
      });
    }, 500);

    const timeout = setTimeout(() => {
      setStatus(PaymentStatus.FAILURE);
    }, 60000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [setStatus]);

  const statusMessages = [
    "Initiating secure connection...",
    "Verifying transaction details...",
    "Checking payment gateway...",
    "Encrypting your data...",
    "Almost there! Finalizing payment...",
  ];

  const getStatusMessage = () => {
    const index = Math.floor((percent / 100) * statusMessages.length);
    return statusMessages[index % statusMessages.length];
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full max-w-md mx-auto xxs:px-4">
      <div className="w-full space-y-8">
        <div className="flex justify-center mb-6 sm:mb-8">
          <SlickSpinner size={32} color="#010798" />
        </div>
        <div className="space-y-6 text-center">
          <h2 className="text-lg xxs:text-xl xs:text-2xl font-semibold text-primary line-clamp-2">
            Processing Your Payment
          </h2>
          <p className="xxs:text-xs xs:text-sm text-muted-foreground line-clamp-2">
            {getStatusMessage()}
          </p>
          <div className="space-y-2 xxs:space-y-4">
            <Progress
              percent={percent}
              size="large"
              strokeColor="#010798"
              trailColor="#e5e7eb"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md"
              showInfo={false}
            />
            <div className="flex justify-between items-center text-xs xxs:text-sm">
              <span className="text-muted-foreground">
                Progress: {Math.round(percent)}%
              </span>
              <span className="font-medium text-primary">
                {Math.round(seconds)}s
              </span>
            </div>
          </div>
          <div className="my-8 flex items-center justify-center gap-1 xxs:gap-2">
            <LuShieldCheck size={24} />
            <span className="text-[10px] xxs:text-xs line-clamp-2 text-muted-foreground">
              Your transaction is protected by end-to-end encryption
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RenderSuccessState = ({
  onClose,
  accountType,
  setStatus,

  queryClient,
  user,
}) => {
  if (accountType === "instructor") {
    setTimeout(() => {
      setStatus(PaymentStatus.CONGRATULATION);
      queryClient.invalidateQueries(["auth-user"]);
    }, 10000);
  }

  const onDone = () => {
    if (accountType === "instructor") {
      setStatus(PaymentStatus.CONGRATULATION);
    } else {
      if (!user) {
        setTimeout(() => {
          window.location.href = "/signin";
        }, 5000);
      }
      onClose();
    }

    queryClient.invalidateQueries(["auth-user"]);
  };

  return (
    <div className="flex flex-col items-center justify-center p-1 xxs:p-4 min-w-[50px] max-w-[600px] mx-auto mt-4 xs:mt-8">
      <LuCircleCheckBig
        strokeWidth={3}
        className="text-green-500 text-3xl xxs:text-6xl mb-4"
      />
      <span className="text-base xxs:text-2xl font-semibold text-gray-800 text-center">
        Payment Successful!
      </span>
      <div className="space-y-4 mt-4 md:mt-6 lg:mt-8 w-full text-center">
        <p className="text-gray-600 text-xs md:text-sm">
          Your transaction has been completed successfully.
        </p>
        <p className="text-gray-500 text-xs md:text-sm">
          A confirmation email will be sent shortly.
        </p>
      </div>
      <button
        onClick={onDone}
        className="my-12 text-xs xxs:text-base px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 w-full max-w-[300px]"
      >
        Done
      </button>
    </div>
  );
};

export const RenderReferenceState = ({
  reference,
  amount,
  onClose,
  donation,
}) => (
  <div className="flex flex-col items-center py-6 xxs:py-0 xxs:p-4 min-w-[50px] max-w-[600px] mx-auto">
    <HiMiniDevicePhoneMobile className="text-[#001840] text-4xl mb-4" />
    <div className="flex flex-col gap-3 w-full">
      <div className="text-center">
        <p className="text-gray-600 mb-1 text-[10px] xxs:text-sm line-clamp-2">
          To complete your payment:
        </p>
      </div>
      <div className="flex flex-col xxs:flex-row items-center justify-center text-[#001840] bg-blue-50 p-3 rounded-lg">
        <span>1. Dial</span>
        <span className="font-black ml-2">*150*50*1#</span>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-lg">
          <LuHash className="text-[#001840] text-xl" />
          <div className="flex flex-col items-center justify-center">
            <span className="font-medium">2. Enter Reference Number</span>
            <p className="text-lg text-[#001840] font-black mt-1 text-center">
              {reference ?? "---"}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-lg">
          <LuWallet className="text-[#001840] text-xl" />
          <div className="flex flex-col items-center justify-center">
            <span className="font-medium">
              {donation
                ? "3. Enter Amount"
                : "3. Enter Amount for plan selected"}
            </span>
            <p className="text-lg text-[#001840] font-black mt-1 text-center">
              {amount?.toLocaleString()} TZS
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-lg">
          <LuLock className="text-[#001840] text-xl" />
          <div className="flex flex-col items-center justify-center">
            <span className="font-medium">4. Enter PIN to Confirm</span>
            <p className="text-xs text-gray-500 mt-1 text-center">
              Enter your mobile money PIN to complete payment
            </p>
          </div>
        </div>
      </div>
    </div>
    <button
      onClick={onClose}
      className="my-8 px-6 py-2 bg-[#010798] text-white rounded-lg hover:opacity-80 transition-colors duration-200 w-full max-w-[400px]"
    >
      Done
    </button>
  </div>
);

export const RenderFailureState = ({ onClose, setStatus, mutationFn }) => {
  const mailto = `mailto:${SUPPORT_EMAIL}?subject=Payment%20Failure`;
  const reload = () => {
    setStatus(PaymentStatus.LOADING);
    mutationFn();
  };

  return (
    <Result
      icon={
        <CloseCircleOutlined className="!text-red-500 !text-xl xxs:!text-4xl xs:!text-6xl" />
      }
      title={
        <span className="text-base xxs:text-lg xs:text-2xl font-semibold text-gray-800 line-clamp-2">
          Payment Failed
        </span>
      }
      subTitle={
        <div className="space-y-3 mt-4">
          <p className="text-gray-600 line-clamp-3 text-[12px] xxs:text-xs sm:text-sm">
            We couldn&apos;t process your payment at this time.
          </p>
          <p className="text-gray-500 line-clamp-3 text-[12px] xxs:text-xs lg:text-sm">
            Please try again or
            <a
              className="mx-1 text-[#030DFE] hover:text-[#030DFE]/70 text-[12px] xxs:text-xs lg:text-sm"
              href={mailto}
            >
              Contact Support
            </a>
            if the issue persists.
          </p>
        </div>
      }
      extra={[
        <div key="extras" className="flex flex-col items-center justify-center">
          <button
            key="tryAgain"
            onClick={reload}
            className="px-6 py-1 xxs:py-2 sm:py-3 bg-[#010798] text-white rounded-lg hover:opacity-80 transition-colors w-3/4 duration-200 text-[10px] xxs:text-xs line-clamp-1"
          >
            Try Again
          </button>
          ,
          <button
            key="cancel"
            onClick={onClose}
            className="px-6 py-1 xxs:py-2 sm:py-3 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 w-3/4 transition-colors duration-200 text-[10px] xxs:text-xs line-clamp-1"
          >
            Cancel
          </button>
        </div>,
      ]}
    />
  );
};

export const PaymentPending = ({
  open,
  onClose,
  status,
  setStatus,
  reference,
  amount,
  mutationFn,
}) => {
  const { width } = useDevice();
  const [modalSize, setModalSize] = useState({ width: 520, height: 520 });
  const { accountType, setAccountType } = useAccountType();
  const url = usePathname();
  const { user: rawUser } = useUser();
  const user = useMemo(() => rawUser, [rawUser]);
  const queryClient = useQueryClient();

  useEffect(() => {
    const updateSize = () => {
      if (width < 600) {
        setModalSize({ width: 400, height: 400 });
      } else {
        setModalSize({ width: 460, height: 460 });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [width]);

  useEffect(() => {
    if (user) {
      const newUrl = url.split("/")[1];
      setAccountType(newUrl);
    }
  }, [setAccountType, url, user]);

  return (
    <Modal
      title={
        <span className="text-xl font-semibold line-clamp-1">
          Gala Education
        </span>
      }
      centered={false}
      open={open}
      footer={null}
      width={status === PaymentStatus.CONGRATULATION ? 720 : modalSize.width}
      closable={status !== PaymentStatus.LOADING}
      maskClosable={status !== PaymentStatus.LOADING}
      onCancel={onClose}
      styles={{
        body: {
          height:
            status === PaymentStatus.CONGRATULATION
              ? "540px"
              : `${modalSize.height}px`,
          overflowY: "auto",
        },
      }}
    >
      {status === PaymentStatus.LOADING && (
        <RenderLoadingState setStatus={setStatus} />
      )}
      {status === PaymentStatus.SUCCESS && (
        <RenderSuccessState
          onClose={onClose}
          accountType={String(accountType)}
          setStatus={setStatus}
          queryClient={queryClient}
          user={user}
        />
      )}
      {status === PaymentStatus.REFERENCE && (
        <RenderReferenceState
          reference={reference}
          amount={amount}
          onClose={onClose}
        />
      )}
      {status === PaymentStatus.FAILURE && (
        <RenderFailureState
          onClose={onClose}
          setStatus={setStatus}
          mutationFn={mutationFn}
        />
      )}

      {status === PaymentStatus.CONGRATULATION && (
        <InstructorSignUpFeedback onClose={onClose} />
      )}

      <div className="mt-2">
        <Contact useBillingContact={true} />
      </div>
    </Modal>
  );
};
