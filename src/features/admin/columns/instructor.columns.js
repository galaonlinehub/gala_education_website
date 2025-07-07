"use client"
import { Tag } from "antd";
import Link from "next/link";

export const instructorColumns = [
    {
        name: "Name",
        cell: (row) => <Link href={`/admin/instructors/profile/${row?.user_id}`}>
        {row.instructor_name}
        
        </Link>
    },
    {
        name: "Email",
        selector: (row) => row.email,
        width:"240px"
    },
    {
        name: "Instructor ID",
        selector: (row) => row.id,
        width:"120px"
    },
    {
        name: "Total Cohorts",
        selector: (row) => row.total_cohorts,
    },
    ,
    {
        name: "Total Students",
        selector: (row) => row.total_students,
    },
    {
        name: "Subscription Status",
        cell: (row) => (
            <Tag color={row.verified === "verified" ? "green" : row.verified === "pending" ? "orange":"red"}>
                {row.verified}
            </Tag>
        ),
    },
    {
        name: "Subscription Status",
        cell: (row) => (
            <Tag color={row.subscription_status ? "green" : "orange"}>
                {row.subscription_status ? "Active" : "Inactive"}
            </Tag>
        ),
    },
    {
        name: "Subscription Type",
        selector: (row) => row.subscription_type,
    },
];
