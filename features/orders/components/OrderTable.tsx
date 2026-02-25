import React from "react";
import { useGetOrders } from "../hooks/useGetOrders";
import TableSkeleton from "@/components/TableSkeleton";
import { columns } from "@/features/orders/components/columns";
import { DataTable } from "@/components/DataTable";

export default function OrderTable() {
  const { orders, isLoading } = useGetOrders();
  if (isLoading) {
    return <TableSkeleton rows={7} />;
  }
  return <DataTable columns={columns} data={orders} />;
}
