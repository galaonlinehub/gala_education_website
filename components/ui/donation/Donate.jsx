"use client";

import {
  Modal,
  Steps,
  Button,
  Input,
  Select,
  Row,
  Col,
  Typography,
  Space,
  Form,
  Radio,
  Divider,
  InputNumber,
  Card,
  Tabs,
  Tooltip,
  message,
} from "antd";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

import { apiPost } from "@/services/api/api_service";

import DonationStep from "./DonationStep";
import PaymentStep from "./PaymentStep";
import ProcessingModal from "./ProcessingModal";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { Step } = Steps;
const { TabPane } = Tabs;

// Updated to accept props
const Donate = ({
  showDonatePopup,
  setShowDonatePopup,
  setShowProcessingModal,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTab, setActiveTab] = useState("1");
  const [donationFrequency, setDonationFrequency] = useState("monthly");
  const [paymentMethod, setPaymentMethod] = useState("mobile");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [form] = Form.useForm();

  const handleCancel = () => {
    setShowDonatePopup(false);
  };

  const handleAmountChange = (value) => {
    setSelectedAmount(value);
  };

  const donate = useTranslations('donate');


  const renderTabContent = () => {
  const items = [
    {
      key: "1",
      label: (
        <span
          style={{
            color: activeTab === "1" ? "#001840" : undefined,
          }}
        >
          {donate("donate_now")}
        </span>
      ),
      children: (
        <>
          <DonationStep
            form={form}
            selectedAmount={selectedAmount}
            setSelectedAmount={setSelectedAmount}
            setDonationFrequency={setDonationFrequency}
            donationFrequency={donationFrequency}
            handleAmountChange={handleAmountChange}
          />
          <div style={{ marginTop: "20px", textAlign: "right" }}>
            <Tooltip
              placement="top"
              title={!selectedAmount ? "Please fill amount first" : ""}
            >
              <Button
                disabled={!selectedAmount}
                className={`
                  bg-[#001840] 
                  text-white 
                  hover:bg-blue-900 
                  hover:text-white
                  ${
                    !selectedAmount
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-900"
                  }
                `}
                onClick={() => setActiveTab("2")}
              >
                {donate("continue_to_payment")}
              </Button>
            </Tooltip>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <Tooltip
          placement="top"
          title={!selectedAmount ? "Please fill amount first" : ""}
        >
          <span
            style={{
              color: activeTab === "2" ? "#001840" : undefined,
            }}
          >
            {donate("payment_method")}
          </span>
        </Tooltip>
      ),
      disabled: !selectedAmount,
      children: (
        <PaymentStep
          setShowProcessingModal={setShowProcessingModal}
          setShowDonatePopup={setShowDonatePopup}
          setIsPhoneValid={setIsPhoneValid}
          setSelectedAmount={setSelectedAmount}
          setActiveTab={setActiveTab}
          isPhoneValid={isPhoneValid}
          form={form}
          selectedAmount={selectedAmount}
          setPaymentMethod={setPaymentMethod}
          paymentMethod={paymentMethod}
          donationFrequency={donationFrequency}
        />
      ),
    },
  ];

  return <Tabs activeKey={activeTab} onChange={setActiveTab} centered items={items} />;
};


  return (
    <>
      <Modal
        title={
          <div className="flex w-full justify-center">{donate('support_education')}</div>
        }
        open={showDonatePopup}
        onCancel={handleCancel}
        footer={null}
        width={600}
        centered
        mask={false}
        maskClosable={false}
      >
        <div className="flex w-full flex-col gap-4">
          <Paragraph className="w-full flex justify-center text-xs">
            {donate('your_generosity')}
          </Paragraph>

          {renderTabContent()}
        </div>
      </Modal>
    </>
  );
};

export default Donate;
