import ProductsSkeleton from "@/components/ProductsSkeleton";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatToman } from "@/utils/helper";
import Image from "next/image";
import { useLatestProducts } from "../hooks/useLatestProducts";
export default function PopulateProductList() {
  const { products, isLoading } = useLatestProducts();
  if (isLoading) return <ProductsSkeleton />;
  return (
    <ScrollArea className=" rounded-md h-96 text-right">
      <h1 className="text-lg font-medium mb-6">محصولات محبوب</h1>
      <div className="flex flex-col gap-2">
        {products &&
          products?.length > 0 &&
          products.map((product) => (
            <Card dir="rtl" key={product._id} className="  p-2">
              <CardContent className="p-0 w-full flex items-center justify-between gap-1">
                <div className="w-20 h-10 md:w-12 md:h-12 rounded-sm relative overflow-hidden">
                  <Image
                    src={product.imageCover}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="text-xs  flex-1 mr-1">
                  <p className="text-sm font-semibold ">{product.name}</p>
                  <div>
                    <span>برند : </span>
                    <span>{product?.brand?.label}</span>
                  </div>
                  <div>
                    <span>دسته بندی : </span>
                    <span>{product?.category?.label}</span>
                  </div>
                </div>
                <p className="p-0  text-xs text-primary">
                  {formatToman(product.price)}
                </p>
              </CardContent>
            </Card>
          ))}
      </div>
    </ScrollArea>
  );
}
