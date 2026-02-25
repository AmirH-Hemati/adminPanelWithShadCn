import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateCategoryForm from "./CreateCategoryForm";

export default function AddNewCategoryDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-xs" size="sm">
          افزودن دسته بندی جدید
        </Button>
      </DialogTrigger>

      <DialogContent dir="rtl">
        <CreateCategoryForm />
      </DialogContent>
    </Dialog>
  );
}
