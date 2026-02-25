import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCreateProduct } from "../hooks/useCreateProduct";
import { useUpdateProduct } from "../hooks/useUpdateProduct";
import AddFeatures from "./AddFeature";
import Editor from "./Editor";
export const brands = [
  { label: "ریزر", value: "Razer" },
  { label: "استیل‌سریز", value: "SteelSeries" },
  { label: "لاجیتک جی", value: "Logitech G" },
  { label: "هایپرایکس", value: "HyperX" },
  { label: "کولر مستر", value: "Cooler Master" },
  { label: "ان‌زد‌ایکس‌تی", value: "NZXT" },
  { label: "الیان‌ویر", value: "Alienware" },
  { label: "ام‌اس‌آی", value: "MSI" },
  { label: "ایسوس راگ", value: "ASUS ROG" },
  { label: "ایسر پردیتور", value: "Acer Predator" },
  { label: "رد دراگون", value: "Redragon" },
  { label: "ترمال‌تیک", value: "Thermaltake" },
  { label: "کوگار", value: "Cougar" },
  { label: "ای‌وی‌جی‌ای", value: "EVGA" },

  { label: "ایسوس", value: "ASUS" },
  { label: "ایسر", value: "Acer" },
  { label: "اچ‌پی", value: "HP" },
  { label: "دل", value: "Dell" },
  { label: "لنوو", value: "Lenovo" },
  { label: "اپل", value: "Apple" },
  { label: "مایکروسافت سرفیس", value: "Microsoft Surface" },
  { label: "گیگابایت", value: "Gigabyte" },
  { label: "رزر بلید", value: "Razer Blade" },

  { label: "سامسونگ", value: "Samsung" },
  { label: "شیائومی", value: "Xiaomi" },
  { label: "وان‌پلاس", value: "OnePlus" },
  { label: "گوگل پیکسل", value: "Google Pixel" },
  { label: "ریلمی", value: "Realme" },
  { label: "آنر", value: "Honor" },
  { label: "نوبیا رد مجیک", value: "Nubia RedMagic" },
  { label: "ایسوس راگ فون", value: "ASUS ROG Phone" },

  { label: "سونی", value: "Sony" },
  { label: "بوز", value: "Bose" },
  { label: "سنهایزر", value: "Sennheiser" },
  { label: "جی‌بی‌ال", value: "JBL" },
  { label: "بیتس", value: "Beats" },
  { label: "استرو", value: "Astro" },
  { label: "کریتیو", value: "Creative" },

  { label: "پلی‌استیشن", value: "Sony PlayStation" },
  { label: "ایکس‌باکس", value: "Microsoft Xbox" },
  { label: "نینتندو", value: "Nintendo" },
  { label: "اسکاف", value: "Scuf" },
  { label: "پاور ای", value: "PowerA" },

  { label: "اینتل", value: "Intel" },
  { label: "ای‌ام‌دی", value: "AMD" },
  { label: "انویدیا", value: "NVIDIA" },
  { label: "کورسیر", value: "Corsair" },
  { label: "جی‌اسکیل", value: "G.Skill" },
  { label: "کینگستون", value: "Kingston" },
  { label: "سیگیت", value: "Seagate" },
  { label: "وسترن دیجیتال", value: "Western Digital" },
  { label: "کروشیال", value: "Crucial" },
  { label: "بی کوایت", value: "Be Quiet!" },
];
export const colors = [
  { label: "مشکی", value: "black", hex: "#000000" },
  { label: "سفید", value: "white", hex: "#ffffff" },
  { label: "قرمز", value: "red", hex: "#ff0000" },
  { label: "آبی", value: "blue", hex: "#0000ff" },
  { label: "سبز", value: "green", hex: "#00ff00" },
  { label: "خاکستری", value: "gray", hex: "#808080" },
  { label: "طلایی", value: "gold", hex: "#FFD700" },
  { label: "نقره‌ای", value: "silver", hex: "#C0C0C0" },
  { label: "بنفش", value: "purple", hex: "#800080" },
  { label: "آبی تیره", value: "navy", hex: "#000080" },
  { label: "قرمز نئون", value: "neon-red", hex: "#FF073A" },
  { label: "سبز نئون", value: "neon-green", hex: "#39FF14" },
];

