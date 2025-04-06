import { useState, useEffect } from "react";
import { Result, Modal, Progress } from "antd";
import { PaymentStatus } from "@/src/config/settings";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
  NumberOutlined,
  WalletOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { useDevice } from "@/src/hooks/useDevice";
import { useRouter } from "next/navigation";
import { GoShieldCheck } from "react-icons/go";

export const RenderLoadingState = () => {
  const [percent, setPercent] = useState(0);
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const duration = 30 * 1000;
    const intervalTime = 100;
    const steps = duration / intervalTime;
    const percentIncrement = 100 / steps;
    const secondsDecrement = 30 / steps;

    const interval = setInterval(() => {
      setPercent((prevPercent) => {
        if (prevPercent >= 100) {
          clearInterval(interval);
          setSeconds(0);
          return 100;
        }
        return prevPercent + percentIncrement;
      });

      setSeconds((prevSeconds) => {
        if (prevSeconds <= 0) return 0;
        return prevSeconds - secondsDecrement;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  const getStatusMessage = () => {
    if (percent < 33) return "Initiating secure connection...";
    if (percent < 66) return "Verifying transaction details...";
    return "Almost there! Finalizing payment...";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full max-w-md mx-auto px-4">
      <div className="w-full space-y-8">
        <div className="flex justify-center">
          <LoadingOutlined className="text-2xl md:text-3xl text-[#010798] mb-6 sm:mb-8" />
        </div>
        <div className="space-y-6 text-center">
          <h2 className="text-2xl font-semibold text-primary">
            Processing Your Payment
          </h2>
          <p className="text-sm text-muted-foreground">{getStatusMessage()}</p>
          <div className="space-y-4">
            <Progress
              percent={percent}
              size="default"
              strokeColor="#010798"
              trailColor="#e5e7eb"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md"
              strokeWidth={8}
              showInfo={false}
            />
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">
                Progress: {Math.round(percent)}%
              </span>
              <span className="font-medium text-primary">
                {Math.round(seconds)}s
              </span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-6 flex items-center justify-center gap-2">
            <GoShieldCheck /> Your transaction is protected by end-to-end
            encryption
          </div>
        </div>
      </div>
    </div>
  );
};

export const RenderSuccessState = ({ onClose }) => (
  <Result
    icon={<CheckCircleOutlined className="!text-green-500 text-2xl" />}
    title={
      <span className="text-2xl font-semibold text-gray-800">
        Payment Successful!
      </span>
    }
    subTitle={
      <div className="space-y-4 mt-4 md:mt-6 lg:mt-8">
        <p className="text-gray-600 text-xs md:text-sm">
          Your transaction has been completed successfully.
        </p>
        <p className="text-gray-500 text-xs md:text-sm">
          A confirmation email will be sent shortly.
        </p>
      </div>
    }
    extra={[
      <button
        key="done"
        onClick={onClose}
        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 w-3/4"
      >
        Done
      </button>,
    ]}
  />
);

export const RenderReferenceState = ({ reference, amount, onClose }) => (
  <Result
    icon={
      <HiMiniDevicePhoneMobile className="!text-[#001840] !text-4xl w-full" />
    }
    subTitle={
      <div className="flex flex-col gap-3">
        <div className="text-center">
          <p className="text-gray-600 mb-1">To complete your payment:</p>
        </div>
        <div className="flex items-center justify-center text-[#001840] bg-blue-50 py-3 px-4 rounded-lg">
          <span className="font-semibold text-sm flex items-center justify-center">
            1. Dial <span className="font-black ml-2 text-lg">*150*50*1#</span>
          </span>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-lg">
            <NumberOutlined className="text-[#001840] text-xl" />
            <div>
              <span className="font-medium">2. Enter Reference Number</span>
              <p className="text-lg text-[#001840] font-black mt-1">
                {reference}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-lg">
            <WalletOutlined className="text-[#001840] text-xl" />
            <div>
              <span className="font-medium">
                3. Enter Amount for plan selected
              </span>
              <p className="text-lg text-[#001840] font-black mt-1">
                {amount?.toLocaleString()} TZS
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-lg">
            <LockOutlined className="text-[#001840] text-xl" />
            <div>
              <span className="font-medium">4. Enter PIN to Confirm</span>
              <p className="text-xs text-gray-500 mt-1">
                Enter your mobile money PIN to complete payment
              </p>
            </div>
          </div>
        </div>
      </div>
    }
    extra={[
      <button
        key="done"
        onClick={onClose}
        className="px-6 py-2 bg-[#001840] text-white rounded-lg hover:bg-[#010798] transition-colors duration-200 w-full"
      >
        Done
      </button>,
    ]}
  />
);

export const RenderFailureState = ({ onClose, setStatus }) => (
  <Result
    icon={<CloseCircleOutlined className="!text-red-500 !text-6xl" />}
    title={
      <span className="text-2xl font-semibold text-gray-800">
        Payment Failed
      </span>
    }
    subTitle={
      <div className="space-y-3 mt-4">
        <p className="text-gray-600 text-xs sm:text-sm">
          We couldn&apos;t process your payment at this time.
        </p>
        <p className="text-gray-500 text-xs lg:text-sm">
          Please try again or contact support if the issue persists.
        </p>
      </div>
    }
    extra={[
      <button
        key="tryAgain"
        onClick={() => setStatus(PaymentStatus.LOADING)} // Uncomment and adjust if setStatus is passed
        className="px-6 py-2 bg-[#001840] text-white rounded-lg hover:bg-blue-900 transition-colors w-3/4 duration-200 mb-3 md:mb-6"
      >
        Try Again
      </button>,
      <button
        key="cancel"
        onClick={onClose}
        className="px-6 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 w-3/4 transition-colors duration-200"
      >
        Cancel
      </button>,
    ]}
  />
);

export const PaymentPending = ({
  open,
  onClose,
  status,
  reference,
  amount,
}) => {
  const { width } = useDevice();
  const [modalSize, setModalSize] = useState({ width: 520, height: 520 });
  const router = useRouter();
  const [localStatus, setLocalStatus] = useState(status);

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

  return (
    <Modal
      title={<span className="text-xl font-semibold">Gala Education</span>}
      open={open}
      footer={null}
      width={modalSize.width}
      closable={status !== PaymentStatus.LOADING}
      maskClosable={status !== PaymentStatus.LOADING}
      onCancel={onClose}
      styles={{ body: { height: `${modalSize.height}px`, overflowY: "auto" } }}
    >
      {status === PaymentStatus.LOADING && <RenderLoadingState />}
      {status === PaymentStatus.SUCCESS && (
        <RenderSuccessState onClose={onClose} />
      )}
      {status === PaymentStatus.REFERENCE && (
        <RenderReferenceState
          reference={reference}
          amount={amount}
          onClose={onClose}
        />
      )}
      {status === PaymentStatus.FAILURE && (
        <RenderFailureState onClose={onClose} setStatus={setLocalStatus} />
      )}{" "}
    </Modal>
  );
};
