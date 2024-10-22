import Image from 'next/image';
import React from 'react'

function RecentCustomers() {
  
    const customers = [
        { 
          id: 1, 
          name: "Hudson Odoi", 
          status: "paid", 
          profilePicture: "/man.jpg"
        },
        { 
          id: 2, 
          name: "Kimberly Owen", 
          status: "pending", 
          profilePicture: "/man.jpg"
        },
        { 
          id: 3, 
          name: "James Johnson", 
          status: "failed", 
          profilePicture: "/man.jpg"
        },
        { 
          id: 4, 
          name: "Emily Davis", 
          status: "paid", 
          profilePicture: "/man.jpg"
        },
        { 
          id: 5, 
          name: "Chris Brown", 
          status: "pending", 
          profilePicture: "/man.jpg"
        }
      ];
      
    return (
    <div>
        <div>Recent customers</div>
        <div>
            {
                customers.map((item,i)=>(
                    <div>
                        <Image src={item.profilePicture} width={200} height={200} className='h-16 w-16 rounded-full'/>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default RecentCustomers