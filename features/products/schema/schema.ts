import { z } from "zod";

export const productSchema = z
  .object({
    name: z
      .string()
      .nonempty("نام محصول نمیتواند خالی باشد")
      .min(3, "نام محصول حداقل باید ۳ کاراکتر باشد"),

    price: z.coerce
      .number("قیمت باید عدد باشد")
      .min(1, "قیمت باید بیشتر از صفر باشد"),

    priceDiscount: z.coerce.number("قیمت باید عدد باشد").optional(),

    category: z.string().nonempty("انتخاب دسته بندی الزامی است"),

    brand: z.string().nonempty("انتخاب برند الزامی است"),

    description: z
      .string()
      .nonempty("توضیحات محصول نمیتواند خالی باشد")
      .min(10, "توضیحات حداقل باید ۱۰ کاراکتر باشد"),

    imageCover: z.any(),

    images: z.any(),

    colors: z
      .array(
        z.object({
          label: z.string().min(1, "عنوان الزامی است"),
          value: z.string().min(1, "مقدار الزامی است"),
          hex: z.string().min(1, "کد رنگی الزامی است"),
        }),
      )
      .min(1, "حداقل یک رنگ انتخاب کنید"),

    features: z
      .array(
        z.object({
          label: z.string().min(1, "عنوان الزامی است"),
          value: z.string().min(1, "مقدار الزامی است"),
        }),
      )
      .optional(),
    mode: z.enum(["edit", "create"]),
  })
  .refine(
    (data) =>
      data.mode === "edit" ||
      (data.imageCover && data.imageCover instanceof File),
    { message: "تصویر الزامی است", path: ["imageCover"] },
  );

export type productSchemaType = z.infer<typeof productSchema>;
