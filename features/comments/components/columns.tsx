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
import { formatDate } from "@/utils/helper";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { OrderClient } from "../schema/schema";

export const columns: ColumnDef<OrderClient>[] = [
  {
    accessorKey: "userId.email",
    header: "کاربر",
    cell: ({ row }) => {
      const comment = row.original;
      return (
        <div className="flex flex-col items-start gap-0.5 font-semibold">
          <span>{comment.user?.name || "کاربر ناشناس"}</span>
          <span className="text-gray-400">{comment.user?.phone}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "زمان ثبت کامنت",
    cell: ({ row }) => {
      const comment = row.original;
      return (
        <div className="flex flex-col gap-1 font-semibold">
          <span className="text-grey-600 text-xs">
            <span> {formatDate(comment.createdAt)}</span>
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "comment",
    header: () => <div className="text-right"> کامنت </div>,
    cell: ({ row }) => {
      const comment = row.original;
      return (
        <div className="text-right font-medium">
          {comment.comment.slice(0, 10)}...
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "وضعیت",
    cell: ({ row }) => {
      const comment = row.original;
      return (
        <span
          className={`w-fit rounded-full px-2 py-1 text-xs  bg-green-100 text-green-800`}
        >
          منتشر شده
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const comment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 ">
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>فعالیت ها </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/users/${comment?.user?._id}`}>
                مشاهده جزیات کاربر
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="text-right">
              <Link href={`/comments/${comment._id}`}> مشاهده جزیات کامنت</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
