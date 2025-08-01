"use client"
import React, { useState } from 'react';
import { LineChart, Line, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const DashboardLineChart = () => {
  const [activeStream, setActiveStream] = useState('subscription');

  const data = [
    { week: 'Jan 2025', donation: 15, cohorts: 45, subscription: 85, galaAi: 25 },
    { week: 'Feb 2025', donation: 28, cohorts: 35, subscription: 75, galaAi: 40 },
    { week: 'Mar 2025', donation: 35, cohorts: 65, subscription: 95, galaAi: 55 },
    { week: 'Apr 2025', donation: 22, cohorts: 55, subscription: 88, galaAi: 48 },
    { week: 'May 2025', donation: 42, cohorts: 75, subscription: 70, galaAi: 35 },
    { week: 'Jun 2025', donation: 38, cohorts: 68, subscription: 82, galaAi: 45 }
  ];

  const streamColors = {
    donation: '#8B5CF6',
    cohorts: '#06B6D4',
    subscription: '#FB923C',
    galaAi: '#10B981'
  };

  const streamLabels = {
    donation: 'Donation',
    cohorts: 'Cohorts',
    subscription: 'Subscription',
    galaAi: 'GalaAI'
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 rounded shadow relative col-span-2">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-base font-semibold text-gray-800 hidden sm:block">Revenue Summary</h2>
        <div className="flex gap-2">
          {Object.keys(streamColors).map((stream) => (
            <button
              key={stream}
              onClick={() => setActiveStream(stream)}
              className={`sm:px-4 sm:py-2 px-2 py-1 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeStream === stream
                  ? 'text-white shadow-md'
                  : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
              }`}
              style={activeStream === stream ? { backgroundColor: streamColors[stream] } : {}}
            >
              {streamLabels[stream]}
            </button>
          ))}
        </div>
      </div>

      <div className="h-80 w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }} animationDuration={300}>
            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12,angle: -30,dy: 10  }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              domain={[0, 120]}
            />

            {Object.keys(streamColors).map((stream) => (
              <Line
                key={`bg-${stream}`}
                type="monotone"
                dataKey={stream}
                stroke={streamColors[stream]}
                strokeWidth={2}
                strokeOpacity={activeStream === stream ? 1 : 0.2}
                dot={false}
                activeDot={false}
              />
            ))}

            <Area
              type="monotone"
              dataKey={activeStream}
              stroke={streamColors[activeStream]}
              fill={streamColors[activeStream]}
            //   fillOpacity={0.65}
              animationDuration={300}
            />

            <Line
              type="monotone"
              dataKey={activeStream}
              stroke={streamColors[activeStream]}
              strokeWidth={3}
              dot={{
                fill: streamColors[activeStream],
                strokeWidth: 0,
                r: 4
              }}
              activeDot={{
                r: 6,
                fill: streamColors[activeStream],
                strokeWidth: 0
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardLineChart;
