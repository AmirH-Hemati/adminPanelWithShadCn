import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateUser as updateUserApi } from "../services/usersServices";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: ({ data, id }) =>
      updateUserApi(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast.success("اطلاعات کاربر با موفقیت آپدیت شد");
    },
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });

  return { updateUser, isUpdating };
}
