// "use client";
// import { Avatar, Tag } from "antd";
// import React from "react";

// import CustomDataTable from "./CustomDataTable";
// import { useRecentPayments } from "../hooks/useRecentPayments.hook";

// function RecentCustomers() {
//     const customers = [
//         {
//             id: 1,
//             name: "Hudson Odoi",
//             status: "completed",
//             profilePicture: "/man.jpg",
//             paymentType: "monthly",
//         },
//         {
//             id: 2,
//             name: "Kimberly Owen",
//             status: "pending",
//             profilePicture: "/man.jpg",
//             paymentType: "yearly",
//         },
//         {
//             id: 3,
//             name: "James Johnson",
//             status: "failed",
//             profilePicture: "/man.jpg",
//             paymentType: "monthly",
//         },
//         {
//             id: 4,
//             name: "Emily Davis",
//             status: "completed",
//             profilePicture: "/man.jpg",
//             paymentType: "yearly",
//         },
//         {
//             id: 5,
//             name: "Chris Brown",
//             status: "pending",
//             profilePicture: "/man.jpg",
//             paymentType: "monthly",
//         },
//     ];

//     const recentPaymentColumns = [
//         {
//             name: "Image",
//             selector: (row) => <Avatar 
//               shape="square"
//               src={row.profilePicture}
//               alt={row.name}
//             />,
//             width:'100px'
//         },
//         {
//             name: "Name",
//             selector: (row) => row.name,
//         },
//         {
//             name: "Payment Type",
//             selector: (row) => row.paymentType,
//         },
//         {
//             name: "Status",
//             selector: (row) => (
//                 <Tag
//                     color={
//                         row.status === "completed"
//                             ? "green"
//                             : row.status === "pending"
//                             ? "orange"
//                             : "red"
//                     }
//                 >
//                     {row.status}
//                 </Tag>
//             ),
//         },
//     ];

//     const recentPayments = useRecentPayments()

//     return (
//         <div className="bg-white rounded shadow-sm p-2">
//             <div className='text-ink-heading font-bold text-lg'>Recent Payments</div>

//             <CustomDataTable 
//                 data={customers}
//                 columns={recentPaymentColumns}
//             />
//         </div>
//     );
// }

// export default RecentCustomers;


"use client";

import { Avatar, Tag } from "antd";
import React from "react";

import { img_base_url } from "@/config/settings";

import CustomDataTable from "./CustomDataTable";
import { useRecentPayments } from "../hooks/useRecentPayments.hook";

function RecentCustomers() {
  const { recentPayments } = useRecentPayments();

  const recentPaymentColumns = [
    {
      name: "Image",
      selector: (row) => (
        <Avatar shape="square" src={`${img_base_url}${row.profilePicture}`} alt={row.name} />
      ),
      width: "100px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Payment Type",
      selector: (row) => row.paymentType,
    },
    {
      name: "Amount(Tshs)",
      selector: (row) => `${parseFloat(row.amount).toLocaleString()}`,
    },
    {
      name: "Status",
      selector: (row) => (
        <div
          color={
            row.status === "completed"
              ? "green"
              : row.status === "pending"
              ? "orange"
              : "red"
          }
        >
          {row.status}
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded shadow-sm p-2">
      <div className="text-ink-heading font-bold text-lg">Recent Payments</div>

      <CustomDataTable
        data={recentPayments.data?.data ?? []} 
        columns={recentPaymentColumns}
      />
    </div>
  );
}

export default RecentCustomers;

