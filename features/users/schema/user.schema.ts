import { z } from "zod";
const userSchema = z.object({
  name: z
    .string()
    .nonempty("نام کاربر نمیتواند خالی باشد")
    .min(3, "نام کاربری حداقل باید شامل 3 حروف باشد"),
  nationalId: z
    .string()
    .nonempty("کد ملی نمیتواند خالی باشد")
    .min(10, "کد ملی نمیتواند کمتر از  ۱۰ رقم باشد"),
  phone: z
    .string()
    .nonempty("شماره موبایل  نمیتواند خالی باشد")
    .min(11, "شماره موبایل  نمیتواند کمتر از  11 رقم باشد"),

  email: z.email("ایمیل باید معتبر باشد").nonempty("ایمیل  نمیتواند خالی باشد"),
  role: z.enum(["user", "admin"]).nonoptional("نقش کاربر نمیتواند خالی باشد"),
});

export default userSchema;
