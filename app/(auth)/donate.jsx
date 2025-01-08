"use client";

import React, { useState } from "react";
import { Tabs, Button, Input, Select, Row, Col, Typography, Space } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import AcceptingHands from "@/components/vectors/AcceptingHands";
import Olive from "@/components/vectors/Olive";
import Love from "@/components/vectors/Love";

const { TabPane } = Tabs;
const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const Donate = ({ setShowDonatePopup, showDonatePopup }) => {
  const [activeKey, setActiveKey] = useState("1");
  const [activeTab, setActiveTab] = useState("monthly");
  const [activePayTab, setActivePayTab] = useState("bank");

  const [selectedAmount, setSelectedAmount] = useState(null);

  const handleButtonClick = (amount) => {
    setSelectedAmount(amount);
  };

  const donationFrequencies = [
    { key: "monthly", label: "Monthly" },
    { key: "onetime", label: "One time" },
  ];

  const paymentMethods = [
    { key: "bank", label: "Bank A/C" },
    { key: "mobile", label: "Mobile" },
  ];

  const handleDonateNow = () => {
    setActiveKey("2");
  };

  const handleClose = () => {
    setShowDonatePopup(!showDonatePopup);
  };

  const showWatermarks = () => {
    return (
      <div className="relative">
        <div className="fixed inset-0 -z-1 opacity-95 pointer-events-none">
          <div className="absolute left-44 top-44 w-52 h-52 lg:left-64 xl:left-1/4 hidden lg:block">
            <AcceptingHands />
          </div>
        </div>
        <div className="fixed inset-0 -z-1 opacity-95 pointer-events-none">
          <div className="absolute right-80 lg:right-80 top-40 w-52 h-52 xl:right-1/3 hidden lg:block">
            <Olive />
          </div>
        </div>
        <div className="fixed inset-0 -z-1 opacity-95 pointer-events-none">
          <div className="absolute left-32 top-32 w-52 h-52 lg:left-64 xl:left-96 hidden lg:block">
            <Love />
          </div>
        </div>
        <div className="fixed inset-0 -z-1 opacity-95 pointer-events-none">
          <div className="absolute left-1/2 top-32 w-52 h-52 lg:left-1/2 hidden lg:block">
            <Love />
          </div>
        </div>
        <div className="fixed inset-0 -z-1 opacity-95 pointer-events-none">
          <div className="absolute left-1/2 top-96 w-52 h-52 hidden lg:block">
            <Love />
          </div>
        </div>
        <div className="fixed inset-0 -z-1 opacity-95 pointer-events-none">
          <div className="absolute right-6 top-96 w-52 h-52  lg:right-28 xl:right-48 hidden lg:block">
            <Love />
          </div>
        </div>
        <div className="fixed inset-0 -z-1 opacity-95 pointer-events-none">
          <div className="absolute right-6 top-32 w-52 h-52  lg:right-28 xl:right-48 hidden lg:block">
            <Love />
          </div>
        </div>
      </div>
    );
  };



  return (
    <div className="p-10 md:px-44 z-50 lg:px-56 xl:px-80 h-screen overflow-y-auto scrollbar-hide">
      <Button
        type="text"
        icon={<CloseOutlined />}
        style={{
          position: "absolute",
          top: "20px",
          right: "10px",
          color: "white",
          fontSize: "16px",
        }}
        onClick={handleClose}
      />

      <Tabs
        activeKey={activeKey}
        onChange={setActiveKey}
        defaultActiveKey="1"
        centered
        tabBarStyle={{
          borderBottom: "none",
        }}
        style={{
          "--ant-primary-color": "white",
        }}
        renderTabBar={(props, DefaultTabBar) => (
          <DefaultTabBar
            {...props}
            style={{
              ".ant-tabs-tab": {
                color: "white",
                fontWeight: "bold",
              },
              ".ant-tabs-tab-active": {
                color: "white",
              },
              ".ant-tabs-ink-bar": {
                backgroundColor: "white",
                height: "4px",
              },
            }}
          />
        )}
      >
        <TabPane tab="Donate" key="1">
          {showWatermarks()}
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Row gutter={[24, 24]} style={{ backgroundColor: "#001840", padding: "12px", borderRadius: "16px" }}>
              <Col xs={24} lg={12}>
                <div style={{ padding: "24px", borderRadius: "8px", height: "100%" }}>
                  <Title level={4} style={{ color: "white" }}>
                    Help us do more
                  </Title>

                  <Paragraph style={{ color: "white", fontSize: "10px" }}>Dear members, many students are unable to afford the app charges, limiting their access to vital learning resources. We&apos;re stepping in to help cover these costs, ensuring every student has a chance to learn, no matter their financial situation. Your donation is crucial—it opens doors to education for those in need and helps us support underfunded rural schools, where students study under incredibly harsh conditions. Together, we can break the cycle of poverty and build a brighter future for these young minds.</Paragraph>
                </div>
              </Col>
              <Col xs={24} lg={12}>
                <Space direction="vertical" size="large" style={{ width: "100%", padding: "2px" }}>
                  <Text strong style={{ color: "white", fontSize: "10px" }}>
                    Choose donation frequency
                  </Text>
                  <div style={{ backgroundColor: "white", padding: "6px 6px", borderRadius: "24px", display: "inline-block" }}>
                    <Space wrap>
                      {donationFrequencies.map((tab) => (
                        <Button
                          key={tab.key}
                          type="default"
                          onClick={() => setActiveTab(tab.key)}
                          shape="round"
                          style={{
                            backgroundColor: activeTab === tab.key ? "#001840" : "white",
                            color: activeTab === tab.key ? "white" : "#001840",
                            borderColor: "#001840",
                          }}
                        >
                          {tab.label}
                        </Button>
                      ))}
                    </Space>
                  </div>

                  <div style={{ padding: "8px", borderRadius: "8px" }} className="-mb-4">
                    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                      <Text strong style={{ color: "white", fontSize: "10px" }}>
                        Select donation amount
                      </Text>
                      <div className="flex-col md:flex md:flex-row gap-4  ">
                        <div className="flex gap-2 justify-start flex-row">
                          {[1000, 5000, 10000].map((amount) => (
                            <Button
                              key={amount}
                              onClick={() => handleButtonClick(amount)}
                              style={{
                                width: "50px",
                                fontSize: "12px",
                                backgroundColor: selectedAmount === amount ? "white" : "#001840",
                                color: selectedAmount === amount ? "black" : "white",
                                borderColor: "white",
                              }}
                            >
                              {amount}
                            </Button>
                          ))}
                        </div>

                        <div className="mb-3 md:mb-0 md:mt-0 w-12 mt-3">
                          <Text style={{ color: "white", fontSize: "13px" }}>or</Text>
                        </div>

                        <div>
                          <Input placeholder="Enter amount" className="!placeholder-gray-400" style={{ width: "100%", color: "white", backgroundColor: "#001840", fontSize: "14px" }} />
                        </div>
                      </div>

                      <Text strong style={{ color: "white", fontSize: "10px" }}>
                        Name
                      </Text>
                      <Input
                        placeholder="Enter your name"
                        className="!placeholder-gray-400"
                        style={{
                          fontSize: "12px",
                          color: "white",
                          borderColor: "white",
                          backgroundColor: "#001840",
                        }}
                      />
                      <Text style={{ color: "white", fontSize: "10px" }}>
                        <a style={{ color: "#1890ff", textDecoration: "none" }}>Click here</a> to make a donation in honour of someone special.
                      </Text>
                    </Space>
                  </div>
                  <Button type="primary" style={{ background: "#007AFF", fontWeight: "bold" }} onClick={handleDonateNow}>
                    Donate Now
                  </Button>
                </Space>
              </Col>
            </Row>
          </Space>
        </TabPane>
        <TabPane tab="Payment" key="2">
          {showWatermarks()}
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Row gutter={[24, 24]} style={{ backgroundColor: "#001840", padding: "24px", borderRadius: "16px" }}>
              <Col xs={24} lg={12}>
                <div style={{ padding: "24px", borderRadius: "8px", height: "100%" }}>
                  <Title level={4} style={{ color: "white" }}>
                    Help us do more
                  </Title>

                  <Paragraph style={{ color: "white", fontSize: "10px" }}>Dear members, many students are unable to afford the app charges, limiting their access to vital learning resources. We&apos;re stepping in to help cover these costs, ensuring every student has a chance to learn, no matter their financial situation. Your donation is crucial—it opens doors to education for those in need and helps us support underfunded rural schools, where students study under incredibly harsh conditions. Together, we can break the cycle of poverty and build a brighter future for these young minds.</Paragraph>
                </div>
              </Col>
              <Col xs={24} lg={12}>
                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                  <Text strong style={{ color: "white", fontSize: "12px" }}>
                    Choose payment method
                  </Text>
                  <Space style={{ backgroundColor: "white", padding: "6px 6px", borderRadius: "24px" }}>
                    {paymentMethods.map((tab) => (
                      <Button
                        key={tab.key}
                        type="default"
                        onClick={() => setActivePayTab(tab.key)}
                        shape="round"
                        style={{
                          backgroundColor: activePayTab === tab.key ? "#001840" : "white",
                          color: activePayTab === tab.key ? "white" : "#001840",
                          borderColor: "#001840",
                        }}
                      >
                        {tab.label}
                      </Button>
                    ))}
                  </Space>

                  <div style={{ padding: "8px", borderRadius: "8px" }}>
                    {activePayTab === "bank" && (
                      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                        <Row gutter={[16, 16]}>
                          <Col xs={24} md={8}>
                            <Input placeholder="Card Number" className="input-placeholder !placeholder-gray-400" style={{ color: "white", borderColor: "white", backgroundColor: "#001840" }} />
                          </Col>

                          <Col xs={24} md={8}>
                            <Input placeholder="Expiration Date" className="!placeholder-gray-400" style={{ color: "white", borderColor: "white", backgroundColor: "#001840" }} />
                          </Col>
                          <Col xs={24} md={8}>
                            <Input placeholder="Security Code" className="!placeholder-gray-400" style={{ color: "white", borderColor: "white", backgroundColor: "#001840" }} />
                          </Col>
                        </Row>
                        <Select defaultValue="tanzania" className="custom-select-tag border border-white rounded-md w-full">
                          <Option value="tanzania">Tanzania</Option>
                          <Option value="kenya">Kenya</Option>
                          <Option value="uganda">Uganda</Option>
                        </Select>
                        <Text style={{ color: "white", fontSize: "10px" }}>By providing your card information, you allow Gala Education to charge your card for future payments in accordance with their terms.</Text>
                        <Button type="primary" style={{ background: "#007AFF", fontWeight: "bold" }}>
                          Pay Now
                        </Button>
                      </Space>
                    )}
                    {activePayTab === "mobile" && <Text style={{ color: "white" }}>Mobile payment </Text>}
                  </div>
                </Space>
              </Col>
            </Row>
          </Space>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Donate;
