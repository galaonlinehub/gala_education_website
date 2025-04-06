"use client";

import React, { useState } from "react";
import { Modal, Steps, Button, Input, Select, Row, Col, Typography, Space, Form, Radio, Divider, InputNumber, Card, Tabs, Tooltip } from "antd";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { Step } = Steps;
const { TabPane } = Tabs;

// Updated to accept props
const Donate = ({ showDonatePopup, setShowDonatePopup }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTab, setActiveTab] = useState("1");
  const [donationFrequency, setDonationFrequency] = useState("monthly");
  const [paymentMethod, setPaymentMethod] = useState("mobile");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [form] = Form.useForm();

  const handleValidatePhone = async () => {
    try {
      // Validate only the phone field
      await form.validateFields(["phone_number"]);
      setIsPhoneValid(true);
    } catch (error) {
      setIsPhoneValid(false);
    }
  };

  const handleCancel = () => {
    // Use the prop function instead of local state
    setShowDonatePopup(false);
  };

  const handleAmountChange = (value) => {
    setSelectedAmount(value);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const completeDonation = () => {
    // Use the prop function instead of local state
    setShowDonatePopup(false);
  };

  const renderDonationStep = () => (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Radio.Group
          value={donationFrequency}
          onChange={(e) => setDonationFrequency(e.target.value)}
          style={{
            marginBottom: "16px",
            width: "100%",
          }}
          buttonStyle="solid"
        >
          <Radio.Button
            value="monthly"
            style={{
              width: "50%",
              textAlign: "center",
              backgroundColor: donationFrequency === "monthly" ? "#001840" : "",
              color: donationFrequency === "monthly" ? "white" : "",
            }}
          >
            Monthly
          </Radio.Button>
          <Radio.Button
            value="onetime"
            style={{
              width: "50%",
              textAlign: "center",
              backgroundColor: donationFrequency === "onetime" ? "#001840" : "",
              color: donationFrequency === "onetime" ? "white" : "",
            }}
          >
            One-time
          </Radio.Button>
        </Radio.Group>

        <Form.Item label="Amount">
          <InputNumber
            addonBefore="TZS"
            min={100}
            style={{ width: "100%" }}
            formatter={(value) => (value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "")}
            parser={(value) => value.replace(/\s|,/g, "")}
            value={selectedAmount}
            onChange={handleAmountChange}
            onKeyDown={(event) => {
              // Allow only numbers, backspace, and delete
              const allowedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace", "Delete"];
              if (!allowedKeys.includes(event.key) && !event.ctrlKey && !event.metaKey) {
                event.preventDefault();
              }
            }}
          />
        </Form.Item>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
          {[1000, 5000, 10000].map((amount) => (
            <Button key={amount} className={`${selectedAmount === amount ? "bg-[#001840]" : null}`} type={selectedAmount === amount ? "primary" : "default"} onClick={() => setSelectedAmount(amount)} style={{ flex: 1, margin: "0 4px" }}>
              {amount?.toLocaleString()}
            </Button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "16px" }}>
        <Card size="small" style={{ marginBottom: "16px", background: "#f9f9f9" }}>
          <Paragraph className="text-xs">
            <Text className="font-semibold text-xs">Your Impact: </Text>
            {"Supports a rural school with digital resources, covers app subscription for students in need and provides learning materials for students"}
          </Paragraph>
        </Card>

        <Form.Item>
          <Input placeholder="Enter your name (Optional)" />
        </Form.Item>

        <Form.Item>
          <Input placeholder="Enter your email (Optional)" />
        </Form.Item>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div>
      <Form
        form={form}
        onChange={(changedValues) => {
          if (changedValues.phone_number !== undefined) {
            handleValidatePhone();
          }
        }}
        layout="vertical"
      >
        <div style={{ marginBottom: "16px" }}>
          <Text strong>Choose payment method</Text>
          <Radio.Group value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} style={{ marginTop: "8px", width: "100%" }} buttonStyle="solid">
            <Radio.Button
              disabled
              value="bank"
              style={{
                width: "50%",
                textAlign: "center",
                backgroundColor: paymentMethod === "bank" ? "#001840" : "",
                color: paymentMethod === "bank" ? "white" : "",
              }}
            >
              Bank A/C <i>(Coming soon)</i>
            </Radio.Button>
            <Radio.Button
              value="mobile"
              style={{
                width: "50%",
                textAlign: "center",
                backgroundColor: paymentMethod === "mobile" ? "#001840" : "",
                color: paymentMethod === "mobile" ? "white" : "",
              }}
            >
              Mobile
            </Radio.Button>
          </Radio.Group>
        </div>

        {paymentMethod === "bank" && (
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item label="Card Number" style={{ marginBottom: "12px" }}>
                  <Input placeholder="1234 5678 9012 3456" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Expiration Date" style={{ marginBottom: "12px" }}>
                  <Input placeholder="MM/YY" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="CVV" style={{ marginBottom: "12px" }}>
                  <Input placeholder="123" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Country" style={{ marginBottom: "12px" }}>
              <Select defaultValue="tanzania" style={{ width: "100%" }}>
                <Option value="tanzania">Tanzania</Option>
                <Option value="kenya">Kenya</Option>
                <Option value="uganda">Uganda</Option>
              </Select>
            </Form.Item>

            <Text style={{ fontSize: "12px" }}>By providing your card information, you allow Gala Education to charge your card for future payments in accordance with their terms.</Text>
          </Space>
        )}

        {paymentMethod === "mobile" && (
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Form.Item label="Mobile Money Provider" style={{ marginBottom: "12px" }}>
              <Select defaultValue="mpesa" style={{ width: "100%" }}>
                <Option value="mpesa">M-Pesa</Option>
                <Option value="tigopesa">Tigo Pesa</Option>
                <Option value="airtel">Airtel Money</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Phone number"
              name="phone_number"
              rules={[
                {
                  required: true,
                  message: <span className="text-xs ">Please enter your phone number</span>,
                },
                {
                  validator: async (_, value) => {
                    const phoneRegex = /^[67]\d{8}$/;
                    if (!value) return Promise.resolve();
                    if (!phoneRegex.test(value)) {
                      return Promise.reject(<span className="text-xs ">Phone number must be 9 digits starting with 6 or 7</span>);
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input placeholder="Phone number" addonBefore="255" size="middle" className="text-xs" />
            </Form.Item>
          </Space>
        )}

        <Divider style={{ margin: "16px 0" }} />

        <Card size="small" style={{ marginBottom: "16px", background: "#f9f9f9" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text>Amount :</Text>
            <Text strong>{`TZS ${selectedAmount?.toLocaleString()}`}</Text>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text>Frequency:</Text>
            <Text strong>{donationFrequency === "monthly" ? "Monthly" : "One-time"}</Text>
          </div>
        </Card>
      </Form>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderDonationStep();
      case 1:
        return renderPaymentStep();
      default:
        return null;
    }
  };

  // For simple tab-based approach
  const renderTabContent = () => (
    <Tabs activeKey={activeTab} onChange={setActiveTab} centered>
      <TabPane
        tab={
          <span
            style={{
              color: activeTab === "1" ? "#001840" : undefined,
            }}
          >
            Donate Now
          </span>
        }
        key="1"
      >
        {renderDonationStep()}
        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <Tooltip placement="top" title={!selectedAmount ? "Please fill amount first" : ""}>
            <Button
              disabled={!selectedAmount}
              className={`
    bg-[#001840] 
    text-white 
    hover:bg-blue-900 
    hover:text-white
    ${!selectedAmount ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-900"}
  `}
              onClick={() => setActiveTab("2")}
            >
              Continue to Payment
            </Button>
          </Tooltip>
        </div>
      </TabPane>
      <TabPane
        disabled={!selectedAmount}
        tab={
          <span
            style={{
              color: activeTab === "2" ? "#001840" : undefined,
            }}
          >
            Payment Method
          </span>
        }
        key="2"
      >
        {renderPaymentStep()}
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
          <Button onClick={() => setActiveTab("1")}>Back</Button>
          <Button
            className={`
          bg-[#001840] 
          text-white 
          hover:bg-blue-900 
          hover:text-white
          ${!isPhoneValid ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-900"}
        `}
            disabled={!selectedAmount}
            onClick={completeDonation}
          >
            Complete Donation
          </Button>
        </div>
      </TabPane>
    </Tabs>
  );

  // You can switch between step-based or tab-based UI by changing which component is used
  const useStepBasedUI = false;

  return (
    <>
      <Modal
        title={<div className="flex w-full justify-center">Support Education</div>}
        open={showDonatePopup} // Use the prop instead of local state
        onCancel={handleCancel}
        footer={null}
        width={600}
        centered
        mask={false} // This disables the backdrop
        maskClosable={false}
      >
        <Paragraph className="w-full flex justify-center text-xs">Your generosity helps transform lives through education and opportunity!</Paragraph>

        {useStepBasedUI ? (
          <>
            <Steps current={currentStep} size="small" style={{ marginBottom: "24px" }}>
              <Step title="Donation" />
              <Step title="Payment" />
            </Steps>

            {renderStepContent()}

            <div style={{ marginTop: "24px", display: "flex", justifyContent: "space-between" }}>
              {currentStep > 0 && <Button onClick={prevStep}>Back</Button>}

              <div style={{ marginLeft: "auto" }}>
                {currentStep < 1 ? (
                  <Button disabled type="primary" onClick={nextStep}>
                    Continue to Payment
                  </Button>
                ) : (
                  <Button type="primary" onClick={completeDonation}>
                    Complete Donation
                  </Button>
                )}
              </div>
            </div>
          </>
        ) : (
          renderTabContent()
        )}
      </Modal>
    </>
  );
};

export default Donate;
