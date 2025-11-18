import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createEditCategory } from "../services/categoryServices";

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  const { mutate: updateCategory, isPending: isUpdating } = useMutation({
    mutationFn: ({
      newCategoryData,
      id,
    }: {
      newCategoryData: FormData;
      id: string;
    }) => createEditCategory(newCategoryData, id),
    onSuccess: () => {
      toast.success("دسته بندی با موفقیت ویرایش شد ");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (err: any) => toast.error(err.response.data.message),
  });

  return { updateCategory, isUpdating };
}
