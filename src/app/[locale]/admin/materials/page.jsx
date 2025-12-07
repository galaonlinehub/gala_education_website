"use client";
import Link from "next/link";
import React from "react";
import DataTable from "react-data-table-component";

import { customStyles } from "@/styles/admin/datatable/customStyles";

function Materials() {
  // TODO: Implement materials fetching when backend endpoint is ready
  const materials = [];

  const columns = [
    {
      name: "Type",
      selector: (row) => row.type || "-",
      sortable: true,
    },
    {
      name: "Subject",
      selector: (row) => row.subject?.name || "-",
      sortable: true,
    },
    {
      name: "Topic",
      selector: (row) => row.topic?.title || row.topic?.name || "-",
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => row.created_at || "-",
      sortable: true,
    },
  ];

  return (
    <div>
      <DataTable
        title={
          <div className="w-full flex justify-between px-2">
            <span className="text-xs text-blue-500">Materials</span>
            <Link
              href={"/admin/materials/add-new"}
              className="text-xs text-blue-500 hover:underline"
            >
              + Add Material
            </Link>
          </div>
        }
        columns={columns}
        data={materials}
        customStyles={customStyles}
        // pagination
      />
    </div>
  );
}

export default Materials;
