"use client";

import UserTable from "@/features/users/components/UserTable";

export default function Page() {
  return (
    <div className="">
      <div className="mb-8 px-4 py-2 bg-muted/50 rounded-md">
        <h1 className="font-semibold">کاربران</h1>
      </div>

      <UserTable />
    </div>
  );
}
