"use client";

import { DataTable } from "@/components/DataTable";
import Spinner from "@/components/Spinner";
import { columns } from "@/features/payments/components/columns";
import { useGetPayments } from "@/features/payments/hooks/useGetPayments";

export default function Page() {
  const { payments, isLoading } = useGetPayments();
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="overflow-auto space-y-4 mt-4">
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        <h1 className="font-semibold">All Payments</h1>
      </div>
      <DataTable columns={columns} data={payments} />

    </div>
  );
}
