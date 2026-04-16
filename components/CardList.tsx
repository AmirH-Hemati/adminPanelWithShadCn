import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { ProductsList, Orders } from "@repo/validation";
import Image from "next/image";
import Link from "next/link";
import { formatDate, formatToman } from "@/utils/helper";

const CardList = ({
  title,
  orders,
  products,
}: {
  title: string;
  products?: ProductsList | undefined;
  orders?: Orders | undefined;
}) => {
  return (
    <ScrollArea className=" rounded-md h-96">
      <h1 className="text-lg font-medium mb-6">{title}</h1>
      <div className="flex flex-col gap-2">
        {products &&
          products?.length > 0 &&
          products.map((product) => (
            <Card
              dir="rtl"
              key={product._id}
              className="flex-row-reverse  items-center justify-between gap-4 p-2"
            >
              <CardContent className="p-0 flex items-center gap-1">
                <p className="text-xs font-medium text-right">{product.name}</p>

                <div className="w-20 h-10 md:w-12 md:h-12 rounded-sm relative overflow-hidden">
                  <Image
                    src={`http://localhost:3000/img/products/${product.imageCover}`}
                    alt={product.name}
                    fill
                    className="object-cover w-full h-full"
                  />
                </div>
              </CardContent>
              <CardFooter className="p-0  text-xs text-primary">
                {formatToman(product.price)}
              </CardFooter>
            </Card>
          ))}

        {orders &&
          orders?.length > 0 &&
          orders.map((item) => (
            <Card
              key={item._id}
              className="flex-row-reverse items-center justify-between gap-4 p-4 text-right"
            >
              <CardContent className="flex-1 p-0 ">
                <p className="text-xs font-medium flex-1 ">
                  تاریخ :{formatDate(item.createdAt)}
                </p>
              </CardContent>
              <Badge variant="secondary">{item.status}</Badge>
              <span className="text-primary font-semibold text-sm">
                {formatToman(item.totalAmount)}
              </span>
              <CardFooter className="p-0">
                <Link
                  href={`/orders/${item._id}`}
                  className="bg-foreground hover:bg-foreground/90 text-muted rounded-md text-xs px-2 py-1 font-medium"
                >
                  جزئیات
                </Link>
              </CardFooter>
            </Card>
          ))}
      </div>
    </ScrollArea>
  );
};

export default CardList;
