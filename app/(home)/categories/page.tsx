"use client";
import CategoriesTable from "@/features/categories/components/CategoriesTable";
import CategoryHeader from "@/features/categories/components/CategoryHeader";

export default function Page() {
  return (
    <div className="w-full flex flex-col gap-2">
      <CategoryHeader />
      <CategoriesTable />
    </div>
  );
}
