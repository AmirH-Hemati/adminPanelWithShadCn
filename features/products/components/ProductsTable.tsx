import { DataTable } from "@/components/DataTable";
import { useProducts } from "../hooks/useProducts";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { columns as productColumns } from "@/features/products/components/columns";
import TableSkeleton from "@/components/TableSkeleton";

function ProductsTable() {
  const { products, isLoading } = useProducts();
  const { deleteProduct } = useDeleteProduct();

  if (isLoading) {
    return <TableSkeleton rows={7} />;
  }

  const columns = productColumns(deleteProduct);
  return <DataTable columns={columns} data={products} />;
}

export default ProductsTable;
