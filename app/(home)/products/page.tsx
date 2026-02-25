"use client";
import ProductsHeader from "@/features/products/components/ProductsHeader";
import ProductsTable from "@/features/products/components/ProductsTable";

export default function Page() {
  return (
    <div className=" flex flex-col gap-2">
      <ProductsHeader />

      <ProductsTable />
    </div>
  );
}
