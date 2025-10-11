"use client";
import React, { useState } from "react";

import {
  CreatePartnerSchool,
  CustomDataTableWithQuery,
  getPartnerSchools,
  partnerSchoolColumns,
  usePaginationQuery,
} from "@/features/admin";

function PartnerSchools() {
  const [page, setPage] = useState(1);
  const [search, _setSearch] = useState("");

  const { data, isLoading, isFetching, error } = usePaginationQuery(
    "partnerSchools",
    () => getPartnerSchools(page, search),
    page,
    search
  );


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
