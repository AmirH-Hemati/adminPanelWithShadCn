import AddNewProductDialog from "./AddNewProductDialog";

function ProductsHeader() {
  return (
    <div className="mb-8 px-4 py-2 bg-muted/50 rounded-md flex items-center justify-between">
      <h1 className="font-semibold">محصولات</h1>
      <AddNewProductDialog />
    </div>
  );
}
export default ProductsHeader;
