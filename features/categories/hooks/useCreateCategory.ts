import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createEditCategory } from "../services/categoryServices";

export function useCreateCategory() {
  const queryClient = useQueryClient();
  const { mutate: createCategory, isPending: isCreateing } = useMutation({
    mutationFn: (newProduct: FormData) => createEditCategory(newProduct),
    onSuccess: () => {
      console.log("successfully created data");
      toast.success("دسته بندی با موفقیت ساخته شد ");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (err: any) => toast.error(err.response.data.message),
  });

  return { createCategory, isCreateing };
}
