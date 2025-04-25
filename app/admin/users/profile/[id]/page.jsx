"use client";
import React, { useState } from "react";
import { Switch } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import InstructorProfile from "@/src/components/admin/InstructorProfile";
import { apiGet, apiPost } from "@/src/services/api_service";
import UserCard from "@/src/components/admin/UserCard";
import { useRouter } from "next/navigation";

function ProfileId({ params: { id } }) {
    const [active, setActive] = useState(true);

    const getDetails = async () => {
        const { data } = await apiGet(`users/${id}`);

        return data;
    };

    const { data, error, isLoading } = useQuery({
        queryKey: ["user", id],
        queryFn: getDetails,
    });

    const queryClient = useQueryClient();
    const router = useRouter();

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
                                instructor_id: data?.instructor?.id,
                                name: data?.name,
                                role: data?.role,
                                is_verified: data?.instructor?.is_verified,
                            }}
                        />
                       
                    </div>
                    <div>
                        {data?.role === "instructor" && (
                            <InstructorProfile user={data} />
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default ProfileId;
