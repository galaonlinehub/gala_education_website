"use client"
import { Tag } from "antd";
import Link from "next/link";

export const studentColumns = [
    {
        name: "Name",
        cell: (row) => <Link href={`/admin/students/profile/${row?.user_id}`}>
        {row.student_name}
        
        </Link>
    },
    {
        name: "Email",
        selector: (row) => row.email,
        width:"240px"
    },
    {
        name: "Student ID",
        selector: (row) => row.student_id,
        width:"120px"
    },
    {
        name: "Enrolled Cohorts",
        selector: (row) => row.enrolled_cohorts,
    },
    {
        name: "Subscription Status",
        cell: (row) => (
            <Tag color={row.subscription_status ? "green" : "orange"}>
                {row.subscription_status ? "Active" : "Inactive"}
            </Tag>
        ),
    },
];
