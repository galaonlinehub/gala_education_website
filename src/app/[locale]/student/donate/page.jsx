"use client";

import { Layout, Steps, Button, Input, Select, Row, Col, Typography, Space, Card, Form, Radio, Divider, InputNumber, Avatar, List, Badge, Progress, Statistic, notification } from "antd";
import Image from "next/image";
import React, { useState } from "react";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { Step } = Steps;

const StudentDonate = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [donationFrequency, setDonationFrequency] = useState("monthly");
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [selectedAmount, setSelectedAmount] = useState(5000);
  const [form] = Form.useForm();

  const donationImpacts = [
    {
      amount: 1000,
      impact: "Provides learning materials for 5 students",
      icon: "📚",
    },
    {
      amount: 5000,
      impact: "Covers app subscription for 20 students for a month",
      icon: "📱",
    },
    {
      amount: 10000,
      impact: "Supports a rural school with digital resources",
      icon: "🏫",
    },
  ];

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
    notification.success({
      message: "Donation Successful",
      description: "Thank you for your generous contribution to education!",
    });
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Header style={{ background: "#fff", padding: "0 24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          <div style={{ fontSize: "20px", fontWeight: "bold", color: "#1890ff" }}>Gala Education</div>
        </div>
      </Header>

      <Content style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
        <Card
          bordered={false}
          style={{
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            overflow: "hidden",
          }}
        >
          <div style={{ marginBottom: "32px", textAlign: "center" }}>
            <Title level={2} style={{ marginBottom: "16px", color: "#1890ff" }}>
              Support Student Education
            </Title>
            <Paragraph style={{ fontSize: "16px", color: "#595959" }}>Your donation helps provide educational resources to students in need</Paragraph>
          </div>

          <Steps current={currentStep} style={{ maxWidth: "800px", margin: "0 auto 32px auto" }}>
            <Step title="Choose Amount" />
            <Step title="Your Information" />
            <Step title="Payment" />
          </Steps>

          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            {currentStep === 0 && (
              <Row gutter={[24, 24]}>
                <Col xs={24} lg={12}>
                  <div style={{ marginBottom: "24px" }}>
                    <Title level={4}>Select Donation Amount</Title>
                    <Radio.Group value={donationFrequency} onChange={(e) => setDonationFrequency(e.target.value)} style={{ marginBottom: "24px" }}>
                      <Radio.Button value="monthly">Monthly Donation</Radio.Button>
                      <Radio.Button value="onetime">One-time Donation</Radio.Button>
                    </Radio.Group>

                    <Form.Item label="Amount">
                      <InputNumber min={100} style={{ width: "100%" }} formatter={(value) => `TZS ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} parser={(value) => value.replace(/TZS\s?|(,*)/g, "")} value={selectedAmount} onChange={handleAmountChange} size="large" />
                    </Form.Item>

                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
                      {[1000, 5000, 10000].map((amount) => (
                        <Button key={amount} type={selectedAmount === amount ? "primary" : "default"} onClick={() => setSelectedAmount(amount)} size="large" style={{ flex: 1, margin: "0 8px" }}>
                          {amount.toLocaleString()}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Title level={4}>Monthly Goal</Title>
                    <Progress percent={68} status="active" style={{ marginBottom: "16px" }} />
                    <Row gutter={16}>
                      <Col span={8}>
                        <Statistic title="Raised" value={3420000} formatter={(value) => `TZS ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
                      </Col>
                      <Col span={8}>
                        <Statistic title="Goal" value={5000000} formatter={(value) => `TZS ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
                      </Col>
                      <Col span={8}>
                        <Statistic title="Donors" value={142} />
                      </Col>
                    </Row>
                  </div>
                </Col>

                <Col xs={24} lg={12}>
                  <Card title="Your Impact" style={{ marginBottom: "24px" }} className="impact-card">
                    <List
                      itemLayout="horizontal"
                      dataSource={donationImpacts}
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta avatar={<Avatar style={{ backgroundColor: "#1890ff", verticalAlign: "middle" }}>{item.icon}</Avatar>} title={`TZS ${item.amount.toLocaleString()}`} description={item.impact} />
                          {selectedAmount >= item.amount && <Badge status="success" text="Your donation will help!" />}
                        </List.Item>
                      )}
                    />
                  </Card>

                  <Card title="Why Donate?">
                    <Paragraph>Many students are unable to afford educational resources, limiting their access to vital learning materials. Your donation helps us:</Paragraph>
                    <ul style={{ paddingLeft: "20px" }}>
                      <li>Provide app access to underprivileged students</li>
                      <li>Support rural schools with digital learning tools</li>
                      <li>Develop more educational content for students in need</li>
                      <li>Train teachers on using digital tools effectively</li>
                    </ul>
                    <div style={{ textAlign: "center", margin: "16px 0" }}>
                      <Image src="/api/placeholder/400/200" alt="Students learning" style={{ maxWidth: "100%", borderRadius: "8px" }} />
                    </div>
                  </Card>
                </Col>
              </Row>
            )}

            {currentStep === 1 && (
              <Form form={form} layout="vertical" style={{ maxWidth: "600px", margin: "0 auto" }}>
                <Title level={4} style={{ marginBottom: "24px" }}>
                  Your Information
                </Title>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: "Please enter your first name" }]}>
                      <Input size="large" placeholder="Enter your first name" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: "Please enter your last name" }]}>
                      <Input size="large" placeholder="Enter your last name" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="email"
                  label="Email Address"
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <Input size="large" placeholder="Enter your email address" />
                </Form.Item>

                <Form.Item name="phone" label="Phone Number">
                  <Input size="large" placeholder="Enter your phone number" />
                </Form.Item>

                <Form.Item name="honorOf" label="Donate in honor of (optional)">
                  <Input size="large" placeholder="Enter name" />
                </Form.Item>

                <Divider />

                <Card style={{ marginBottom: "24px", background: "#f9f9f9" }}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <Text>Donation Amount:</Text>
                      <Text strong>{`TZS ${selectedAmount.toLocaleString()}`}</Text>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <Text>Frequency:</Text>
                      <Text strong>{donationFrequency === "monthly" ? "Monthly" : "One-time"}</Text>
                    </div>
                  </Space>
                </Card>
              </Form>
            )}

            {currentStep === 2 && (
              <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                <Title level={4} style={{ marginBottom: "24px" }}>
                  Payment Method
                </Title>

                <Radio.Group value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} style={{ marginBottom: "24px", width: "100%" }}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Radio.Button
                      value="bank"
                      style={{
                        height: "auto",
                        padding: "16px",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: "bold" }}>Credit/Debit Card</div>
                        <div style={{ fontSize: "12px", color: "#595959" }}>Pay securely with your card</div>
                      </div>
                    </Radio.Button>

                    <Radio.Button
                      value="mobile"
                      style={{
                        height: "auto",
                        padding: "16px",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: "bold" }}>Mobile Money</div>
                        <div style={{ fontSize: "12px", color: "#595959" }}>Pay using M-Pesa, Airtel Money, etc.</div>
                      </div>
                    </Radio.Button>
                  </Space>
                </Radio.Group>

                {paymentMethod === "bank" && (
                  <Form layout="vertical">
                    <Form.Item label="Card Number">
                      <Input size="large" placeholder="1234 5678 9012 3456" />
                    </Form.Item>

                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item label="Expiration Date">
                          <Input size="large" placeholder="MM/YY" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Security Code">
                          <Input size="large" placeholder="CVV" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item label="Country">
                      <Select defaultValue="tanzania" size="large">
                        <Option value="tanzania">Tanzania</Option>
                        <Option value="kenya">Kenya</Option>
                        <Option value="uganda">Uganda</Option>
                      </Select>
                    </Form.Item>
                  </Form>
                )}

                {paymentMethod === "mobile" && (
                  <Form layout="vertical">
                    <Form.Item label="Mobile Money Provider">
                      <Select defaultValue="mpesa" size="large">
                        <Option value="mpesa">M-Pesa</Option>
                        <Option value="tigopesa">Tigo Pesa</Option>
                        <Option value="airtel">Airtel Money</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item label="Mobile Number">
                      <Input size="large" placeholder="Enter your mobile number" />
                    </Form.Item>
                  </Form>
                )}

                <Divider />

                <Card style={{ marginBottom: "24px", background: "#f9f9f9" }}>
                  <Title level={5}>Donation Summary</Title>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <Text>Donation Amount:</Text>
                      <Text strong>{`TZS ${selectedAmount.toLocaleString()}`}</Text>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <Text>Frequency:</Text>
                      <Text strong>{donationFrequency === "monthly" ? "Monthly" : "One-time"}</Text>
                    </div>
                    <Divider style={{ margin: "8px 0" }} />
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <Text strong>Total:</Text>
                      <Text strong>{`TZS ${selectedAmount.toLocaleString()}`}</Text>
                    </div>
                  </Space>
                </Card>

                <Paragraph style={{ fontSize: "12px", color: "#595959" }}>By proceeding, you authorize Gala Education to charge your account for this payment and future payments in accordance with their terms.</Paragraph>
              </div>
            )}

            <div style={{ marginTop: "32px", display: "flex", justifyContent: "space-between" }}>
              {currentStep > 0 && (
                <Button onClick={prevStep} size="large">
                  Back
                </Button>
              )}

              <div style={{ marginLeft: "auto" }}>
                {currentStep < 2 ? (
                  <Button type="primary" onClick={nextStep} size="large">
                    {currentStep === 0 ? "Continue" : "Proceed to Payment"}
                  </Button>
                ) : (
                  <Button type="primary" onClick={completeDonation} size="large">
                    Complete Donation
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      </Content>

      <Footer style={{ textAlign: "center", background: "#f0f2f5", padding: "24px" }}>
        <Space direction="vertical" size="small">
          <Space split={<Divider type="vertical" />}>
            <a href="#">About Us</a>
            <a href="#">Contact</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </Space>
          <Text type="secondary">© {new Date().getFullYear()} Gala Education. All rights reserved.</Text>
        </Space>
      </Footer>
    </Layout>
  );
};

export default StudentDonate;
