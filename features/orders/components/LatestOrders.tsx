import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDate, formatToman } from "@/utils/helper";
import Link from "next/link";
import { useLatestOrders } from "../hooks/useLatestOrders";
import OrdersSkeleton from "./OrdersSkeleton";

export default function LatestOrders() {
  const { orders, isLoading } = useLatestOrders();
  if (isLoading) return <OrdersSkeleton />;

  return (
    <ScrollArea className=" rounded-md h-96 text-right">
      <h1 className="text-lg font-medium mb-6">سفارشات اخیر</h1>
      <div className="flex flex-col gap-2">
        {orders &&
          orders?.length > 0 &&
          orders.map((item) => (
            <Card
              key={item._id}
              className="flex-row w-full  items-center justify-between px-4"
            >
              <p className="text-xs font-medium">
                تاریخ :{formatDate(item.createdAt)}
              </p>

              <Badge variant="secondary">{item.status}</Badge>
              <span className="text-primary font-semibold text-sm">
                {formatToman(item.totalAmount)}
              </span>
              <Link
                href={`/orders/${item._id}`}
                className="bg-foreground hover:bg-foreground/90 text-muted rounded-sm text-xs px-4 py-1 font-medium"
              >
                جزیات
              </Link>
            </Card>
          ))}
      </div>
    </ScrollArea>
  );
}
