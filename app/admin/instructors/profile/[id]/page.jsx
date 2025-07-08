"use client";
import React, { useState } from "react";
import { Switch } from "antd";
import { useQuery } from "@tanstack/react-query";
import { InstructorProfile, UserCard } from "@/src/features/admin";
import { apiGet } from "@/src/services/api/api_service";

function ProfileId({ params: { id } }) {
    const [active, setActive] = useState(true);

    const getDetails = async () => {
        const { data } = await apiGet(`users/${id}`);

        return data;
    };

    const { data, isLoading } = useQuery({
        queryKey: ["user", id],
        queryFn: getDetails,
    });

    return (
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <div className="flex justify-between">
                        <div className="flex gap-x-3 items-center">
                            <span className="text-blue-900">
                                {active ? "active" : "inactive"}
                            </span>
                            <Switch
                                checked={active}
                                onChange={() => setActive(!active)}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <UserCard
                            user={{
                                instructor_id: data?.instructor_id,
                                name: data?.name,
                                role: data?.role,
                                is_verified: data?.is_verified,
                                total_students:data?.student_count,
                                total_cohorts:data?.active_cohorts,
                                has_active_subscription:data?.has_active_subscription,
                                subscription_type:data?.subscription_type,
                                status:data?.status
                            }}
                        />
                    </div>
                    <InstructorProfile user={data} />
                </div>
            )}
        </>
    );
}

export default ProfileId;
