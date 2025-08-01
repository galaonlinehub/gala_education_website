"use client"
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Math", value: 5000, color: "#FF9F40" },
  { name: "English", value: 6000, color: "#8B5CF6" },
  { name: "Chemistry", value: 4000, color: "#22C55E" },
];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy }) => {
  return (
    <text
      x={cx}
      y={cy}
      fill="#000"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={20}
      fontWeight="bold"
    >
      Total\n15000
    </text>
  );
};

const DashboardPieChart = () => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  return (
    <div className="h-full bg-white rounded-xl shadow flex flex-col items-center justify-center">
      <h1 className="font-black text-ink-heading">Course Statistics</h1>
      <div className="relative w-48 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              <filter id="inner-shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#999" />
              </filter>
            </defs>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              startAngle={90}
              endAngle={-270}
              paddingAngle={5}
              dataKey="value"
              cornerRadius={20}
              labelLine={false}
            //   label={renderCustomizedLabel}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* Inner disc with shadow */}
        <div
          className="absolute top-1/2 left-1/2 w-28 h-28 rounded-full bg-white shadow-md"
          style={{ transform: "translate(-50%, -50%)", filter: "url(#inner-shadow)" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-sm text-gray-500 font-medium">Total</p>
          <p className="text-xl font-bold text-gray-800">{total}</p>
        </div>
      </div>
      <div>

      </div>
      <div className="grid grid-cols-3">
              {
                data.map(({color,name},index)=><div key={index} className="flex gap-x-2 items-center text-xs" index={index}>
                    <span>{name}</span>
                    <span style={{backgroundColor:color}} className="w-3 h-3 rounded-full" />
                </div>)
              }
      </div>
    </div>
  );
};

export default DashboardPieChart;
