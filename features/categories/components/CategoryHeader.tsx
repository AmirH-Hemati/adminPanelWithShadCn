import AddNewCategoryDialog from "./AddNewCategoryDialog";

export default function CategoryHeader() {
  return (
    <div className="mb-8 px-4 py-2 bg-muted/50 rounded-md flex items-center justify-between">
      <h1 className="font-semibold">محصولات</h1>
      <AddNewCategoryDialog />
    </div>
  );
}
