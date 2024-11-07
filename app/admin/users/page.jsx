"use client"
import React from 'react'
import DataTable from 'react-data-table-component';
import Link from 'next/link';
import Image from 'next/image'

function Users() {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  

  const users = [
    {
      "id":1,
      "username": "amani_juma",
      "role": "student",
      "profile_picture": "/man.jpg",
      "status": "active",
      "created_at": "2024-10-23T08:15:00Z"
    },
    {
      "id":2,
      "username": "neema_mwinyi",
      "role": "teacher",
      "profile_picture": "/man.jpg",
      "status": "inactive",
      "created_at": "2024-10-23T09:20:00Z"
    },
    {
      "id":3,
      "username": "faraja_kassim",
      "role": "student",
      "profile_picture": "/man.jpg",
      "status": "active",
      "created_at": "2024-10-22T10:30:00Z"
    },
    {
      "id":4,
      "username": "baraka_mwambusi",
      "role": "student",
      "profile_picture": "/man.jpg",
      "status": "inactive",
      "created_at": "2024-10-22T11:45:00Z"
    },
    {
      "id":5,
      "username": "salma_mangusha",
      "role": "teacher",
      "profile_picture": "/man.jpg",
      "status": "active",
      "created_at": "2024-10-21T13:00:00Z"
    },
    {
      "id":6,
      "username": "pendo_mdee",
      "role": "student",
      "profile_picture": "/man.jpg",
      "status": "active",
      "created_at": "2024-10-20T14:15:00Z"
    },
    {
      "id":7,
      "username": "bakari_muhogo",
      "role": "teacher",
      "profile_picture": "/man.jpg",
      "status": "inactive",
      "created_at": "2024-10-19T15:25:00Z"
    },
    {
      "id":8,
      "username": "zawadi_kabendera",
      "role": "student",
      "profile_picture": "/man.jpg",
      "status": "active",
      "created_at": "2024-10-18T16:35:00Z"
    },
    {
      "id":9,
      "username": "juma_khalfan",
      "role": "teacher",
      "profile_picture": "/man.jpg",
      "status": "inactive",
      "created_at": "2024-10-17T17:45:00Z"
    },
    {
      "id":10,
      "username": "upendo_matata",
      "role": "student",
      "profile_picture": "/man.jpg",
      "status": "active",
      "created_at": "2024-10-16T18:55:00Z"
    }
  ]

  const [data, setData] = React.useState(users);
  const columns = [
    {
      name: "Username",
      selector: row=><Link className='cursor-pointer hover:underline text-blue-900' href={`/admin/users/profile/${row.id}`}>{row.username}</Link>,
      sortable: true
    },
    {
      name: "Role",
      selector: row=>row.role,
      sortable: true
    },
    {
      name: "Profile Picture",
      selector: row => <Image  src={row.profile_picture} alt="Profile" width={100} height={100} className='w-40 h-40 object-cover' />
    },
    {
      name: "Status",
      selector: row => <span>{row.status === 'active' ? '🟢 Active' : '🔴 Inactive'}</span>,
      sortable: true,
      
    },
    {
      name: "Created At",
      selector: row => new Date(row.created_at).toLocaleString(),
      sortable: true,
      
    }
  ];
  
  


  const handleRowSelected = React.useCallback(state => {
    setSelectedRows(state.selectedRows);
  }, []);

  
  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      alert("created this")
    };
    return <div className='space-x-5'>

<button key="delete" className='p-2 text-xs text-white font-black' onClick={handleDelete} style={{
      backgroundColor: 'green'
    }} icon>
                Activate
            </button>
    
    <button key="delete" className='p-2 text-xs text-white font-black' onClick={handleDelete} style={{
      backgroundColor: 'red'
    }} icon>
                Delete
            </button>
            </div>;
  }, [data, selectedRows, toggleCleared]);
  return (
    <div>
      <DataTable title="Users" columns={columns} data={data} selectableRows contextActions={contextActions} onSelectedRowsChange={handleRowSelected} clearSelectedRows={toggleCleared} pagination />;


    </div>
  )
}

export default Users