"use client";

import React, { useState } from "react";
import { Progress, Card, Typography, Button, Row, Col, Statistic, Tag, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function ManageClass() {
  const [showSidebar, setShowSidebar] = useState(false);

  const tableItems = [
    {
      name: "Erick Edward Mgema",
      class: "Physics",
      end_date: "June 3, 2024",
      fee: "10,000/=",
      payment: "Paid",
      status: "Terminate",
    },
    {
      name: "Frank Jonas Ndagula",
      class: "English",
      end_date: "June 3, 2024",
      fee: "20,000/=",
      payment: "Paid",
      status: "Terminate",
    },
  ];

  const managedClasses = [
    {
      category: "Math",
      name: "Mathematics: Form Three",
      topic: "Quadratic Equations",
      progress: 99,
      active_st: "09",
      absent_st: "01",
      pending_st: "30",
      time: "08:00 AM",
    },
    {
      category: "Physics",
      name: "Physics: Form Six",
      topic: "Thermal Expansion",
      progress: 28,
      active_st: "09",
      absent_st: "01",
      pending_st: "30",
      time: "08:00 AM",
    },
    {
      category: "Biology",
      name: "Biology: Form Four",
      topic: "Genetics and Inheritance",
      progress: 56,
      active_st: "09",
      absent_st: "01",
      pending_st: "30",
      time: "08:00 AM",
    },
  ];

  const getProgressColor = (progress) => {
    if (progress > 80) return "#4caf50";
    if (progress > 50) return "#ffa500";
    return "#f44336";
  };

  return (
    <div className="p-4 lg:p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex text-xs gap-6">
          <div className="flex gap-1">
            <span>Total number of students:</span>
            <span>10</span>
          </div>
          <div className="flex gap-1">
            <span>Recent Applications:</span>
            <span>10</span>
          </div>
          <div className="flex gap-1">
            <span>Pending Applications:</span>
            <span>10</span>
          </div>
        </div>
        <div className="p-2 rounded border text-xs border-blue-700">Accept Applications</div>
      </div>
      <div className="text-xs">
        {managedClasses.map((item, i) => {
          return (
            <div key={i} className="flex mb-4 justify-evenly flex-col gap-3 lg:flex-row items-center">
              <div className="flex flex-col font-semibold gap-1">
                <button className="p-1 rounded-2xl border border-blue-600">{item.category}</button>
                <span className="text-green-600 font-semibold">{item.time}</span>
              </div>
              <div className="flex flex-col p-2 font-semibold border h-32 justify-center gap-2 border-blue-700 rounded-md w-72 overflow-hidden">
                <div className="truncate">{item.name}</div>
                <div className="flex justify-between items-center">
                  <span className="truncate">{item.topic}</span>
                  <span>{item.progress}</span>
                </div>
                <div>
                  <Progress strokeColor="#4caf50" percent={item.progress} showInfo={false} />
                </div>
              </div>

              <div className="flex flex-col p-2 border h-32 font-semibold justify-center gap-2 border-blue-700 rounded-md w-72">
                <div>Record of Students</div>
                <div className="flex gap-2 justify-between">
                  <div className="flex flex-col items-center">
                    <span className="text-green-400 font-bold">{item.active_st}</span>
                    <span>Active</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-blue-400 font-bold">{item.absent_st}</span>
                    <span>Absent</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-red-600 font-bold">{item.pending_st}</span>
                    <span>Pending</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-blue-700 font-bold">Messages (12)</span>
                <button className="p-2 rounded-md bg-[#030DFE] text-white font-bold">Edit Class</button>
              </div>
            </div>
          );
        })}
      </div>
      <span className="lg:px-12 text-xs mb-1 font-bold">Total number of students</span>
      <div className="overflow-x-auto lg:px-12">
        <div className="rounded-md p-2 font-semibold flex text-xs justify-between items-center text-white bg-[#001840] mb-2 min-w-[600px]">
          <span className="w-1/12 text-center">S/N</span>
          <span className="w-2/12 text-center">Name</span>
          <span className="w-3/12 text-center">Class</span>
          <span className="w-2/12 text-center">End Date</span>
          <span className="w-2/12 text-center">Fee</span>
          <span className="w-2/12 text-center">Payment</span>
          <span className="w-2/12 text-center">Status</span>
        </div>
        {tableItems.map((item, i) => (
          <div key={i} className="rounded-md p-2 font-semibold flex text-xs justify-between items-center text-black mb-2 min-w-[600px]">
            <span className="w-1/12 text-center">0{i + 1}</span>
            <span className="w-2/12 text-center">{item.name}</span>
            <span className="w-3/12 text-center">{item.class}</span>
            <span className="w-2/12 text-center">{item.end_date}</span>
            <span className="w-2/12 text-center">{item.fee}</span>
            <span className="w-2/12 text-center">{item.payment}</span>
            <span className="w-2/12 text-center">
              <button className="p-1.5 bg-[#CB1414] rounded-md text-white">{item.status}</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}