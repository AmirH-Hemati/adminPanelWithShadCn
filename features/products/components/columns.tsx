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
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { ProductClient } from "../schema/schema";
import CreateProductForm from "./CreateProductForm";
import DuplicatedProduct from "./DuplicatedProduct";

export const columns = (
  deleteProduct: (id: string) => void,
): ColumnDef<ProductClient>[] => {
  return [
    {
      accessorKey: "image",
      header: "",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="w-12 h-12 relative">
            <Image
              src={product?.imageCover}
              alt={product.name}
              fill
              unoptimized
              className=" rounded-sm object-cover"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "نام محصول",
      cell: ({ row }) => {
        const product = row.original;
        return <h3>{product.name.slice(0,50)}</h3>;
      },
    },
    {
      accessorKey: "price",
      header: "قیمت",

      cell: ({ row }) => {
        const product = row.original;

        return (
          <div className="flex flex-col gap-1 font-medium text-xs">
            <span>
              قیمت نهایی &larr; {product.price - product.priceDiscount}
            </span>
            <span className="text-gray-400  line-through">
              قیمت اصلی: {product.price}
            </span>
          </div>
        );
      },
    },

    {
      accessorKey: "priceDiscount",
      header: "تخفیف",
    },

    {
      accessorKey: "category?.label",
      header: "دسته بندی",
      cell: ({ row }) => {
        const product = row.original;

        return (
          <div className="flex flex-col gap-1 font-medium text-xs">
            <span>{product?.category?.label}</span>
            <span className="text-gray-400 ">{product?.brand?.label}</span>
          </div>
        );
      },
    },

    {
      id: "actions",
      cell: ({ row }) => {
        const product = row.original;
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
                onClick={() => deleteProduct(product._id)}
              >
                حذف محصول
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Dialog>
                  <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                    <DialogTrigger asChild>
                      <button>ویرایش محصول</button>
                    </DialogTrigger>
                  </DropdownMenuItem>

                  <DialogContent
                    className="max-w-4xl! w-full max-h-[90vh] overflow-y-auto rounded-2xl p-6"
                    dir="rtl"
                  >
                    <CreateProductForm product={product} />
                  </DialogContent>
                </Dialog>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <DuplicatedProduct product={product} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
