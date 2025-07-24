"use client";
import {
    CreatePartnerSchool,
    CustomDataTableWithQuery,
    getPartnerSchools,
    partnerSchoolColumns,
    usePaginationQuery,
} from "@/src/features/admin";
import React,{useState} from "react";

function PartnerSchools() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const { data, isLoading, isFetching, error } = usePaginationQuery(
        "partnerSchools",
        ()=>getPartnerSchools(page,search),
        page,
        search
    );

    console.log("We are in here and the data is ",error);

    const tableData = data?.data || [];
    const meta = data?.meta;
    return (
        <div>
            <div className="flex justify-between">
                <h1>Partner Schools</h1>
                <CreatePartnerSchool />
            </div>
            <CustomDataTableWithQuery
                data={tableData}
                columns={partnerSchoolColumns}
                paginationMeta={meta}
                isLoading={isLoading || isFetching}
                onPageChange={setPage}
            />
        </div>
    );
}

export default PartnerSchools;
