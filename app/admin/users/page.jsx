"use client";
import React from "react";
import DataTable from "react-data-table-component";
import { userColumns } from "@/src/utils/data/columns/userColumns";
import { useQuery } from "@tanstack/react-query";
import { getAdminUsers } from "@/src/utils/fns/admin";

function Users() {
  
    const { data, isLoading } = useQuery({
        queryKey: ["userData"],
        queryFn: getAdminUsers,
    });

    console.log(data);

    return (
        <div>
            {isLoading ? (
                "Loading"
            ) : (
           
                <DataTable
                    title="Users"
                    columns={userColumns}
                    data={data || []}
                    pagination
                />
            )}
        </div>
    );
}

export default Users;
