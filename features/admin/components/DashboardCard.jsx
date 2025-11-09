import React from 'react'

function DashboardCard({title,bg,value, icon:Icon}) {
  return (
    <div className={`${bg} rounded-md h-20 shadow-sm p-4 flex items-center justify-between`}>
        <div className='font-semibold text-sm'>
            <h1 className='text-ink-heading text-xs'>
              {title}
              </h1>
            <h2 className='text-ink-subheading font-bold text-xl'>
              {value}
              </h2>

        </div>
         <Icon className="text-4xl" />
        
    </div>
  )
}

export default DashboardCard
