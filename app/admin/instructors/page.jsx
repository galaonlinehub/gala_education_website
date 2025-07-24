"use client";
import {
    CustomDataTableWithQuery,
    getInstructors,
    instructorColumns,
} from "@/src/features/admin";
import { usePaginationQuery } from "@/src/features/admin";
import Link from "next/link";
import { useState } from "react";

function Instructors() {
    const [page, setPage] = useState(1);
    
    const { data,isLoading, isFetching, error } = usePaginationQuery(
        "instructors",
        getInstructors,
        page
    );

    const tableData = data?.data || [];
    const meta = data?.meta;

    return (
        <div>
            <div className='flex justify-between p-2'>
            <h1 className="text-ink-heading font-bold">Instructors</h1>
            <Link href='/admin/instructors/create' className="rounded-md hover:bg-blue-900 hover:text-white duration-300 border-blue-800 border-2 text-blue-800 p-2 text-center">
                + add special pass instructor
            </Link>
            </div>
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
