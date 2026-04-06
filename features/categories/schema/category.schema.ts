import { z } from "zod";

export const categorySchema = z
  .object({
    label: z
      .string()
      .nonempty("عنوان دسته بندی نمیتواند خالی باشد")
      .min(3, "عنوان دسته بندی باید بزرگتر از 3 کارکتر باشد"),
    mode: z.enum(["create", "edit"]),
    image: z.any(),
  })
  .refine(
    (data) =>
      data.mode === "edit" || (data.image && data.image instanceof File),
    { message: "تصویر دسته بندی ضرروی است", path: ["image"] },
  );
