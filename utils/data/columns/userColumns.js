import Image from 'next/image';
import Link from 'next/link'

export const userColumns = [
    {
      name: "Fullname",
      selector: row=><Link className='cursor-pointer hover:underline text-blue-900' href={`/admin/users/profile/${row.id}`}>{row.first_name+" "+row.last_name}</Link>,
      sortable: true
    },
    {
      name: "Role",
      selector: row=>row.role,
      sortable: true
    },
    {
      name: "Profile Picture",
      selector: row => (
        <Image 
          src={row.profile_picture ? `https://galaweb.galahub.tz/storage/${row.profile_picture}` : "/gala_logo.png"} 
          alt="Profile" 
          width={100} 
          height={100} 
          className="w-8 h-8 rounded-full object-cover"
        />
      )
    },
    {
      name: "Status",
      selector: row => <span>{row.status === 'active' ? '🟢 Active' : '🔴 Inactive'}</span>,
      sortable: true,
      
    },
    {
      name: "Created At",
      selector: row => row.created_at,
      sortable: true,
      
    },{
      name: "Actions",
      selector: () =><div className={"flex gap-x-2"}>
        <div className={'text-xs text-blue-900 cursor-pointer bg-blue-100 px-2 py-1 rounded'}>view</div>
        <div className={'text-xs text-red-900 cursor-pointer bg-red-100 px-2 py-1 rounded'}>suspend</div>
      </div>,
      sortable: true,

    }
  ];