"use client"
import {MdOutlineVerified} from "react-icons/md";
import DataTable from "react-data-table-component";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {useQuery} from "@tanstack/react-query";
import {api} from "@/src/config/settings";
import {useRouter} from "next/navigation";

const Requests = ()=>{

    const router = useRouter()

    const columns = [
        {
            name: "Username",
            selector: row=><Link className='cursor-pointer hover:underline text-blue-900' href={`/admin/users/profile/${row.id}`}>{row?.user?.first_name + " " + row?.user?.last_name}</Link>,
            sortable: true
        },
        {
            name: "Role",
            cell: row=>"Instructor",
            sortable: true
        },
        {
            name: "Profile Picture",
            selector: row => <Image  src={row?.profile_picture || '/man.jpg'} alt="Profile" width={100} height={100} className='w-8 h-8 rounded-full object-cover' />
        },
        {
            name: "Status",
            selector: row => <span>{row.is_verified  ? '🟢 Active' : '🔴 Inactive'}</span>,
            sortable: true,

        },
        {
            name: "Created At",
            selector: row => new Date(row.created_at).toLocaleString(),
            sortable: true,

        },{
            name: "Actions",
            selector: row =><div className={"flex gap-x-2"}>
                <div onClick={()=>router.push(`/admin/requests/approve/${row.id}`)} className={'text-xs text-blue-900 cursor-pointer bg-blue-100 px-2 py-1 rounded'}>view</div>
                <div className={'text-xs text-red-900 cursor-pointer bg-red-100 px-2 py-1 rounded'}>suspend</div>
            </div>,
            sortable: true,

        }
    ];

    const getInstructors = async()=>{
        const {data} = await api('/instructors')
        return data
    }

    const {data:instructors,error,isLoading} = useQuery({
        queryFn:getInstructors,
        queryKey:["getInstructors"],
    });

    console.log(instructors)

    return (
        <div className={"space-y-5"}>
            <div className={"rounded flex flex-col gap-y-4 shadow-gray-400 shadow-sm w-[80vw] sm:w-[45vw] bg-gray-100 p-2"}>
                <div className={'flex gap-x-3 items-center'}>
                    <MdOutlineVerified className={'text-blue-900'} />
                    <span>Approval Status</span>
                </div>
                <div className={'flex justify-between'}>
                    <div className={'flex flex-col basis-1/4 border-r border-[#d9d9d9] px-2'}>
                        <span className={'text-gray-700 text-xs'}>Requested</span>
                        <span className={'text-gray-400 font-bold'}>20</span>
                    </div>

                    <div className={'flex flex-col basis-1/4 border-r border-[#d9d9d9] px-2'}>
                        <span className={'text-gray-700 text-xs'}>Approved</span>
                        <span className={'text-gray-400 font-bold'}>5</span>
                    </div>

                    <div className={'flex flex-col basis-1/4 border-r border-[#d9d9d9] px-2'}>
                        <span className={'text-gray-700 text-xs'}>Rejected</span>
                        <span className={'text-gray-400 font-bold'}>6</span>
                    </div>

                    <div className={'flex flex-col basis-1/4 px-2'}>
                        <span className={'text-gray-700 text-xs'}>Pending</span>
                        <span className={'text-gray-400 font-bold'}>9</span>
                    </div>

                </div>
            </div>

            <DataTable
                columns={columns}
                data={instructors}
                striped
                pagination />
        </div>
    )
}

export default Requests