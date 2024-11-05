// "use client";
// import React, { useState } from "react";
// import { Tabs } from "antd";
// // Import your custom styles

// const StudentDonate = () => {
//   const callback = (key) => {
//     console.log(key);
//   };

//   const [activeTab, setActiveTab] = useState("tab1");
//   const [activePayTab, setActivePayTab] = useState("tab3");

//   const tabs = [
//     { key: "tab1", label: "Monthly" },
//     { key: "tab2", label: "One time" },
//   ];

//   const payTabs = [
//     { key: "tab3", label: "Bank A/C" },
//     { key: "tab4", label: "Mobile" },
//   ];

//   const items = [
//     {
//       key: "1",
//       label: "Donate Now",
//       children: (
//         <div className="flex flex-col">
//           <div className="flex flex-col mb-5">
//             <span style={{ fontSize: "12px" }} className="flex self-center font-bold">
//               Donate Now
//             </span>
//             <span style={{ fontSize: "10px" }} className="flex self-center font-semibold ">
//               Welcome to our donation page, where your generosity helps transform lives through education and opportunity!
//             </span>
//           </div>
//           <div className="bg-[#001840] w-full h-96 rounded-lg flex justify-between  p-4">
//             <div className=" flex flex-col w-1/2 p-3 text-white">
//               <span style={{ fontSize: "20px", fontWeight: "bold", paddingBottom: "6px" }}>Help us do more</span>
//               <span style={{ fontSize: "10px" }}>Dear members, many students are unable to afford the app charges, limiting their access to vital learning resources. We’re stepping in to help cover these costs, ensuring every student has a chance to learn, no matter their financial situation. Your donation is crucial—it opens doors to education for those in need and helps us support underfunded rural schools, where students study under incredibly harsh conditions. Together, we can break the cycle of poverty and build a brighter future for these young minds.</span>
//             </div>
//             <div className=" w-1/2 p-3">
//               <span className="text-xs ml-4 text-white font-bold">Choose donation frequency</span>
//               <div className="flex flex-col items-start w-full">
//                 <div className="flex bg-white ml-4 p-1 mt-3 rounded-3xl space-x-4 mb-6">
//                   {tabs.map((tab) => (
//                     <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`px-6 py-2  rounded-full font-semibold text-xs transition-colors duration-300 ${activeTab === tab.key ? "bg-[#001840] text-white" : "bg-white text-gray-700 hover:bg-gray-300"}`}>
//                       {tab.label}
//                     </button>
//                   ))}
//                 </div>

