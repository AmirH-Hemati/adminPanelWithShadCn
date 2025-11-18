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
        <CardTitle className="text-sm font-medium">
          <div>
            <span> سفارش دهنده : </span>
            <span>{order?.user?.name}</span>
          </div>
          <div>
            <span> شماره موبایل : </span>
            <span>{order?.user?.phone}</span>
          </div>
        </CardTitle>
        <div className="flex gap-2 items-center justify-between font-medium text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <h3>جزیات آدرس : </h3>
            <span>{order?.address?.city} ,</span>
            <span>{order?.address?.addressLine}</span>
            <span>{order?.address?.postalCode}</span>
          </div>
          <span>شماره موبایل : {order?.user?.phone}</span>
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
                    src={`http://localhost:3000/img/products/${item.product.imageCover}`}
                    alt={item.product.name}
                    fill
                    className="object-cover "
                    unoptimized
                  />
                </div>
                <span className="font-medium text-sm">{item.product.name}</span>
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
          <span className="text-green-800 font-semibold ">
            مبلغ کل سفارش : {formatToman(order.totalAmount)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
