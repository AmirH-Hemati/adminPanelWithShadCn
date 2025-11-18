import React from "react";
import { useCreateProduct } from "../hooks/useCreateProduct";
import { ProductClient } from "../schema/schema";

export default function DuplicatedProduct({
  product,
}: {
  product: ProductClient;
}) {
  const { createProduct, isCreating } = useCreateProduct();
  function handelDublicatedProduct() {
    createProduct({
      name: `کپی از  ${product.name}`,
      category: product.category,
      price: product.price,
      brand: product.brand,
      colors: product.colors,
      sizes: product.sizes,
      shortDescription: product.shortDescription,
      description: product.description,
      imageCover: product.imageCover,
      images: product.images,
    });
  }

  return (
    <button disabled={isCreating} onClick={handelDublicatedProduct}>
      کپی کردن محصول
    </button>
  );
}
