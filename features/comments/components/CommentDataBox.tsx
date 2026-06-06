import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, formatToman } from "@/utils/helper";
import Image from "next/image";
// : { order: OrderClient }
export default function CommentDataBox({ comment }) {
  return (
    <Card className="p-0 overflow-hidden mt-4">
      <CardHeader className="bg-purple-600 p-3  flex flex-row justify-between items-center ">
        <span className="font-medium text-sm">
          تاریخ ثبت کامنت : {formatDate(comment?.createdAt)}
        </span>
      </CardHeader>

      <CardContent className="flex-1 px-3 space-y-6 ">
        <CardTitle className="text-sm font-medium">
          <div className="flex items-center justify-between">
            <div>
              <span> کاربر : </span>
              <span>{comment?.user?.name}</span>
            </div>
            <Badge>{comment?.user?.role}</Badge>
          </div>
          <div>
            <span> شماره موبایل : </span>
            <span>{comment?.user?.phone}</span>
          </div>
          <div>
            <span> ایمیل : </span>
            <span>{comment?.user?.email}</span>
          </div>
        </CardTitle>

        <div className="flex items-center justify-between p-2  border-t">
          <div className="flex items-center gap-2">
            <div className="border-2 w-16 h-16 relative rounded-md overflow-hidden">
              <Image
                src={comment?.product?.imageCover}
                alt={comment?.product?.name}
                fill
                className="object-cover "
                unoptimized
              />
            </div>
            <span className="font-medium text-sm">{comment?.product?.name}</span>
          </div>
          <div className="flex gap-2 text-xs  font-medium bg-orange-100 text-orange-800 rounded-md p-1">
            <span> {comment?.product?.category?.label}</span>
          </div>
        </div>

        <div className="space-y-2 my-4 border-t p-2 ">
          <p className="font-medium text-md">جزئیات کامنت : </p>
          <p className="pr-2 text-gray-400 font-semibold">{comment?.comment}</p>
        </div>
      </CardContent>
    </Card>
  );
}
