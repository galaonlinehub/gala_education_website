"use client";
import React from "react";
import DataTable from "react-data-table-component";
import { customStyles } from "@/src/features/admin";

function CustomDataTableWithQuery({
    data,
    columns,
    paginationMeta = null,
    onPageChange = () => {},
    isLoading = false,
}) {
    const isPaginated = !!paginationMeta;

    return (
        <DataTable
            data={data}
            columns={columns}
            customStyles={customStyles}
            striped
            highlightOnHover
            responsive
            persistTableHead
            progressPending={isLoading}
            pagination={isPaginated}
            paginationServer={isPaginated}
            paginationTotalRows={paginationMeta?.total || 0}
            paginationPerPage={paginationMeta?.per_page || 10}
            paginationDefaultPage={paginationMeta?.current_page || 1}
            onChangePage={onPageChange}
        />
    );
}

export default CustomDataTableWithQuery;
