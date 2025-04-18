import { Tag } from 'antd';
import Link from 'next/link'

export const paymentColumns = [
    {
      name: "Fullname",
      selector: row=><Link className='cursor-pointer hover:underline text-blue-900' href={`/admin/users/profile/${row.id}`}>{row.name}</Link>,
      sortable: true
    },
    {
      name: "Payment Type",
      selector: row=><div className={`rounded-md ${row.payable_type === "Donation" ? "border-purple-600 border-2 text-purple-400  p-1 text-xs":row.payable_type === "Subscription" ? "border-orange-600 border-2 text-orange-400  p-1 text-xs" : "bg-green-600 text-green-300  p-1 text-xs"}`}>{row.payable_type}</div>,
      sortable: true
    },
    {
      name: "Role",
      selector: row=>row.role,
      sortable: true
    },
    {
      name: "Status",
      cell: row => <Tag color={row?.status === 'pending' ? "gold" : row?.status === 'failed' ? "red" : row?.status === 'success' ? "green" : "purple"} p-1 >{row?.status}</Tag>,
      sortable: true,
      
    },
    {
      name: "Transaction Id",
      selector: row => row.transaction_id,
      width: "200px",
      sortable: true,
      
    },
    {
      name: "Order Id",
      selector: row => row.order_reference,
      sortable: true,
      
    },
    {
      name: "Order Reference",
      selector: row => row.order_reference,
      sortable: true,
      
    },
    {
      name: "Payment Token",
      selector: row => row.payment_token,
      sortable: true,
      
    },
    {
      name: "Payment Reference",
      selector: row => row.payment_reference,
      sortable: true,
      
    },
    {
      name: "Paid At",
      selector: row => row.paid_at,
      sortable: true,
      
    }
  ];