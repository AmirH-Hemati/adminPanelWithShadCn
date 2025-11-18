import { createProduct as createProductApi } from "../services/productServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useCreateProduct() {
  const queryClient = useQueryClient();
  const { mutate: createProduct, isPending: isCreating } = useMutation({
    mutationFn: (newProduct: FormData) => createProductApi(newProduct),
    onSuccess: () => {
      toast.success("محصول با موفقیت ایجاد شد");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (err: any) => {
      console.log(err);
      toast.error(err.response.data.message);
    },
  });

  return { createProduct, isCreating };
}
