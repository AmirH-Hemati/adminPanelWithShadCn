"use client";
import { DataTable } from "@/components/DataTable";
import Spinner from "@/components/Spinner";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { columns as categoryColumns } from "@/features/categories/components/columns";
import { useDeleteCategory } from "@/features/categories/hooks/useDeleteCategory";
import AddNewCategoryDialog from "@/features/categories/components/AddNewCategoryDialog";

export default function Page() {
  const { categories, isLoading } = useCategories();
  const { deleteCategory, isDeleting } = useDeleteCategory();
  if (isLoading) {
    return <Spinner />;
  }

  const columns = categoryColumns(deleteCategory);
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md ">
        <h1 className="font-semibold">محصولات</h1>
      </div>
      <DataTable columns={columns} data={categories} />

      <AddNewCategoryDialog />
    </div>
  );
}
