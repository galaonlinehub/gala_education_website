"use client";

import React, { useState } from "react";
import { Tabs, Button, Input, Select, Row, Col, Typography, Space, Card, Form, Radio, Divider, Tag } from "antd";

const { TabPane } = Tabs;
const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const TeacherDonate = () => {
  const [donationFrequency, setDonationFrequency] = useState("monthly");
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [selectedAmount, setSelectedAmount] = useState(5000);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustomAmount, setIsCustomAmount] = useState(false);

  const handleAmountSelection = (amount) => {
    setSelectedAmount(amount);
    setIsCustomAmount(false);
  };

  const handleCustomAmount = (e) => {
    setCustomAmount(e.target.value);
    setIsCustomAmount(true);
  };

  const donationOptions = [
    { value: 1000, label: "1,000" },
    { value: 5000, label: "5,000" },
    { value: 10000, label: "10,000" }
  ];

  return (
    <div className="donation-container" style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
      <Tabs defaultActiveKey="1" centered className="donation-tabs">
        <TabPane tab={<span style={{ fontSize: "16px", fontWeight: "500" }}>Donate Now</span>} key="1">
          <Card bordered={false} style={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <Title level={2} style={{ marginBottom: "16px", color: "#2E3A59" }}>Support Education Access</Title>
              <Paragraph style={{ fontSize: "16px", color: "#4A5568", maxWidth: "700px", margin: "0 auto" }}>
                Your generosity helps transform lives through education and opportunity
              </Paragraph>
            </div>

            <Row gutter={[32, 32]}>
              <Col xs={24} md={12}>
                <Card
                  bordered={false}
                  style={{
                    background: "linear-gradient(135deg, #0052D4, #4364F7)",
                    borderRadius: "12px",
                    height: "100%",
                  }}
                >
                  <Title level={3} style={{ color: "white", marginBottom: "24px" }}>
                    Make a Difference Today
                  </Title>

                  <Paragraph style={{ color: "white", fontSize: "15px", lineHeight: "1.6" }}>
                    Many students cannot afford app charges, limiting their access to vital learning resources. 
                    We&apos;re stepping in to help cover these costs, ensuring every student has a chance to learn, 
                    regardless of their financial situation.
                  </Paragraph>

                  <Divider style={{ background: "rgba(255, 255, 255, 0.2)", margin: "20px 0" }} />

                  <Paragraph style={{ color: "white", fontSize: "15px", lineHeight: "1.6" }}>
                    Your donation opens doors to education for those in need and helps us support underfunded 
                    rural schools, where students study under incredibly challenging conditions.
                  </Paragraph>

                  <div style={{ marginTop: "24px" }}>
                    <Tag color="blue" style={{ padding: "4px 8px", borderRadius: "4px", fontWeight: "500" }}>Education</Tag>
                    <Tag color="blue" style={{ padding: "4px 8px", borderRadius: "4px", fontWeight: "500" }}>Opportunity</Tag>
                    <Tag color="blue" style={{ padding: "4px 8px", borderRadius: "4px", fontWeight: "500" }}>Future</Tag>
                  </div>
                </Card>
              </Col>

              <Col xs={24} md={12}>
                <Form layout="vertical">
                  <div style={{ marginBottom: "24px" }}>
                    <Text strong style={{ display: "block", marginBottom: "12px", fontSize: "16px" }}>
                      How often would you like to donate?
                    </Text>
                    <Radio.Group
                      value={donationFrequency}
                      onChange={(e) => setDonationFrequency(e.target.value)}
                      buttonStyle="solid"
                      style={{ width: "100%" }}
                    >
                      <Radio.Button
                        value="monthly"
                        style={{ 
                          width: "50%", 
                          textAlign: "center", 
                          borderRadius: donationFrequency === "monthly" ? "4px 0 0 4px" : "4px 0 0 4px" 
                        }}
                      >
                        Monthly
                      </Radio.Button>
                      <Radio.Button
                        value="onetime"
                        style={{ 
                          width: "50%", 
                          textAlign: "center", 
                          borderRadius: donationFrequency === "onetime" ? "0 4px 4px 0" : "0 4px 4px 0" 
                        }}
                      >
                        One Time
                      </Radio.Button>
                    </Radio.Group>
                  </div>

                  <div style={{ marginBottom: "24px" }}>
                    <Text strong style={{ display: "block", marginBottom: "12px", fontSize: "16px" }}>
                      Select donation amount
                    </Text>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
                      {donationOptions.map((option) => (
                        <Button
                          key={option.value}
                          type={selectedAmount === option.value && !isCustomAmount ? "primary" : "default"}
                          onClick={() => handleAmountSelection(option.value)}
                          style={{
                            height: "44px",
                            flex: "1",
                            minWidth: "80px",
                            fontSize: "16px",
                            fontWeight: "500",
                            boxShadow: "none",
                            borderRadius: "6px",
                          }}
                        >
                          {option.label}
                        </Button>
                      ))}
                      <Input
                        placeholder="Custom amount"
                        onChange={handleCustomAmount}
                        value={customAmount}
                        onClick={() => setIsCustomAmount(true)}
                        style={{
                          flex: "1",
                          height: "44px",
                          minWidth: "120px",
                          borderRadius: "6px",
                          borderColor: isCustomAmount ? "#1890ff" : "#d9d9d9",
                        }}
                      />
                    </div>
                  </div>

                  <Form.Item
                    label={<Text strong style={{ fontSize: "16px" }}>Your Name</Text>}
                    style={{ marginBottom: "16px" }}
                  >
                    <Input 
                      placeholder="Enter your name" 
                      size="large" 
                      style={{ borderRadius: "6px" }}
                    />
                  </Form.Item>

                  <Form.Item
                    label={<Text strong style={{ fontSize: "16px" }}>Email Address</Text>}
                    style={{ marginBottom: "24px" }}
                  >
                    <Input 
                      placeholder="Enter your email" 
                      size="large" 
                      style={{ borderRadius: "6px" }}
                    />
                  </Form.Item>

                  <div style={{ marginBottom: "8px" }}>
                    <Text style={{ fontSize: "14px", color: "#4A5568" }}>
                      <a style={{ color: "#1890ff" }}>Donate in honor of someone special</a>
                    </Text>
                  </div>

                  <Button
                    type="primary"
                    size="large"
                    block
                    style={{
                      height: "48px",
                      fontSize: "16px",
                      fontWeight: "500",
                      borderRadius: "6px",
                      marginTop: "16px",
                      background: "#1890ff"
                    }}
                  >
                    Continue to Payment
                  </Button>
                </Form>
              </Col>
            </Row>
          </Card>
        </TabPane>

        <TabPane tab={<span style={{ fontSize: "16px", fontWeight: "500" }}>Payment Method</span>} key="2">
          <Card bordered={false} style={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <Title level={2} style={{ marginBottom: "16px", color: "#2E3A59" }}>Complete Your Donation</Title>
              <Paragraph style={{ fontSize: "16px", color: "#4A5568", maxWidth: "700px", margin: "0 auto" }}>
                Choose your preferred payment method to complete your donation
              </Paragraph>
            </div>

            <Row gutter={[32, 32]}>
              <Col xs={24} md={12}>
                <Card
                  bordered={false}
                  style={{
                    background: "linear-gradient(135deg, #0052D4, #4364F7)",
                    borderRadius: "12px",
                    height: "100%",
                  }}
                >
                  <Title level={3} style={{ color: "white", marginBottom: "24px" }}>
                    Your Impact
                  </Title>

                  <Paragraph style={{ color: "white", fontSize: "15px", lineHeight: "1.6" }}>
                    Your contribution of <strong>{isCustomAmount ? customAmount : selectedAmount}</strong> will help 
                    provide educational resources to students who need them most.
                  </Paragraph>

                  <Divider style={{ background: "rgba(255, 255, 255, 0.2)", margin: "20px 0" }} />

                  <div style={{ color: "white", fontSize: "15px", lineHeight: "1.6" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                      <span>Donation amount:</span>
                      <span>{isCustomAmount ? customAmount : selectedAmount}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                      <span>Frequency:</span>
                      <span>{donationFrequency === "monthly" ? "Monthly" : "One time"}</span>
                    </div>
                  </div>
                </Card>
              </Col>

              <Col xs={24} md={12}>
                <Form layout="vertical">
                  <div style={{ marginBottom: "24px" }}>
                    <Text strong style={{ display: "block", marginBottom: "12px", fontSize: "16px" }}>
                      Payment Method
                    </Text>
                    <Radio.Group
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      buttonStyle="solid"
                      style={{ width: "100%" }}
                    >
                      <Radio.Button
                        value="bank"
                        style={{ 
                          width: "50%", 
                          textAlign: "center", 
                          borderRadius: paymentMethod === "bank" ? "4px 0 0 4px" : "4px 0 0 4px" 
                        }}
                      >
                        Bank Account
                      </Radio.Button>
                      <Radio.Button
                        value="mobile"
                        style={{ 
                          width: "50%", 
                          textAlign: "center", 
                          borderRadius: paymentMethod === "mobile" ? "0 4px 4px 0" : "0 4px 4px 0" 
                        }}
                      >
                        Mobile Money
                      </Radio.Button>
                    </Radio.Group>
                  </div>

                  {paymentMethod === "bank" && (
                    <>
                      <Form.Item
                        label={<Text strong style={{ fontSize: "16px" }}>Card Number</Text>}
                        style={{ marginBottom: "16px" }}
                      >
                        <Input 
                          placeholder="1234 5678 9012 3456" 
                          size="large" 
                          style={{ borderRadius: "6px" }}
                        />
                      </Form.Item>

                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            label={<Text strong style={{ fontSize: "16px" }}>Expiration Date</Text>}
                            style={{ marginBottom: "16px" }}
                          >
                            <Input 
                              placeholder="MM/YY" 
                              size="large" 
                              style={{ borderRadius: "6px" }}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            label={<Text strong style={{ fontSize: "16px" }}>CVV</Text>}
                            style={{ marginBottom: "16px" }}
                          >
                            <Input 
                              placeholder="123" 
                              size="large" 
                              style={{ borderRadius: "6px" }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </>
                  )}

                  {paymentMethod === "mobile" && (
                    <>
                      <Form.Item
                        label={<Text strong style={{ fontSize: "16px" }}>Mobile Number</Text>}
                        style={{ marginBottom: "16px" }}
                      >
                        <Input 
                          placeholder="Enter mobile number" 
                          size="large" 
                          style={{ borderRadius: "6px" }}
                        />
                      </Form.Item>

                      <Form.Item
                        label={<Text strong style={{ fontSize: "16px" }}>Mobile Money Provider</Text>}
                        style={{ marginBottom: "16px" }}
                      >
                        <Select
                          defaultValue="mpesa"
                          size="large"
                          style={{ width: "100%", borderRadius: "6px" }}
                        >
                          <Option value="mpesa">M-Pesa</Option>
                          <Option value="tigopesa">Tigo Pesa</Option>
                          <Option value="airtel">Airtel Money</Option>
                        </Select>
                      </Form.Item>
                    </>
                  )}

                  <Form.Item
                    label={<Text strong style={{ fontSize: "16px" }}>Country</Text>}
                    style={{ marginBottom: "24px" }}
                  >
                    <Select
                      defaultValue="tanzania"
                      size="large"
                      style={{ width: "100%", borderRadius: "6px" }}
                    >
                      <Option value="tanzania">Tanzania</Option>
                      <Option value="kenya">Kenya</Option>
                      <Option value="uganda">Uganda</Option>
                    </Select>
                  </Form.Item>

                  <Paragraph style={{ fontSize: "14px", color: "#4A5568", marginBottom: "24px" }}>
                    By proceeding, you authorize Gala Education to charge your account for this payment and future 
                    payments in accordance with their terms.
                  </Paragraph>

                  <Button
                    type="primary"
                    size="large"
                    block
                    style={{
                      height: "48px",
                      fontSize: "16px",
                      fontWeight: "500",
                      borderRadius: "6px",
                      background: "#1890ff"
                    }}
                  >
                    Complete Donation
                  </Button>
                </Form>
              </Col>
            </Row>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TeacherDonate;