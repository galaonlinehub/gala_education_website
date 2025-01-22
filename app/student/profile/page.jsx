// 'use client'
// import React from 'react';
// import {
//   BookOutlined,
//   TrophyOutlined,
//   MailOutlined,
//   PhoneOutlined,
//   EnvironmentOutlined,
//   CalendarOutlined,
//   StarOutlined,
//   CheckCircleOutlined,
//   ClockCircleOutlined,
//   LineChartOutlined
// } from '@ant-design/icons';

// const StudentProfile = () => {
//   const student = {
//     name: "Sarah Johnson",
//     email: "sarah.johnson@email.com",
//     phone: "+1 (555) 123-4567",
//     classesBought: 12,
//     joinedDate: "January 2024",
//     location: "New York, USA",
//     achievements: 5,
//     completedClasses: 8,
//     inProgressClasses: 4,
//     currentStreak: 15,
//     skills: ["JavaScript", "React", "Python", "Data Science", "UI/UX", "Node.js"],
//     recentActivity: [
//       { date: "2024-01-15", action: "Completed Advanced React Course", type: "completion" },
//       { date: "2024-01-10", action: "Earned 'Top Performer' Badge", type: "achievement" },
//       { date: "2024-01-05", action: "Started Machine Learning Basics", type: "started" },
//       { date: "2024-01-01", action: "Joined Platform", type: "joined" }
//     ],
//     certificates: ["React Master", "Python Pro", "Data Science Specialist"]
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Profile Header */}
//         <div className="bg-white rounded-2xl shadow-md mb-8 overflow-hidden">
//           <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-400"></div>
//           <div className="px-6 pb-6">
//             <div className="flex flex-col md:flex-row items-center gap-6 -mt-12">
//               <div className="relative">
//                 <img
//                   src="/api/placeholder/128/128"
//                   alt="Profile"
//                   className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover bg-white"
//                 />
//                 <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></span>
//               </div>
//               <div className="flex-1 text-center md:text-left mt-4 md:mt-0">
//                 <h1 className="text-3xl font-bold text-gray-800">{student.name}</h1>
//                 <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-2">
//                   <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
//                     <StarOutlined className="mr-1" /> Active Student
//                   </span>
//                   <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
//                     <LineChartOutlined className="mr-1" /> {student.currentStreak} Day Streak
//                   </span>
//                 </div>
//               </div>
//               <div className="flex gap-6 mt-6 md:mt-0">
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-gray-800">{student.classesBought}</div>
//                   <div className="text-sm text-gray-500">Classes</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-gray-800">{student.achievements}</div>
//                   <div className="text-sm text-gray-500">Achievements</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Content - Left Side */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Progress Section */}
//             <div className="bg-white rounded-xl shadow-md p-6">
//               <h2 className="text-xl font-bold text-gray-800 mb-6">Learning Progress</h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="bg-blue-50 rounded-lg p-4">
//                   <div className="flex items-center justify-between">
//                     <span className="text-blue-600"><CheckCircleOutlined className="text-xl" /></span>
//                     <span className="text-2xl font-bold text-blue-600">{student.completedClasses}</span>
//                   </div>
//                   <p className="text-sm text-blue-600 mt-2">Completed</p>
//                 </div>
//                 <div className="bg-purple-50 rounded-lg p-4">
//                   <div className="flex items-center justify-between">
//                     <span className="text-purple-600"><ClockCircleOutlined className="text-xl" /></span>
//                     <span className="text-2xl font-bold text-purple-600">{student.inProgressClasses}</span>
//                   </div>
//                   <p className="text-sm text-purple-600 mt-2">In Progress</p>
//                 </div>
//                 <div className="bg-green-50 rounded-lg p-4">
//                   <div className="flex items-center justify-between">
//                     <span className="text-green-600"><TrophyOutlined className="text-xl" /></span>
//                     <span className="text-2xl font-bold text-green-600">
//                       {Math.round((student.completedClasses / student.classesBought) * 100)}%
//                     </span>
//                   </div>
//                   <p className="text-sm text-green-600 mt-2">Completion Rate</p>
//                 </div>
//               </div>
//             </div>

//             {/* Certificates */}
//               {/* <div className="bg-white rounded-xl shadow-md p-6">
//                 <h2 className="text-xl font-bold text-gray-800 mb-6">Certificates</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {student.certificates.map((cert, index) => (
//                     <div
//                       key={index}
//                       className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200"
//                     >
//                       <div className="flex items-center gap-3">
//                         <BookOutlined className="text-blue-600 text-xl" />
//                         <span className="font-medium text-blue-800">{cert}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div> */}

//             {/* Recent Activity */}
//             <div className="bg-white rounded-xl shadow-md p-6">
//               <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h2>
//               <div className="space-y-6">
//                 {student.recentActivity.map((activity, index) => (
//                   <div
//                     key={index}
//                     className="flex gap-4 items-start border-l-2 border-blue-200 pl-4 pb-4"
//                   >
//                     <div className="flex-1">
//                       <p className="font-medium text-gray-800">{activity.action}</p>
//                       <p className="text-sm text-gray-500 mt-1">{activity.date}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Sidebar - Right Side */}
//           <div className="space-y-8">
//             {/* Contact Information */}
//             <div className="bg-white rounded-xl shadow-md p-6">
//               <h2 className="text-xl font-bold text-gray-800 mb-6">Contact Information</h2>
//               <div className="space-y-4">
//                 <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                   <MailOutlined className="text-gray-600" />
//                   <div>
//                     <p className="text-sm text-gray-500">Email</p>
//                     <p className="text-gray-800 font-medium">{student.email}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                   <PhoneOutlined className="text-gray-600" />
//                   <div>
//                     <p className="text-sm text-gray-500">Phone</p>
//                     <p className="text-gray-800 font-medium">{student.phone}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                   <EnvironmentOutlined className="text-gray-600" />
//                   <div>
//                     <p className="text-sm text-gray-500">Location</p>
//                     <p className="text-gray-800 font-medium">{student.location}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                   <CalendarOutlined className="text-gray-600" />
//                   <div>
//                     <p className="text-sm text-gray-500">Joined</p>
//                     <p className="text-gray-800 font-medium">{student.joinedDate}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Skills */}
//             <div className="bg-white rounded-xl shadow-md p-6">
//               <h2 className="text-xl font-bold text-gray-800 mb-6">Skills</h2>
//               <div className="flex flex-wrap gap-2">
//                 {student.skills.map((skill, index) => (
//                   <span
//                     key={index}
//                     className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentProfile;

