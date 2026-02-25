"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import CreateCategoryForm from "./CreateCategoryForm";

// : ColumnDef<ProductClient>[]
export const columns = (deleteCategory: (id: string) => void) => {
  return [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        const category = row.original;
        return (
          <div className="w-12 h-12 relative">
            <Image
              src={category?.image}
              alt={category.label}
              fill
              unoptimized
              className=" rounded-sm object-cover"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "label",
      header: "عنوان",
    },
    {
      accessorKey: "value",
      header: "مقدار",
    },
    {
      accessorKey: "createdAt",
      header: "زمان ایجاد",
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt).toLocaleString("fa-IR");
        return <p>{date}</p>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const category = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>فعالیت ها</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => deleteCategory(category._id)}
              >
                حذف دسته بندی
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Dialog>
                  <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                    <DialogTrigger asChild>
                      <button>ویرایش دسته بندی</button>
                    </DialogTrigger>
                  </DropdownMenuItem>

                  <DialogContent dir="rtl">
                    <CreateCategoryForm category={category} />
                  </DialogContent>
                </Dialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
