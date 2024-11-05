import Image from 'next/image';
import React from 'react'

function RecentCustomers() {
  
    const customers = [
        { 
          id: 1, 
          name: "Hudson Odoi", 
          status: "paid", 
          profilePicture: "/man.jpg",
          paymentPlan:"monthly"
        },
        { 
          id: 2, 
          name: "Kimberly Owen", 
          status: "pending", 
          profilePicture: "/man.jpg",
          paymentPlan:"yearly"
        },
        { 
          id: 3, 
          name: "James Johnson", 
          status: "failed", 
          profilePicture: "/man.jpg",
          paymentPlan:"monthly"
        },
        { 
          id: 4, 
          name: "Emily Davis", 
          status: "paid", 
          profilePicture: "/man.jpg",
          paymentPlan:"yearly"
        },
        { 
          id: 5, 
          name: "Chris Brown", 
          status: "pending", 
          profilePicture: "/man.jpg",
          paymentPlan:"monthly"
        }
      ];
      
    return (
    <div className='bg-white rounded shadow-sm p-2'>
        <div>Recent Payments</div>
        <div className='flex flex-col gap-y-2'>
            {
                customers.map((item,i)=>(
                  <div key={i} className='flex w-full justify-between'>
                    <div className='flex gap-2'>
                        <Image alt="image" src={item.profilePicture} width={200} height={200} className='h-12 w-12 object-cover rounded-full'/>
                        <div className='flex flex-col'>
                          <span className='font-bold'>{item.name}</span>
                          <span className='font-xs text-gray-500 italic'>{item.status}</span>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                      <span className='text-gray-400'>Payment plan</span>
                      <span className={item.paymentPlan === "yearly" ?"bg-green-400 text-green-800 p-1 rounded-md text-center text-xs":"bg-blue-400 text-blue-800 p-1 rounded-md text-center text-xs"}>{item.paymentPlan}</span>
                    </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default RecentCustomers