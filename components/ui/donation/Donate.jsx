'use client';

import { Modal, Button, Typography, Form, Tabs, Tooltip } from 'antd';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import DonationStep from './DonationStep';
import PaymentStep from './PaymentStep';

const { Paragraph } = Typography;

const { TabPane } = Tabs;

// Updated to accept props
const Donate = ({ showDonatePopup, setShowDonatePopup, setShowProcessingModal }) => {
  const [activeTab, setActiveTab] = useState('1');
  const [donationFrequency, setDonationFrequency] = useState('monthly');
  const [paymentMethod, setPaymentMethod] = useState('mobile');
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

  const renderTabContent = () => (
    <Tabs activeKey={activeTab} onChange={setActiveTab} centered>
      <TabPane
        className=""
        tab={
          <span
            style={{
              color: activeTab === '1' ? '#001840' : undefined,
            }}
          >
            {donate("payment_method")}
          </span>
        }
        key="1"
      >
        <DonationStep
          form={form}
          selectedAmount={selectedAmount}
          setSelectedAmount={setSelectedAmount}
          setDonationFrequency={setDonationFrequency}
          donationFrequency={donationFrequency}
          handleAmountChange={handleAmountChange}
        />
        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <Tooltip placement="top" title={!selectedAmount ? 'Please fill amount first' : ''}>
            <Button
              disabled={!selectedAmount}
              className={`
                bg-[#001840] 
                text-white 
                hover:bg-blue-900 
                hover:text-white
                ${!selectedAmount ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-900'}
              `}
              onClick={() => setActiveTab('2')}
            >
              {donate('continue_to_payment')}
            </Button>
          </Tooltip>
        </div>
      </TabPane>
      <TabPane
        disabled={!selectedAmount}
        tab={
          <Tooltip placement="top" title={!selectedAmount ? 'Please fill amount first' : ''}>
            <span
              style={{
                color: activeTab === '2' ? '#001840' : undefined,
              }}
            >
              {donate('payment_method')}
            </span>
          </Tooltip>
        }
        key="2"
      >
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
        title={<div className="flex w-full justify-center">{donate('support_education')}</div>}
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
