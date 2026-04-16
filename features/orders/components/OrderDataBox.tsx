import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, formatToman } from "@/utils/helper";
import Image from "next/image";
// : { order: OrderClient }
export default function OrderDataBox({ order }) {
  return (
    <Card className="p-0 overflow-hidden mt-4">
      <CardHeader className="bg-purple-600 p-3  flex flex-row justify-between items-center ">
        <span className="font-medium text-sm">
          تاریخ سفارش : {formatDate(order.createdAt)}
        </span>
      </CardHeader>

      <CardContent className="flex-1 px-3 space-y-6 ">
        <CardTitle className="text-sm ">
          <div>
            <span className="font-semibold"> سفارش دهنده : </span>
            <span className="font-normal">{order?.user?.name}</span>
          </div>
          <div>
            <span className="font-semibold"> شماره موبایل : </span>
            <span className="font-normal">{order?.user?.phone}</span>
          </div>
        </CardTitle>
        <div className="flex gap-2 items-center justify-between  text-sm ">
          <div className="flex  flex-col gap-2">
            <h3 className="font-bold text-sm ">جزئیات آدرس </h3>
            <div className="flex ">
              <span className="font-semibold">آدرس : </span>
              <span>{order?.address?.city}</span>,
              <span>{order?.address?.fullAddress}</span>
            </div>
            <div className="flex ">
              <span className="font-semibold">کد پستی : </span>
              <span>{order?.address?.postalCode}</span>
            </div>
          </div>
        </div>

        <div className=" mt-4">
          {order?.orderItems?.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border-y  p-2 rounded-md"
            >
              <div className="flex items-center gap-2">
                <div className="border-2 w-12 h-12 relative rounded-md overflow-hidden">
                  <Image
                    src={item.product.imageCover}
                    alt={item.product.name}
                    fill
                    className="object-cover "
                    unoptimized
                  />
                </div>
                <div>
                  <p className="font-medium text-sm">{item.product.name}</p>
                  <div className=" text-xs flex gap-1 items-center">
                    <span>رنگ : </span>
                    <span>{item?.color?.label}</span>
                  </div>
                  <div className=" text-xs flex gap-1 items-center">
                    <span>برند : </span>
                    <span>{item?.product.brand?.label}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 text-xs  font-medium">
                <span className="text-muted-foreground">
                  تعداد اقلام : {item.quantity}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-green-300 p-2 my-5">
          <p className="text-green-800 font-medium ">
            مبلغ کل سفارش : {formatToman(order.totalAmount)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
