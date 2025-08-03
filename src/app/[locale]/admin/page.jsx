"use client";
import { Skeleton } from "antd";
import React from "react";


import {
  DashboardCard,
  DashboardLineChart,
  DashboardPieChart,
  RecentCustomers,
} from "@/features/admin";
import { useDashboard } from "@/features/admin/hooks/useDashboard.hooks";

function AdminPage() {
  const { metrics, isFetchingMetrics, metricsError, metricsConfig } = useDashboard();

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex justify-between  flex-col sm:flex-row gap-y-5 sm-gap-y-0">
        <div>
          <h1 className="font-black text-gray-800">Welcome back!</h1>
          <h2 className="text-gray-700 text-xs">
            Gala education administrator
          </h2>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 sm:gap-6 gap-2">
        {metricsConfig.map(({ title, icon: Icon, bg }, index) => (
          <DashboardCard
            key={index}
            title={title}
            value={
              isFetchingMetrics ? (
                <Skeleton title={false} active paragraph={{ rows: 1, width: ["100%"],}} className="mt-2" />
              ) : (
                metrics?.find((m) => m.title === title)?.value ?? 0
              )
            }
            bg={bg}
            icon={Icon}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-4">
        <DashboardLineChart />
        <DashboardPieChart />
      </div>
      <RecentCustomers />
    </div>
  );
}

export default AdminPage;