//                 <div className="bg-[#001840] w-full max-w-md h-40 rounded-lg flex  p-4 shadow-lg">
//                   {activeTab === "tab1" ? (
//                     <div className="flex flex-col">
//                       <div className="flex text-white font-bold text-xs justify-start gap-3">
//                         <div className="text-xs text-white font-bold ">
//                           <span>Select donation amount</span>
//                           <div className="font-bold mt-3 flex gap-2">
//                             <button className="p-2 border border-white bg-[#001840] rounded-md w-14 items-center text-white">1,000</button>
//                             <button className="p-2 border border-white bg-[#001840] rounded-md w-14 items-center  text-white">5,000</button>
//                             <button className="p-2 border border-white bg-[#001840] rounded-md w-14 items-center  text-white">10,000</button>
//                           </div>
//                         </div>
//                         <p>or</p>
//                         <div>
//                           <span>Enter your own</span>
//                           <div className="mt-3">
//                             <input type="text" className="h-8 rounded-md text-black p-2 " />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="mt-4 mb-5 flex flex-col gap-2 text-white text-xs">
//                         <span className="font-bold">Name</span>
//                         <input type="text" className="h-10 border bg-[#001840] border-white p-2 w-full" placeholder="Enter your name" />
//                         <span>
//                           <a className="text-blue-700 font-semibold italic">Click here</a> to make a donation in honour of someone special.
//                         </span>
//                       </div>
//                       {/* <button className="p-2 bg-[#007AFF] text-sm font-bold w-32 h-10 rounded-md">Donate Now</button> */}
//                     </div>
//                   ) : (
//                     <div className="flex flex-col">
//                       <div className="flex text-white font-bold text-xs justify-start gap-3">
//                         <div className="text-xs text-white font-bold ">
//                           <span>Select donation amount</span>
//                           <div className="font-bold mt-3 flex gap-2">
//                             <button className="p-2 border border-white bg-[#001840] rounded-md w-14 items-center text-white">1,000</button>
//                             <button className="p-2 border border-white bg-[#001840] rounded-md w-14 items-center  text-white">5,000</button>
//                             <button className="p-2 border border-white bg-[#001840] rounded-md w-14 items-center  text-white">10,000</button>
//                           </div>
//                         </div>
//                         <p>or</p>
//                         <div>
//                           <span>Enter your own</span>
//                           <div className="mt-3">
//                             <input type="text" className="h-8 rounded-md text-black p-2" />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="mt-4 mb-5 flex flex-col gap-2 text-white text-xs">
//                         <span className="font-bold">Name</span>
//                         <input type="text" className="h-10 border bg-[#001840] w-full border-white p-2 " placeholder="Enter your name" />
//                         <span>
//                           <i href="#" className="text-blue-700 font-semibold">
//                             Click here
//                           </i>{" "}
//                           to make a donation in honour of someone special.
//                         </span>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <button className="p-2 bg-[#007AFF] mt-10 ml-4 text-white text-sm font-bold w-32 h-10 rounded-md">Donate Now</button>
//             </div>
//           </div>
//         </div>
//       ),
//     },
//     {
//       key: "2",
//       label: "Payment Method",
//       children: (
//         <div className="flex flex-col">
//           <div className="flex flex-col mb-5">
//             <span style={{ fontSize: "12px" }} className="flex self-center font-bold">
//               Donate Now
//             </span>
//             <span style={{ fontSize: "10px" }} className="flex self-center font-semibold ">
//               Welcome to our donation page, where your generosity helps transform lives through education and opportunity!
//             </span>
//           </div>
//           <div className="bg-[#001840] w-full h-96 rounded-lg flex justify-between p-4">
//             <div className=" flex flex-col text-white w-1/2 p-3">
//               <span style={{ fontSize: "20px", fontWeight: "bold", paddingBottom: "6px" }}>Help us do more</span>
//               <span style={{ fontSize: "10px" }}>Dear members, many students are unable to afford the app charges, limiting their access to vital learning resources. We’re stepping in to help cover these costs, ensuring every student has a chance to learn, no matter their financial situation. Your donation is crucial—it opens doors to education for those in need and helps us support underfunded rural schools, where students study under incredibly harsh conditions. Together, we can break the cycle of poverty and build a brighter future for these young minds.</span>
//             </div>
//             <div className=" w-1/2 p-3">
//               <span className="text-xs ml-4 text-white font-bold">Choose payment method</span>
//               <div className="flex flex-col items-start w-full ">
//                 <div className="flex bg-white ml-4 p-1 mt-3 rounded-3xl space-x-4 mb-2">
//                   {payTabs.map((tab) => (
//                     <button key={tab.key} onClick={() => setActivePayTab(tab.key)} className={`px-6 py-2  rounded-full font-semibold text-xs transition-colors duration-300 ${activePayTab === tab.key ? "bg-[#001840] text-white" : "bg-white text-gray-700 hover:bg-gray-300"}`}>
//                       {tab.label}
//                     </button>
//                   ))}
//                 </div>

//                 <div className="bg-[#001840] w-full max-w-md rounded-lg flex  p-4 shadow-lg">
//                   {activePayTab === "tab3" ? (
//                     <div className="flex flex-col w-full">
//                       <div className="flex text-black font-bold text-xs justify-between gap-3 w-full">
//                         <div className="flex-grow text-white">
//                           <span>Card Number</span>
//                           <input type="text" className="h-10 border text-white font-normal border-white rounded-md bg-[#001840] w-44 mt-1 p-2" />
//                         </div>
//                         <div className="flex-grow text-white">
//                           <span>Expiration Date</span>
//                           <input type="text" className="h-10 border text-white  font-normal border-white rounded-md bg-[#001840] w-28 mt-1 p-2" />
//                         </div>
//                         <div className="flex-grow text-white">
//                           <span>Security Code</span>
//                           <input type="text" className="h-10 border text-white  font-normal border-white rounded-md bg-[#001840] w-20 mt-1 p-2" />
//                         </div>
//                       </div>

//                       <div className="mt-4 mb-5 flex flex-col gap-2 text-white text-xs">
//                         <span className="font-bold">Country</span>
//                         <select className="h-10 border bg-[#001840] rounded-md border-white p-2 w-full">
//                           <option value="Tanzania">Tanzania</option>
//                           <option value="Kenya">Kenya</option>
//                           <option value="Uganda">Uganda</option>
//                         </select>
//                         {/* <input type="text" className="h-10 border border-white p-2 w-full" placeholder="Enter your name" /> */}
//                         <span>By providing your card information, you allow Gala Education to charge your card for future payments in accordance with their terms. </span>
//                       </div>
//                       <button className="p-2 bg-[#007AFF] text-sm text-white font-bold w-32 h-10 rounded-md">Pay Now</button>
//                     </div>
//                   ) : (
//                     <div className="flex flex-col"></div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="flex justify-center w-full">
//       <Tabs centered style={{ width: "90%" }} className="custom-tab-label mx-auto" defaultActiveKey="1" onChange={callback} items={items} />
//     </div>
//   );
// };

// export default StudentDonate;

"use client";

import React, { useState } from "react";
import { Tabs, Button, Input, Select, Row, Col, Typography, Space } from "antd";

