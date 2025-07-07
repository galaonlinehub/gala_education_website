"use client";
import {
    CustomDataTableWithQuery,
    getInstructors,
    getStudents,
    instructorColumns,
} from "@/src/features/admin";
import { usePaginationQuery } from "@/src/features/admin";
import { useState } from "react";

function Instructors() {
    const [page, setPage] = useState(1);
    // const [verified,setVerified]= useState()

    const { data,isLoading, isFetching, error } = usePaginationQuery(
        "instructors",
        getInstructors,
        page
    );

    const tableData = data?.data || [];
    const meta = data?.meta;

    return (
        <div>
            <CustomDataTableWithQuery
                data={tableData}
                columns={instructorColumns}
                paginationMeta={meta}
                isLoading={isLoading || isFetching}
                onPageChange={setPage}
            />
        </div>
    );
}

export default Instructors;
