"use client";
import { useState } from "react";

import {
  CustomDataTableWithQuery,
  getStudents,
  studentColumns,
} from "@/features/admin";
import { usePaginationQuery } from "@/features/admin";

function Students() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, error } = usePaginationQuery(
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
