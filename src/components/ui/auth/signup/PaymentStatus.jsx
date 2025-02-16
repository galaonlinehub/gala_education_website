import { useState, useEffect } from "react";
import { Result, Modal } from "antd";
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



const PaymentPending = ({ open, onClose, status, reference }) => {
  const { type, width, height } = useDevice();

  const [modalSize, setModalSize] = useState({ width: 520, height: 520 });

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

  const renderLoadingState = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <LoadingOutlined className="!text-3xl text-[#010798] mb-12" />
      <div className="space-y-4 text-center">
        <span className="text-xl font-semibold text-gray-800">
          Processing Your Payment
        </span>
        <p className="text-gray-600">
          Please wait while we confirm your transaction...
        </p>
        <div className="flex flex-col gap-2 items-center mt-4">
          <div className="h-2 w-64 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-[#010798] animate-pulse rounded-full" />
          </div>
          <p className="text-xs text-gray-500">This may take a few moments</p>
        </div>
      </div>
    </div>
  );

  const renderSuccessState = () => (
    <Result
      icon={<CheckCircleOutlined className="!text-green-500 text-2xl" />}
      title={
        <span className="text-2xl font-semibold text-gray-800">
          Payment Successful!
        </span>
      }
      subTitle={
        <div className="space-y-2 mt-2">
          <p className="text-gray-600">
            Your transaction has been completed successfully.
          </p>
          <p className="text-gray-500 text-sm">
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

  const renderReferenceState = () => (
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
              1. Dial{" "}
              <span className="font-black ml-2 text-lg">*150*50*1#</span>
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
                  15,000 TZS
                </p>
              </div>
            </div>

            <div className="flex items-center justify-start gap-3 text-gray-700 bg-gray-50 p-3 rounded-lg">
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

  const renderFailureState = () => (
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
          onClick={() => setStatus(PaymentStatus.LOADING)}
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

  const renderContent = () => {
    switch (status) {
      case PaymentStatus.LOADING:
        return renderLoadingState();
      case PaymentStatus.SUCCESS:
        return renderSuccessState();
      case PaymentStatus.REFERENCE:
        return renderReferenceState();
      case PaymentStatus.FAILURE:
        return renderFailureState();
      default:
        return null;
    }
  };


  

  return (
    <Modal
      title={<span className="text-xl font-semibold">Gala Education</span>}
      open={open}
      footer={null}
      width={modalSize.width}
      closable={status !== PaymentStatus.LOADING}
      maskClosable={status !== PaymentStatus.LOADING}
      onCancel={onClose}
      styles={{
        body: { height: `${modalSize.height}px`, overflowY: "auto" },
      }}
    >
      {renderContent()}
    </Modal>
  );
};

export { PaymentPending };
