import React from "react";
import TableSkeleton from "@/components/TableSkeleton";
import { columns } from "@/features/payments/components/columns";
import { useGetOrders } from "@/features/orders/hooks/useGetOrders";
import { DataTable } from "@/components/DataTable";

export default function PaymentsTable() {
  const { orders, isLoading } = useGetOrders();
  if (isLoading) {
    return <TableSkeleton rows={7} />;
  }
  return <DataTable columns={columns} data={orders} />;
}
