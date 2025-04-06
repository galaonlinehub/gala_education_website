"use client";
import { apiGet } from "@/src/services/api_service";
import { customStyles } from "@/src/styles/admin/datatable/customStyles";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import DataTable from "react-data-table-component";

function Subjects() {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);

  const getSubjects = async ()=>{
    const {data} = await apiGet('subjects');
    return data;
  }

  const {data:subjects} = useQuery({
    queryKey:['subjects'],
    queryFn:getSubjects
  })

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Levels",
      selector: (row) => row.levels,
      sortable: true,
    },
    {
      name: "Medium",
      selector: (row) => row.medium,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
  ];

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);


  return (
    <div>
      <DataTable
        title={
          <div className="w-full flex justify-between px-2">
            <span className="text-xs text-blue-500">Subjects</span>
            <Link href={'/admin/subjects/add-new'} className="text-xs text-blue-500 hover:underline">+ new subject</Link>
          </div>
        }
        columns={columns}
        data={subjects}
        customStyles={customStyles}
        // pagination
      />
      
    </div>
  );
}

export default Subjects;
