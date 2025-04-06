"use client"
import React, { useState } from 'react'
import { Switch } from 'antd'
import { useQuery } from '@tanstack/react-query';
import InstructorProfile from '@/src/components/admin/InstructorProfile';
import { apiGet, apiPost } from '@/src/services/api_service';
import UserCard from '@/src/components/admin/UserCard';

function ProfileId({params:{id}}) {
    const [active,setActive] = useState(true)

    const getDetails = async()=>{
            const {data}  = await apiGet(`users/${id}`)
           
            return data
        }
    
    const {data,error,isLoading} = useQuery({
            queryKey:['user',id],
            queryFn:getDetails
        });

        const handleVerify = async()=>{
            await apiPost('verify-instructor',
                {
                    "instructor_id":data?.instructor?.id,
                    "status":"verify"
                }
            )
        }


  return (
    <>
    {
        isLoading ? <div>Loading...</div> :
    <div>
        <div className='flex justify-between'>

        
        <div className='flex gap-x-3 items-center'>
            
            <span className='text-blue-900'>{active?"active":"inactive"}</span>
            <Switch checked={active} onChange={()=>setActive(!active)}  />
        </div>
        </div>
        <div className='flex justify-between'>
        <UserCard user={{name:data?.name,role:data?.role}} />
       {data?.instructor?.is_verified !== "verified" &&  <div className='items-start space-x-2 '>
            <button disabled className={"text-xs border-2 border-red-600 text-red-300 rounded p-1"}>Reject Instructor</button>
            <button onClick={handleVerify} className={"text-xs border-2 border-green-600 text-green-300 rounded p-1"}>Accept Instructor</button>
        </div>}
        </div>
        <div>
            {
                data?.role === "instructor" && <InstructorProfile user={data} />
            }
        </div>
    </div>
    }
    </>
  )
}

export default ProfileId