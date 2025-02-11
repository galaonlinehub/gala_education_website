import { useState } from "react";
import { Result, Modal } from "antd";
import { PaymentStatus } from "@/src/config/settings";
import { CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from "@ant-design/icons";


const PaymentPending = ({ open, onClose, status }) => {

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
        <div className="space-y-2 mt-4">
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
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
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
        <div className="space-y-2 mt-4">
          <p className="text-gray-600">
            We couldn't process your payment at this time.
          </p>
          <p className="text-gray-500 text-sm">
            Please try again or contact support if the issue persists.
          </p>
        </div>
      }
      extra={[
        <button
          key="tryAgain"
          onClick={() => setStatus(PaymentStatus.LOADING)}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 mr-4"
        >
          Try Again
        </button>,
        <button
          key="cancel"
          onClick={onClose}
          className="px-6 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors duration-200"
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
      className="!h-[40rem]"
      width={420}
      closable={status !== PaymentStatus.LOADING}
      maskClosable={status !== PaymentStatus.LOADING}
      onCancel={onClose}
      styles={{
        body: { height: "420px", overflowY: "auto" },
      }}
    >
      {renderContent()}
    </Modal>
  );
};

export { PaymentPending };
