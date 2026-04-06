import { Button } from "@/components/ui/button";
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
import { useForm } from "react-hook-form";
import { useCreateCategory } from "../hooks/useCreateCategory";
import { useUpdateCategory } from "../hooks/useUpdateCategory";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "../schema/category.schema";

function CreateCategoryForm({ category = {} }) {
  const { createCategory, isCreateing } = useCreateCategory();
  const { updateCategory, isUpdating } = useUpdateCategory();
  const { _id: editId, ...editValues } = category;
  const isWorking = isCreateing || isUpdating;

  const isEditSession = Boolean(editId);

  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: isEditSession
      ? { ...editValues, mode: "edit" }
      : { label: "", image: "", mode: "create" },
  });

  function onSubmit(data) {
    const formData = new FormData();
    for (const key in data) {
      if (key === "image") {
        formData.append("image", data.image);
      } else {
        formData.append(key, data[key]);
      }
    }
    if (isEditSession) {
      updateCategory({ newCategoryData: formData, id: editId });
    } else {
      createCategory(formData);
    }

    // , {
    //     onSettled: () => {
    //       reset();
    //     },
    //   }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem className="my-5">
              <FormLabel> عنوان دسته بندی </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>عنوان دسته بندی را وارد بکنید</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>عکس کاور دسته بندی </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => field.onChange(e?.target?.files?.[0])}
                  accept="image/*"
                />
              </FormControl>
              <FormDescription>
                فقط یک عکس به عنوان کاور دسته بندی میتوانید انتخاب کنید
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter className="mt-6">
          <Button variant="ghost" type="reset">
            لغو
          </Button>
          <Button type="submit" disabled={isWorking}>
            اضافه کردن
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export default CreateCategoryForm;
