"use client"
import React from 'react'
import DataTable from 'react-data-table-component';
import { userColumns } from '@/src/utils/data/columns/userColumns';
import { useQuery } from '@tanstack/react-query';
import { getAdminUsers } from '@/src/utils/fns/admin';

function Users() {
  
  

  // const users = [
  //   {
  //     "id":1,
  //     "username": "amani_juma",
  //     "role": "student",
  //     "profile_picture": "/man.jpg",
  //     "status": "active",
  //     "created_at": "2024-10-23T08:15:00Z"
  //   },
  //   {
  //     "id":2,
  //     "username": "neema_mwinyi",
  //     "role": "teacher",
  //     "profile_picture": "/man.jpg",
  //     "status": "inactive",
  //     "created_at": "2024-10-23T09:20:00Z"
  //   },
  //   {
  //     "id":3,
  //     "username": "faraja_kassim",
  //     "role": "student",
  //     "profile_picture": "/man.jpg",
  //     "status": "active",
  //     "created_at": "2024-10-22T10:30:00Z"
  //   },
  //   {
  //     "id":4,
  //     "username": "baraka_mwambusi",
  //     "role": "student",
  //     "profile_picture": "/man.jpg",
  //     "status": "inactive",
  //     "created_at": "2024-10-22T11:45:00Z"
  //   },
  //   {
  //     "id":5,
  //     "username": "salma_mangusha",
  //     "role": "teacher",
  //     "profile_picture": "/man.jpg",
  //     "status": "active",
  //     "created_at": "2024-10-21T13:00:00Z"
  //   },
  //   {
  //     "id":6,
  //     "username": "pendo_mdee",
  //     "role": "student",
  //     "profile_picture": "/man.jpg",
  //     "status": "active",
  //     "created_at": "2024-10-20T14:15:00Z"
  //   },
  //   {
  //     "id":7,
  //     "username": "bakari_muhogo",
  //     "role": "teacher",
  //     "profile_picture": "/man.jpg",
  //     "status": "inactive",
  //     "created_at": "2024-10-19T15:25:00Z"
  //   },
  //   {
  //     "id":8,
  //     "username": "zawadi_kabendera",
  //     "role": "student",
  //     "profile_picture": "/man.jpg",
  //     "status": "active",
  //     "created_at": "2024-10-18T16:35:00Z"
  //   },
  //   {
  //     "id":9,
  //     "username": "juma_khalfan",
  //     "role": "teacher",
  //     "profile_picture": "/man.jpg",
  //     "status": "inactive",
  //     "created_at": "2024-10-17T17:45:00Z"
  //   },
  //   {
  //     "id":10,
  //     "username": "upendo_matata",
  //     "role": "student",
  //     "profile_picture": "/man.jpg",
  //     "status": "active",
  //     "created_at": "2024-10-16T18:55:00Z"
  //   }
  // ]

  // const [data, setData] = React.useState(users);
  

  const {data:userData} = useQuery({
    queryKey:['userData'],
    queryFn:getAdminUsers
  });

  

  
  

  return (
    <div>
      <DataTable 
        title="Users" 
        columns={userColumns}   
        data={[]} 
        // contextActions={contextActions} 
        // clearSelectedRows={toggleCleared} 
        pagination 
      />


    </div>
  )
}

export default Users