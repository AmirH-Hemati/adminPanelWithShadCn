import { DataTable } from "@/components/DataTable";
import TableSkeleton from "@/components/TableSkeleton";
import React from "react";
import { useGetUsers } from "../hooks/useGetUsers";
import { columns } from "@/features/users/components/columns";

export default function UserTable() {
  const { users, isLoading } = useGetUsers();
  if (isLoading) return <TableSkeleton rows={7} />;
  return <DataTable columns={columns} data={users} />;
}
