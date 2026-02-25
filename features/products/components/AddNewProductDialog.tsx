"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateProductForm from "./CreateProductForm";

export default function AddNewProductDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={`default`} size="sm" className="text-xs">
          افزودن محصول جدید
        </Button>
      </DialogTrigger>

      <DialogContent
        className="max-w-4xl! w-full max-h-[90vh] overflow-y-auto rounded-2xl p-6"
        dir="rtl"
      >
        <CreateProductForm />
      </DialogContent>
    </Dialog>
  );
}
