"use client";
import { apiPost } from "@/src/services/api_service";
import { useQueryClient } from "@tanstack/react-query";
import { message, Tag } from "antd";
import Image from "next/image";
import React from "react";
import { IoDiamond } from "react-icons/io5";

function UserCard({ user: { instructor_id,name, role,is_verified } }) {
  const queryClient = useQueryClient();
  
  const handleVerify = async (status) => {
          
          const instructorData = {
            instructor_id,
            status,
        }

            await apiPost("approve-instructor",instructorData); 
          queryClient.invalidateQueries(["user"]);
          message.success(
             "User verified successfully"
          );
      };  
  
  return (
        <div className="flex items-center flex-col h-[14rem] sm:h-[16rem] w-[12rem] sm:w-[16rem] relative shadow bg-white">
            <div className="h-[6rem] sm:h-[8rem] w-full bg-blue-400 absolute" />
            <div className="absolute flex flex-col items-center top-16 ">
                <Image
                    alt="image"
                    src={"/man.jpg"}
                    width={100}
                    height={100}
                    className="object-cover z-50 w-10 sm:w-20 h-10 sm:h-20 rounded-full shadow-sm"
                />
                <div>
                    <h1 className="text-gray-500 font-black text-center">
                        {name}
                    </h1>
                    <h2 className="italic text-xs text-gray-400 text-center capitalize">
                        {role}
                    </h2>
                </div>
                <div className="flex justify-end ">
                    <div className="flex flex-col items-center">
                        <IoDiamond />
                        <span className="italic text-xs">
                            Monthly membership
                        </span>
                    </div>
                </div>
            {role == "instructor" &&   <div className='flex  justify-center gap-2 py-2 w-full'>
                  {is_verified !== "verified" && <button onClick={()=>handleVerify("reject")} className='flex items-center gap-x-2'>
                  <Tag className='cursor-pointer' color={ "red"}>reject</Tag>
                  </button>}
                  <button disabled={is_verified == "verified"} onClick={()=>handleVerify("verify")} className='flex items-center gap-x-2'>
                  <Tag className='cursor-pointer' color={is_verified == "verified" ? "green" : "purple"}>{is_verified == "verified" ? "verified":"verify"}</Tag>
                  </button>
                </div>}
            </div>
        </div>
    );
}

export default UserCard;
