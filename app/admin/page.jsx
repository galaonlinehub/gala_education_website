import {
    DashboardCard,
    DashboardLineChart,
    DashboardPieChart,
    RecentCustomers,
} from "@/src/features/admin";
import React from "react";
import { FaUserTie } from "react-icons/fa6";
import { MdOutlineClass } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";

function AdminPage() {
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

            {/* cards */}
            <div className="grid sm:grid-cols-3 gap-6 ">
                <DashboardCard
                    title={"Students"}
                    bg={"bg-purple-300/20 text-purple-500"}
                    value={200}
                    icon={PiStudentFill}
                />

                <DashboardCard
                    title={"Instructors"}
                    bg={"bg-blue-300/20 text-blue-500"}
                    value={200}
                    icon={FaUserTie}
                />

                <DashboardCard
                    title={"Cohorts"}
                    bg={"bg-orange-500/15 text-orange-500"}
                    value={200}
                    icon={MdOutlineClass}
                />
            </div>
            <div className="grid grid-cols-3 gap-x-4">
                <DashboardLineChart />
                <DashboardPieChart />
            </div>
            <RecentCustomers />
        </div>
    );
}

export default AdminPage;
