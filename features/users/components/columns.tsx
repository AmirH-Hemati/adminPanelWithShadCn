"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// : ColumnDef<RegisterFull>[]
export const columns = [
  {
    accessorKey: "photo",
    header: "آواتار",
    cell: ({ row }) => {
      const user = row.original;
      console.log(user);
      return (
        <div className="w-9 h-9 relative">
          <Image
            src={user.photo}
            alt={user.name}
            fill
            unoptimized
            className="rounded-full object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "نام کاربر",
  },
  {
    accessorKey: "email",
    header: "ایمیل",
  },
  {
    accessorKey: "phone",
    header: "شماره موبایل",
  },
  {
    accessorKey: "role",
    header: "نقش کاربر",
    cell: ({ row }) => {
      const role = row.getValue("role");

      return (
        <div
          className={cn(
            `p-1 rounded-md w-max text-xs`,
            role === "user" && "bg-green-500/40",
            role === "admin" && "bg-red-500/40"
          )}
        >
          {role as string}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

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
            <DropdownMenuItem variant="destructive">حذف کاربر</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/users/${user._id}`}>مشاهده کاربر</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
