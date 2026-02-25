"use client";

import OrderTable from "@/features/orders/components/OrderTable";

export default function Page() {
  return (
    <div className="overflow-auto space-y-4 mt-4">
      <div className="mb-8 px-4 py-2 bg-muted/50 rounded-md">
        <h1 className="font-semibold">سفارشات</h1>
      </div>
      <OrderTable />
    </div>
  );
}