const { TabPane } = Tabs;
const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const TeacherDonate = () => {
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

  return (
    <div className="container" style={{ padding: "24px" }}>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Donate Now" key="1">
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div style={{ textAlign: "center" }}>
              <Title level={3}>Donate Now</Title>
              <Paragraph>Welcome to our donation page, where your generosity helps transform lives through education and opportunity!</Paragraph>
            </div>
            <Row gutter={[24, 24]} style={{ backgroundColor: "#001840", padding: "24px", borderRadius: "16px" }}>
              <Col xs={24} lg={12}>
                <div style={{ background: "#001840", padding: "24px", borderRadius: "8px", height: "100%" }}>
                  <Title level={4} style={{ color: "white" }}>
                    Help us do more
                  </Title>
                  <Paragraph style={{ color: "white" }}>Dear members, many students are unable to afford the app charges, limiting their access to vital learning resources. We&apos;re stepping in to help cover these costs, ensuring every student has a chance to learn, no matter their financial situation. Your donation is crucial—it opens doors to education for those in need and helps us support underfunded rural schools, where students study under incredibly harsh conditions. Together, we can break the cycle of poverty and build a brighter future for these young minds.</Paragraph>
                </div>
              </Col>
              <Col xs={24} lg={12}>
                <Space direction="vertical" size="large" style={{ width: "100%", background: "#001840", padding: "2px" }}>
                  <Text strong style={{ color: "white" }}>
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

                  <div style={{ background: "#001840", padding: "8px", borderRadius: "8px" }}>
                    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                      <Text strong style={{ color: "white" }}>
                        Select donation amount
                      </Text>
                      <Space direction="horizontal" size="large">
                        <Space wrap size="small">
                          {[1000, 5000, 10000].map((amount) => (
                            <Button
                              key={amount}
                              onClick={() => handleButtonClick(amount)}
                              style={{
                                width: "50px",
                                backgroundColor: selectedAmount === amount ? "white" : "#001840",
                                color: selectedAmount === amount ? "black" : "white",
                                borderColor: "white",
                              }}
                            >
                              {amount}
                            </Button>
                          ))}
                        </Space>
                        <Space size="small">
                          <Text style={{ color: "white" }}>or</Text>
                          <Input placeholder="Enter amount" style={{ width: "120px" }} />
                        </Space>
                      </Space>

                      <Text strong style={{ color: "white" }}>
                        Name
                      </Text>
                      <Input placeholder="Enter your name" style={{ color: "white", borderColor: "white", backgroundColor: "#001840" }} />
                      <Text style={{ color: "white" }}>
                        <a style={{ color: "#1890ff" }}>Click here</a> to make a donation in honour of someone special.
                      </Text>
                    </Space>
                  </div>
                  <Button type="primary" style={{ background: "#007AFF", fontWeight: "bold" }}>
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
              <Paragraph>Welcome to our donation page, where your generosity helps transform lives through education and opportunity!</Paragraph>
            </div>
            <Row gutter={[24, 24]} style={{ backgroundColor: "#001840", padding: "24px", borderRadius: "16px" }}>
              <Col xs={24} lg={12}>
                <div style={{ background: "#001840", padding: "24px", borderRadius: "8px", height: "100%" }}>
                  <Title level={4} style={{ color: "white" }}>
                    Help us do more
                  </Title>
                  <Paragraph style={{ color: "white" }}>Dear members, many students are unable to afford the app charges, limiting their access to vital learning resources. We&apos;re stepping in to help cover these costs, ensuring every student has a chance to learn, no matter their financial situation. Your donation is crucial—it opens doors to education for those in need and helps us support underfunded rural schools, where students study under incredibly harsh conditions. Together, we can break the cycle of poverty and build a brighter future for these young minds.</Paragraph>
                </div>
              </Col>
              <Col xs={24} lg={12}>
                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                  <Text strong style={{ color: "white" }}>
                    Choose payment method
                  </Text>
                  <Space wrap style={{ backgroundColor: "white", padding: "6px 6px", borderRadius: "24px" }}>
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

                  <div style={{ background: "#001840", padding: "8px", borderRadius: "8px" }}>
                    {activePayTab === "bank" && (
                      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                        <Row gutter={[16, 16]}>
                          <Col xs={24} md={8}>
                            <Input placeholder="Card Number" className="input-placeholder" style={{ color: "white", borderColor: "white",  }} />
                          </Col>

                          <Col xs={24} md={8}>
                            <Input placeholder="Expiration Date" style={{ color: "white", borderColor: "white",  }} />
                          </Col>
                          <Col xs={24} md={8}>
                            <Input placeholder="Security Code" style={{ color: "white", borderColor: "white",  }} />
                          </Col>
                        </Row>
                        <Select defaultValue="tanzania" style={{ width: "100%", background: "#001840" }}>
                          <Option value="tanzania">Tanzania</Option>
                          <Option value="kenya">Kenya</Option>
                          <Option value="uganda">Uganda</Option>
                        </Select>
                        <Text style={{ color: "white" }}>By providing your card information, you allow Gala Education to charge your card for future payments in accordance with their terms.</Text>
                        <Button type="primary" style={{ background: "#007AFF", fontWeight:"bold" }}>
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

export default TeacherDonate;
