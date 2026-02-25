import { DataTable } from "@/components/DataTable";
import TableSkeleton from "@/components/TableSkeleton";
import React from "react";
import { useCategories } from "../hooks/useCategories";
import { useDeleteCategory } from "../hooks/useDeleteCategory";
import { columns as categoryColumns } from "@/features/categories/components/columns";

export default function CategoriesTable() {
  const { categories, isLoading } = useCategories();
  const { deleteCategory, isDeleting } = useDeleteCategory();
  if (isLoading) {
    return <TableSkeleton rows={7} />;
  }

  const columns = categoryColumns(deleteCategory);
  return <DataTable columns={columns} data={categories} />;
}
