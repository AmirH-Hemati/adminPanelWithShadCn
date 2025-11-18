"use client";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { formatDate, formatToman } from "@/utils/helper";

const paymentColors = {
  success: "bg-yellow-100 text-yellow-600",
  processing: "bg-green-100 text-green-600",
  failed: "bg-red-100 text-red-600",
};

// : ColumnDef<OrderClient>[]
export const columns = [
  {
    accessorKey: "userId.email",
    header: "اطلاعات مشتری",
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <div className="flex flex-col items-start gap-0.5 font-semibold">
          <span>{payment.user?.name || "کاربر ناشناس"}</span>
          <span className="text-gray-400">{payment.user?.phone}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: " تاریخ پرداخت",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <div className=" font-semibold">{formatDate(payment.createdAt)}</div>
      );
    },
  },

  {
    accessorKey: "amount",
    header: () => <div className="text-right">مبلغ سفارش </div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      const formatedAmount = formatToman(amount);
      return <div className="text-right font-medium">{formatedAmount}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "وضعیت",
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <div className="flex flex-col gap-1">
          <span
            className={`w-fit rounded-full px-2 py-1 text-xs ${
              paymentColors[payment?.status] || "bg-gray-100 text-gray-500"
            }`}
          >
            {payment?.status === "success"
              ? "پرداخت شده"
              : payment?.status === "processing"
              ? "در انتظار پرداخت"
              : "پرداخت ناموفق"}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

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
              <Link href={`/users/${order?.user?._id}`}>
                مشاهده جزیات کاربر
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="text-right">
              <Link href={`/orders/${order._id}`}> مشاهده جزیات سفارش</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
