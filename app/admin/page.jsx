import DashboardCard from '@/components/admin/DashboardCard'
import RecentCustomers from '@/components/admin/RecentCustomers'
import React from 'react'

function page() {
  return (
    <div className='flex flex-col gap-4 '>
        <div className='flex justify-between flex-col sm:flex-row gap-y-5 sm-gap-y-0'>
          <div>
            <h1 className='font-black'>Hello! ,Welcome back</h1>
            <h2 className='text-gray-500 text-xs'>Gala education administrator</h2>
          </div>
          <div className='flex gap-x-4'>
            <div>
              <h1 className='text-xs text-gray-400'>Total users</h1>
              <h2 className='text-3xl text-gray-600'>2000</h2>
            </div>
            <div>
              <h1 className='text-xs text-gray-400'>Online users</h1>
              <h2 className='text-3xl text-gray-600'>20</h2>
            </div>

          </div>

        </div>

        {/* cards */}
        <div className='grid sm:grid-cols-4 gap-4 grid-cols-2'>
          <DashboardCard 
          title={"TODAY ORDERS"} 
          bg={"bg-gradient-to-r from-blue-500 to-blue-300 text-white"} 
          value={5789}
          compared={"Compared to last week"}
          percentage={12.34}
          />
          <DashboardCard 
          title={"TODAY EARNINGS"} 
          bg={"bg-gradient-to-r from-red-500 to-red-300 text-white"} 
          value={5789}
          compared={"Compared to last week"}
          percentage={12.34}
          />
          <DashboardCard 
          title={"TOTAL EARNINGS"} 
          bg={"bg-gradient-to-r from-green-500 to-green-300 text-white"} 
          value={5789}
          compared={"Compared to last week"}
          percentage={12.34}
          />
          <DashboardCard 
          title={"TOTAL SUBSCRIPTIONS"} 
          bg={"bg-gradient-to-r from-orange-500 to-orange-300 text-white"} 
          value={5789}
          compared={"Compared to last week"}
          percentage={12.34}
          />
          </div>

    <RecentCustomers/>
    
    </div>
  )
}

export default page