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
import { OrderClient } from "../schema/schema";
import { formatDate, formatToman } from "@/utils/helper";

const statusColors = {
  processing: "bg-blue-100 text-blue-600",
  shipped: "bg-orange-100 text-orange-600",
  delivered: "bg-green-100 text-green-600",
  cancelled: "bg-red-100 text-red-600",
};
const paymentColors = {
  success: "bg-yellow-100 text-yellow-600",
  processing: "bg-green-100 text-green-600",
  failed: "bg-red-100 text-red-600",
};
export const columns: ColumnDef<OrderClient>[] = [
  {
    accessorKey: "userId.email",
    header: "اطلاعات مشتری",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="flex flex-col items-start gap-0.5 font-semibold">
          <span>{order.user?.name || "کاربر ناشناس"}</span>
          <span className="text-gray-400">{order.user?.phone}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "وضعیت سفارش",
    cell: ({ row }) => {
      const order = row.original;
      const quantityProduct = order?.orderItems?.reduce(
        (acc, cur) => acc + cur.quantity,
        0,
      );
      console.log(quantityProduct);
      return (
        <div className="flex flex-col gap-1 font-semibold">
          <span className="text-sm">تعداد اقلام&larr; {quantityProduct}</span>
          <span className="text-grey-600 text-xs">
            <span>زمان سفارش: {formatDate(order.createdAt)}</span>
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "totalAmount",
    header: () => <div className="text-right">مبلغ سفارش </div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount"));

      const formatedAmount = formatToman(amount);
      return <div className="text-right font-medium">{formatedAmount}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "وضعیت",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="flex flex-col gap-1">
          <span
            className={`w-fit rounded-full px-2 py-1 text-xs bg-green-100 text-green-900`}
          >
            {/* {order?.payment?.status === "success"
              ? "پرداخت شده"
                 paymentColors[order?.payment?.status] ||
              : order?.payment?.status === "processing"
                ? "در انتظار پرداخت"
                : "پرداخت ناموفق"} */}
            پرداخت شده
          </span>

          <span
            className={`w-fit rounded-full px-2 py-1 text-xs ${
              statusColors[order.status] || "bg-gray-100 text-gray-500"
            }`}
          >
            {order.status === "processing"
              ? "در حال پردازش"
              : order.status === "shipped"
                ? "در حال ارسال"
                : order.status === "delivered"
                  ? "تحویل داده شده"
                  : "لغو شده"}
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
                مشاهده جزئیات کاربر{" "}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="text-right">
              <Link href={`/orders/${order._id}`}> مشاهده جزئیات سفارش</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
