"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteCategory as deleteCategoryApi } from "../services/categoryServices";

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  const { mutate: deleteCategory, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteCategoryApi(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      toast.success("دسته بندی با موفقیت حذف شد");
    },

    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });

  return { deleteCategory, isDeleting };
}
