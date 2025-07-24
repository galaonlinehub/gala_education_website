"use client";
import { Avatar, Button, Tooltip } from "antd";
import { useDevice } from "@/src/hooks/misc/useDevice";
import { img_base_url } from "@/src/config/settings";
import {
    LuBookOpenText,
    LuCalendar,
    LuCircleCheckBig,
    LuClock4,
    LuMail,
    LuPhone,
    LuTrophy,
} from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/src/services/api/api_service";
import SlickSpinner from "@/src/components/ui/loading/template/SlickSpinner";
import clsx from "clsx";
import { useStudent } from "@/src/features/admin";
import { Fragment } from "react";

const StudentProfile = ({ params: { studentId } }) => {
    const { width } = useDevice();

    const { data: student, isFetching: studentIsFetching } =
        useStudent(studentId);

    const {
        data: activities,
        isFetching: activitiesLoading,
        isError: activitiesError,
    } = useQuery({
        queryKey: ["recent-activities"],
        queryFn: async () => {
            const response = await apiGet("/recent-activities");
            return response.data || [];
        },
        enabled: false,
        placeholderData: [],
    });

    const classesTotal = student?.total_cohorts;
    const classesCompleted = student?.completed_cohorts;
    const classesInProgress = student?.in_progress_cohorts;
    const achievements = student?.completed_cohorts;
    const completionRate = student?.completion_rate;

    return (
        <Fragment>
            {studentIsFetching ? (
                <div>Loading</div>
            ) : (
                <div className="max-w-7xl mx-auto px-1 sm:px-4 lg:px-8 py-8">
                    <div className="bg-white rounded-lg lg:shadow-md p-6 mb-6 border">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div className="flex flex-col sm:flex-row items-start gap-4">
                                <div className="relative group">
                                    <Avatar
                                        size={width > 768 ? 96 : 64}
                                        src={
                                            `${img_base_url}${student?.profile_picture}` ||
                                            undefined
                                        }
                                        className="border-2 border-blue-700 bg-transparent"
                                        icon={
                                            !student?.profile_picture && (
                                                <span className="text-xl md:text-3xl lg:text-5xl font-black text-blue-700">
                                                    {student?.name
                                                        ?.charAt(0)
                                                        ?.toUpperCase()}
                                                </span>
                                            )
                                        }
                                    />
                                </div>

                                <div className="mt-2 sm:mt-0">
                                    <div className="cursor-pointer group">
                                        <div className="flex items-center">
                                            <h1 className="text-2xl md:text-3xl font-bold text-black capitalize">
                                                {student?.name}
                                            </h1>
                                        </div>
                                        <div className="text-sm text-gray-500 capitalize">
                                            {student?.role}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-row items-start gap-6 md:gap-10">
                                <div className="flex flex-col items-center">
                                    <span className="text-sm text-gray-500">
                                        Classes Bought
                                    </span>
                                    <div className="flex gap-2 items-center p-2">
                                        <LuBookOpenText
                                            className="text-blue-600"
                                            size={28}
                                        />
                                        <span className="font-bold text-2xl">
                                            {classesTotal}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center">
                                    <span className="text-sm text-gray-500">
                                        Achievements
                                    </span>
                                    <div className="flex gap-2 items-center p-2">
                                        <LuTrophy
                                            className="text-amber-500"
                                            size={28}
                                        />
                                        <span className="font-bold text-2xl">
                                            {achievements}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-md p-6 mb-6 border">
                                <h2 className="text-xl font-bold mb-4">
                                    Learning Progress
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="bg-gray-50 rounded-md p-4 flex items-center justify-between">
                                        <div>
                                            <div className="text-sm text-gray-500 font-medium">
                                                Completed
                                            </div>
                                            <div className="text-lg font-semibold">
                                                {classesCompleted}
                                            </div>
                                        </div>
                                        <LuCircleCheckBig className="text-green-500 text-xl" />
                                    </div>

                                    <div className="bg-gray-50 rounded-md p-4 flex items-center justify-between">
                                        <div>
                                            <div className="text-sm text-gray-500 font-medium">
                                                In Progress
                                            </div>
                                            <div className="text-lg font-semibold">
                                                {classesInProgress}
                                            </div>
                                        </div>
                                        <LuClock4 className="text-blue-500 text-xl" />
                                    </div>

                                    <div className="bg-gray-50 rounded-md p-4 flex items-center justify-between">
                                        <div>
                                            <div className="text-sm text-gray-500 font-medium">
                                                Completion Rate
                                            </div>
                                            <div className="text-lg font-semibold">
                                                {completionRate}%
                                            </div>
                                        </div>
                                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                            <div
                                                className={clsx(
                                                    "text-sm font-medium",
                                                    {
                                                        "text-green-500":
                                                            completionRate > 70,
                                                        "text-blue-500":
                                                            completionRate >
                                                                40 &&
                                                            completionRate <=
                                                                70,
                                                        "text-red-500":
                                                            completionRate <=
                                                            40,
                                                    }
                                                )}
                                            >
                                                {completionRate}%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activity Card */}
                            <div className="bg-white rounded-lg shadow-md p-6 border">
                                <h2 className="text-xl font-bold mb-4">
                                    Recent Activity
                                </h2>

                                {activitiesLoading && (
                                    <div className="flex justify-center py-8">
                                        <SlickSpinner size={18} />
                                    </div>
                                )}

                                {activitiesError && (
                                    <div className="text-center py-6 text-red-500">
                                        Failed to load recent activities. Please
                                        try again later.
                                    </div>
                                )}

                                {!activitiesLoading &&
                                    !activitiesError &&
                                    activities?.length === 0 && (
                                        <div className="text-center py-6 text-gray-500">
                                            No recent activities found.
                                        </div>
                                    )}

                                {!activitiesLoading &&
                                    !activitiesError &&
                                    activities?.length > 0 && (
                                        <div className="space-y-4">
                                            {activities.map(
                                                (activity, index) => (
                                                    <div
                                                        key={index}
                                                        className="border-l-2 border-blue-500 pl-4 py-1"
                                                    >
                                                        <div className="font-medium">
                                                            {activity.action}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {activity.date}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            {/* Contact Information */}
                            <div className="bg-white rounded-lg shadow-md p-6 mb-6 border">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold">
                                        Contact Information
                                    </h2>
                                </div>

                                <div className="space-y-4">
                                    <div className="group">
                                        <div className="flex items-center justify-between">
                                            <div className="flex gap-2 items-center text-gray-500">
                                                <LuMail /> <span>Email</span>
                                            </div>
                                        </div>
                                        <div className="pl-6 font-medium truncate">
                                            {student?.email}
                                        </div>
                                    </div>

                                    <div className="group">
                                        <div className="flex items-center justify-between">
                                            <div className="flex gap-2 items-center text-gray-500">
                                                <LuPhone /> <span>Phone</span>
                                            </div>
                                        </div>
                                        <div className="pl-6 font-medium">
                                            {student?.phone_number}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex gap-2 items-center text-gray-500">
                                            <LuCalendar /> <span>Joined</span>
                                        </div>
                                        <div className="pl-6 font-medium">
                                            {student?.created_at}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default StudentProfile;