function CreateProductForm({ product = {} }) {
  const { createProduct, isCreating } = useCreateProduct();
  const { updateProduct, isUpdating } = useUpdateProduct();
  const { categories, isLoading } = useCategories();
  const isWorking = isCreating || isUpdating;

  const { _id: editId, ...editValues } = product;
  const isEditSessions = Boolean(editId);

  const form = useForm({
    defaultValues: isEditSessions
      ? { ...editValues, category: editValues?.category?._id || "" }
      : {
          name: "",
          price: 0,
          priceDiscount: 0,
          category: "",
          brand: "",
          imageCover: "",
          images: "",
          colors: [],
          description: "",
        },
  });

  useEffect(() => {
    if (!isLoading && editId) {
      form.reset({
        ...editValues,
        category: editValues?.category?._id || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  if (isLoading) return <Spinner />;

  function onSubmit(data) {
    const formData = new FormData();

    for (const key in data) {
      if (key === "imageCover") {
        formData.append("imageCover", data.imageCover);
      } else if (key === "colors") {
        data.colors.forEach((color: string) =>
          formData.append("colors", color),
        );
      } else if (key === "features") {
        data.features.forEach(
          (feature: { key: string; value: string }, index: number) => {
            formData.append(`features[${index}][key]`, feature.key);
            formData.append(`features[${index}][value]`, feature.value);
          },
        );
      } else {
        formData.append(key, data[key]);
      }
    }
    if (isEditSessions) {
      updateProduct({ newProduct: formData, id: editId });
    } else {
      createProduct(formData);
    }

    //  onSuccess: function () {
    //         reset?.();
    //         onCloseModal?.();
    //       },
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          disabled={isWorking}
          render={({ field }) => (
            <FormItem className="my-5">
              <FormLabel>نام محصول </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription className="text-xs">
                نام نمایش دهنده محصول در وبسایت و موتور های جستجوگر
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            disabled={isWorking}
            render={({ field }) => (
              <FormItem className="my-5">
                <FormLabel>قیمت محصول </FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormDescription className="text-xs">
                  قیمت محصول را به تومان وارد کنید
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priceDiscount"
            disabled={isWorking}
            render={({ field }) => (
              <FormItem className="my-5 ">
                <FormLabel>تخفیف محصول </FormLabel>
                <FormControl>
                  <Input {...field} type="number" defaultValue={0} />
                </FormControl>
                <FormDescription className="text-xs">
                  تخفیف محصول را به تومان وارد کنید
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2 mt-5 gap-4">
          <FormField
            control={form.control}
            name="category"
            disabled={isWorking}
            render={({ field }) => (
              <FormItem>
                <FormLabel>دسته بندی</FormLabel>
                <FormControl>
                  <Select {...field} onValueChange={(e) => field.onChange(e)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="دسته بندی محصول" />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      {categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription className="text-xs">
                  دسته بندی محصول را انتخاب کنید.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brand"
            disabled={isWorking}
            render={({ field }) => (
              <FormItem>
                <FormLabel>برند محصول</FormLabel>
                <FormControl>
                  <Select {...field} onValueChange={(e) => field.onChange(e)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="دسته بندی محصول" />
                    </SelectTrigger>
                    <SelectContent className="w-full ">
                      {brands.map((brand) => (
                        <SelectItem key={brand.value} value={brand.value}>
                          {brand.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription className="text-xs">
                  برند محصول را انتخاب کنید.{" "}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2 mt-5 gap-4">
          <FormField
            control={form.control}
            name="imageCover"
            disabled={isWorking}
            render={({ field }) => (
              <FormItem>
                <FormLabel>عکس کاور محصول</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => field.onChange(e?.target?.files?.[0])}
                    accept="image/*"
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  فقط یک عکس به عنوان کاور محصول میتوانید انتخاب کنید
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="images"
            disabled={isWorking}
            render={({ field }) => (
              <FormItem>
                <FormLabel> گالری تصاویر محصول </FormLabel>
                <FormControl>
                  <Input {...field} type="file" multiple accept="image/*" />
                </FormControl>
                <FormDescription className="text-xs">
                  میتوانید حداقل 1 و حداکثر 3 عکس انتخاب کنید
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="colors"
          disabled={isWorking}
          render={({ field }) => (
            <FormItem className="my-5">
              <FormLabel>رنگ های محصول</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-4">
                  {colors.map((color) => (
                    <div className="flex items-center gap-2" key={color?.value}>
                      <Checkbox
                        id={color?.value}
                        checked={field?.value?.includes(color?.value)}
                        onCheckedChange={(checked) => {
                          const currentValues = field.value || [];
                          if (checked) {
                            field.onChange([...currentValues, color.value]);
                          } else {
                            field.onChange(
                              currentValues?.filter((c) => c !== color?.value),
                            );
                          }
                        }}
                      />
                      <label
                        htmlFor={color?.value}
                        className="text-xs flex items-center gap-2"
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: color?.hex }}
                        />
                        {color?.label}
                      </label>
                    </div>
                  ))}
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Editor form={form} />
        <AddFeatures form={form} />

        <DialogFooter className="mt-6">
          <Button variant="ghost" type="reset">
            لغو
          </Button>
          <Button type="submit">
            {isEditSessions ? "ثبت ویرایش" : "اضافه کردن"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export default CreateProductForm;
