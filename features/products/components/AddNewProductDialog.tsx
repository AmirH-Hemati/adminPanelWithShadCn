"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateProductForm from "./CreateProductForm";

export default function AddNewProductDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mr-auto my-5">افزودن محصول جدید</Button>
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
