"use client";
import React from "react";
import DataTable from "react-data-table-component";

import { customStyles } from "@/features/admin";

function CustomDataTable({ data, columns, paginated = false }) {
  return (
    <DataTable
      data={data}
      columns={columns}
      customStyles={customStyles}
      striped
      highlightOnHover
      responsive
      persistTableHead
      paginated={paginated}
    />
  );
}

export default CustomDataTable;
