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
import { brands } from "../data/brands";
import { colors } from "../data/colors";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, productSchemaType } from "../schema/schema";
import Spinner from "@/components/Spinner";

function mapEditValues(values: any) {
  return {
    ...values,
    category: values.category?._id || "",
    brand: values.brand?.value || "",
    colors:  [],
    images: values.images || [],
  };
}

function CreateProductForm({ product = {} }) {
  const { createProduct, isCreating } = useCreateProduct();
  const { updateProduct, isUpdating } = useUpdateProduct();
  const { categories, isLoading } = useCategories();
  const isWorking = isCreating || isUpdating;

  const { _id: editId, ...editValues } = product;
  const isEditSessions = Boolean(editId);

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: isEditSessions
      ? mapEditValues(editValues)
      : {
          name: "",
          price: 0,
          priceDiscount: 0,
          category: "",
          brand: "",
          imageCover: "",
          images: [],
          colors: [],
          description: "",
          features: [],
        },
  });

  useEffect(() => {
    if (!isLoading && isEditSessions) {
      form.reset({
        ...editValues,
        category: editValues?.category?._id || "",
      });
    }
  }, [isLoading, isEditSessions]);

  function onSubmit(values: productSchemaType) {
    const formData = new FormData();
    const selectedBrnad = brands.find((brand) => brand.value == values.brand);

    const updatedValue = { ...values, brand: selectedBrnad };
    for (const key in updatedValue) {
      const value = updatedValue[key as keyof productSchemaType];
      if (value instanceof FileList) {
        for (const file of value) {
          formData.append(key, file);
        }
      } else if (value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === "object" && value !== null) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    }
    createProduct(formData);
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
                  <Input
                    {...field}
                    type="number"
                    value={field.value as number}
                  />
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
                  <Input
                    {...field}
                    type="number"
                    value={field.value as number}
                  />
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
          {isLoading ? (
            <Spinner />
          ) : (
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
          )}

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
                  برند محصول را انتخاب کنید.
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
                <FormLabel>گالری تصاویر محصول </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files)}
                  />
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
                        id={color.value}
                        checked={field?.value?.some(
                          (c) => c.value == color?.value,
                        )}
                        onCheckedChange={(checked) => {
                          const currentValues = field.value || [];
                          if (checked) {
                            field.onChange([...currentValues, color]);
                          } else {
                            field.onChange(
                              currentValues?.filter(
                                (c) => c.value !== color?.value,
                              ),
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

// if (isEditSessions) {
//   updateProduct({ newProduct: formData, id: editId });
// } else {
//   createProduct(formData);
// }

//  onSuccess: function () {
//         reset?.();
//         onCloseModal?.();
//       },