"use client";
import React from "react";
import {
  Card,
  Row,
  Col,
  Avatar,
  Typography,
  Statistic,
  Tag,
  Timeline,
  Divider,
} from "antd";
import {
  BookOutlined,
  TrophyOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  StarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import useUser from "@/src/store/auth/user";

const { Title, Text } = Typography;

const StudentProfile = () => {

  const {user} = useUser();
  const student = {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    classesBought: 12,
    joinedDate: "January 2024",
    location: "New York, USA",
    achievements: 5,
    completedClasses: 8,
    inProgressClasses: 4,
    skills: ["JavaScript", "React", "Python", "Data Science"],
    recentActivity: [
      { date: "2024-01-15", action: "Completed Advanced React Course" },
      { date: "2024-01-10", action: "Earned 'Top Performer' Badge" },
      { date: "2024-01-05", action: "Started Machine Learning Basics" },
      { date: "2024-01-01", action: "Joined Platform" },
    ],
  };

  return (
    <div className="mt-20">
      <Row gutter={[24, 24]} justify="center">
        <div className="w-full px-4 lg:px-12">
          <Card
            bordered={true}
            style={{ marginBottom: "24px" }}
            className="profile-header"
          >
            <Row align="middle" justify="space-between">
              <Col xs={24} md={12}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "16px" }}
                >
                  <Avatar
                    size={96}
                    src="/api/placeholder/96/96"
                    style={{ border: "4px solid #1890ff" }}
                  />
                  <div>
                    <Title level={2} className="capitalize">
                      {user.first_name}{" "}{user.last_name}
                    </Title>
                    <Tag color="blue" icon={<StarOutlined />}>
                      Active Student
                    </Tag>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={12}>
                <Row gutter={[16, 16]} justify="end">
                  <Col>
                    <Statistic
                      title="Classes Bought"
                      value={student.classesBought}
                      prefix={<BookOutlined />}
                    />
                  </Col>
                  <Col>
                    <Statistic
                      title="Achievements"
                      value={student.achievements}
                      prefix={<TrophyOutlined />}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>

          {/* Main Content */}
          <Row gutter={[24, 24]}>
            {/* Left Column */}
            <Col xs={24} md={16}>
              {/* Progress Card */}
              <Card
                title={<Title level={4}>Learning Progress</Title>}
                bordered={true}
                style={{ marginBottom: "24px" }}
              >
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Statistic
                      title="Completed"
                      value={student.completedClasses}
                      prefix={
                        <CheckCircleOutlined style={{ color: "#52c41a" }} />
                      }
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title="In Progress"
                      value={student.inProgressClasses}
                      prefix={
                        <ClockCircleOutlined style={{ color: "#1890ff" }} />
                      }
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title="Completion Rate"
                      value={Math.round(
                        (student.completedClasses / student.classesBought) * 100
                      )}
                      suffix="%"
                    />
                  </Col>
                </Row>
              </Card>

              {/* Recent Activity */}
              <Card
                title={<Title level={4}>Recent Activity</Title>}
                bordered={true}
              >
                <Timeline>
                  {student.recentActivity.map((activity, index) => (
                    <Timeline.Item key={index} color="blue">
                      <Text strong>{activity.action}</Text>
                      <br />
                      <Text type="secondary">{activity.date}</Text>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </Card>
            </Col>

            {/* Right Column */}
            <Col xs={24} md={8}>
              {/* Contact Information */}
              <Card
                title={<Title level={4}>Contact Information</Title>}
                bordered={true}
                style={{ marginBottom: "24px" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <div>
                    <Text type="secondary">
                      <MailOutlined /> Email
                    </Text>
                    <div>
                      <Text strong>{user.email}</Text>
                    </div>
                  </div>
                  <div>
                    <Text type="secondary">
                      <PhoneOutlined /> Phone
                    </Text>
                    <div>
                      <Text strong>{student.phone}</Text>
                    </div>
                  </div>
                  <div>
                    <Text type="secondary">
                      <EnvironmentOutlined /> Location
                    </Text>
                    <div>
                      <Text strong>{student.location}</Text>
                    </div>
                  </div>
                  <div>
                    <Text type="secondary">
                      <CalendarOutlined /> Joined
                    </Text>
                    <div>
                      <Text strong>{student.joinedDate}</Text>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Skills */}
              <Card title={<Title level={4}>Skills</Title>} bordered={true}>
                {student.skills.map((skill, index) => (
                  <Tag key={index} color="blue" style={{ margin: "4px" }}>
                    {skill}
                  </Tag>
                ))}
              </Card>
            </Col>
          </Row>
        </div>
      </Row>
    </div>
  );
};

export default StudentProfile;
