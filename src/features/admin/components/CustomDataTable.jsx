"use client"
import { customStyles } from "@/src/features/admin";
import React from "react";
import DataTable from "react-data-table-component";

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
