"use client";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Badge } from "@/components/ui/badge";

import { useGetOrderDetails } from "@/features/orders/hooks/useGetOrderDetails";

import { useRouter } from "next/navigation";
import { useProcessing } from "@/features/orders/hooks/useProcessing";
import { useShipping } from "@/features/orders/hooks/useShipping";
import { useDelivering } from "@/features/orders/hooks/useDelivering";
import { useDeleteOrder } from "@/features/orders/hooks/useDeleteOrder";
import OrderDataBox from "@/features/orders/components/OrderDataBox";
import Spinner from "@/components/Spinner";
import { cn } from "@/lib/utils";
export default function Page() {
  const { order, isLoading } = useGetOrderDetails();
  const { processing, isProcessing } = useProcessing();
  const { shipping, isShipping } = useShipping();
  const { deleteOrder, isDeleting } = useDeleteOrder();
  const { delivering, isDelivering } = useDelivering();
  const router = useRouter();
  if (isLoading) return <Spinner />;
  return (
    <div className="flex flex-col">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">داشبورد</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/orders">سفارشات</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>جزیات سفارش</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {order && (
        <>
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-2xl my-5">
              سفارش {order._id.slice(0, 6)}#
            </h1>
            <Badge>{order?.status}</Badge>
          </div>
          <OrderDataBox order={order} />
          <div className="mr-auto my-4 flex gap-2">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="cursor-pointer"
            >
              برگشت به صفحه قبلی
            </Button>
            <Button
              disabled={isDeleting}
              variant="destructive"
              className="cursor-pointer"
              onClick={() => deleteOrder(order?._id)}
            >
              حذف سفارش
            </Button>
            {order?.status === "processing" && (
              <Button
                disabled={isProcessing}
                className="cursor-pointer"
                onClick={() => processing(order._id)}
              >
                تغییر وضعیت به ارسال شده
              </Button>
            )}

            {order?.status === "shipped" && (
              <Button
                className="cursor-pointer"
                disabled={isDelivering}
                onClick={() => delivering(order._id)}
              >
                تغییر وضعیت به تحویل داده شده
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
