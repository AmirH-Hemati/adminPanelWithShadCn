"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRecentOrder } from "../hooks/useRecentOrder";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import { formatDate, formatToman } from "@/utils/helper";
import Image from "next/image";

export default function RecentOrder() {
  const { orders, isLoading } = useRecentOrder();

  if (isLoading) return <Spinner />;
  console.log(orders);
  return (
    <ScrollArea className=" rounded-md h-96">
      <h1 className="text-lg font-medium mb-6">سفارشات اخیر کاربر</h1>
      <div className="flex flex-col gap-2">
        {orders &&
          orders?.length > 0 &&
          orders.map((item, index) => (
            <Card
              key={item._id}
              className="flex-row items-center justify-between gap-4 p-4 text-right text-xs"
            >
              <CardContent className="flex items-center  flex-1 justify-between p-0">
                <p className="font-bold ">سفارش #{item._id.substring(0, 6)}</p>
                <Badge variant="outline">
                  {item.status === "processing"
                    ? "در حال پردازش"
                    : item.status === "shipped"
                      ? "ارسال شده"
                      : item.status === "delivered"
                        ? "تحویل شده"
                        : item.status === "cancelled"
                          ? "لغو شده"
                          : item.status}
                </Badge>

                <p className="text-xs   ">
                  تاریخ :{new Date(item.createdAt).toLocaleDateString("fa-IR")}
                </p>

                <span>مبلع سفارش :{formatToman(item.totalAmount)}</span>
              </CardContent>
              <CardFooter className="p-0">
                <Link
                  href={`/orders/${item._id}`}
                  className="bg-foreground hover:bg-foreground/90 text-muted rounded-md text-xs px-2 py-1 font-medium"
                >
                  مشاهده جزئیات سفارش
                </Link>
              </CardFooter>
            </Card>
          ))}
      </div>
    </ScrollArea>
  );
}
