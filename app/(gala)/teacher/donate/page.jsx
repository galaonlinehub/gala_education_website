"use client"

import React, { useState } from "react"
import { Tabs, Button, Input, Select, Row, Col, Typography, Space } from "antd"

const { TabPane } = Tabs
const { Title, Paragraph, Text } = Typography
const { Option } = Select

const TeacherDonate = () => {
  const [activeTab, setActiveTab] = useState("monthly")
  const [activePayTab, setActivePayTab] = useState("bank")

  const donationFrequencies = [
    { key: "monthly", label: "Monthly" },
    { key: "onetime", label: "One time" },
  ]

  const paymentMethods = [
    { key: "bank", label: "Bank A/C" },
    { key: "mobile", label: "Mobile" },
  ]

  return (
    <div className="container" style={{ padding: "24px" }}>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Donate Now" key="1">
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div style={{ textAlign: "center" }}>
              <Title level={3}>Donate Now</Title>
              <Paragraph>
                Welcome to our donation page, where your generosity helps transform lives through education and
                opportunity!
              </Paragraph>
            </div>
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                <div style={{ background: "#001840", padding: "24px", borderRadius: "8px", height: "100%" }}>
                  <Title level={4} style={{ color: "white" }}>
                    Help us do more
                  </Title>
                  <Paragraph style={{ color: "white" }}>
                    Dear members, many students are unable to afford the app charges, limiting their access to vital
                    learning resources. We're stepping in to help cover these costs, ensuring every student has a chance
                    to learn, no matter their financial situation. Your donation is crucial—it opens doors to education
                    for those in need and helps us support underfunded rural schools, where students study under
                    incredibly harsh conditions. Together, we can break the cycle of poverty and build a brighter future
                    for these young minds.
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} lg={12}>
                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                  <Text strong style={{ color: "white" }}>
                    Choose donation frequency
                  </Text>
                  <Space wrap>
                    {donationFrequencies.map((tab) => (
                      <Button
                        key={tab.key}
                        type={activeTab === tab.key ? "primary" : "default"}
                        onClick={() => setActiveTab(tab.key)}
                        shape="round"
                      >
                        {tab.label}
                      </Button>
                    ))}
                  </Space>
                  <div style={{ background: "#001840", padding: "24px", borderRadius: "8px" }}>
                    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                      <Text strong style={{ color: "white" }}>
                        Select donation amount
                      </Text>
                      <Space wrap>
                        {[1000, 5000, 10000].map((amount) => (
                          <Button key={amount} style={{ width: "80px", color: "white", borderColor: "white" }}>
                            {amount}
                          </Button>
                        ))}
                      </Space>
                      <Space>
                        <Text style={{ color: "white" }}>or</Text>
                        <Input placeholder="Enter amount" style={{ width: "120px" }} />
                      </Space>
                      <Input placeholder="Enter your name" style={{ color: "white", borderColor: "white" }} />
                      <Text style={{ color: "white" }}>
                        <a style={{ color: "#1890ff" }}>Click here</a> to make a donation in honour of someone special.
                      </Text>
                    </Space>
                  </div>
                  <Button type="primary" style={{ background: "#007AFF" }}>
                    Donate Now
                  </Button>
                </Space>
              </Col>
            </Row>
          </Space>
        </TabPane>
        <TabPane tab="Payment Method" key="2">
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div style={{ textAlign: "center" }}>
              <Title level={3}>Payment Method</Title>
              <Paragraph>
                Welcome to our donation page, where your generosity helps transform lives through education and
                opportunity!
              </Paragraph>
            </div>
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                <div style={{ background: "#001840", padding: "24px", borderRadius: "8px", height: "100%" }}>
                  <Title level={4} style={{ color: "white" }}>
                    Help us do more
                  </Title>
                  <Paragraph style={{ color: "white" }}>
                    Dear members, many students are unable to afford the app charges, limiting their access to vital
                    learning resources. We're stepping in to help cover these costs, ensuring every student has a chance
                    to learn, no matter their financial situation. Your donation is crucial—it opens doors to education
                    for those in need and helps us support underfunded rural schools, where students study under
                    incredibly harsh conditions. Together, we can break the cycle of poverty and build a brighter future
                    for these young minds.
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} lg={12}>
                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                  <Text strong style={{ color: "white" }}>
                    Choose payment method
                  </Text>
                  <Space wrap>
                    {paymentMethods.map((tab) => (
                      <Button
                        key={tab.key}
                        type={activePayTab === tab.key ? "primary" : "default"}
                        onClick={() => setActivePayTab(tab.key)}
                        shape="round"
                      >
                        {tab.label}
                      </Button>
                    ))}
                  </Space>
                  <div style={{ background: "#001840", padding: "24px", borderRadius: "8px" }}>
                    {activePayTab === "bank" && (
                      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                        <Row gutter={[16, 16]}>
                          <Col xs={24} md={8}>
                            <Input placeholder="Card Number" style={{ color: "white", borderColor: "white" }} />
                          </Col>
                          <Col xs={24} md={8}>
                            <Input placeholder="Expiration Date" style={{ color: "white", borderColor: "white" }} />
                          </Col>
                          <Col xs={24} md={8}>
                            <Input placeholder="Security Code" style={{ color: "white", borderColor: "white" }} />
                          </Col>
                        </Row>
                        <Select defaultValue="tanzania" style={{ width: "100%" }}>
                          <Option value="tanzania">Tanzania</Option>
                          <Option value="kenya">Kenya</Option>
                          <Option value="uganda">Uganda</Option>
                        </Select>
                        <Text style={{ color: "white" }}>
                          By providing your card information, you allow Gala Education to charge your card for future
                          payments in accordance with their terms.
                        </Text>
                        <Button type="primary" style={{ background: "#007AFF" }}>
                          Pay Now
                        </Button>
                      </Space>
                    )}
                    {activePayTab === "mobile" && (
                      <Text style={{ color: "white" }}>Mobile payment form goes here</Text>
                    )}
                  </div>
                </Space>
              </Col>
            </Row>
          </Space>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default TeacherDonate