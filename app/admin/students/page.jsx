"use client";
import {
    CustomDataTableWithQuery,
    getStudents,
    studentColumns,
} from "@/src/features/admin";
import { usePaginationQuery } from "@/src/features/admin";
import { useState } from "react";

function Students() {
    const [page, setPage] = useState(1);

    const { data,isLoading, isFetching, error } = usePaginationQuery(
        "students",
        getStudents,
        page
    );

    const tableData = data?.data || [];
    const meta = data?.meta;

    return (
        <div>
            <CustomDataTableWithQuery
                data={tableData}
                columns={studentColumns}
                paginationMeta={meta}
                isLoading={isLoading || isFetching}
                onPageChange={setPage}
            />
        </div>
    );
}

export default Students;
