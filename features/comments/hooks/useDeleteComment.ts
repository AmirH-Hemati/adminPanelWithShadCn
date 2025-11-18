import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment as deleteCommentApi } from "../services/commentServices";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function useDeleteComment() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: deleteComment, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteCommentApi(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
      toast.success("  کامنت با موفقیت حذف شد");
      router.push("/comments");
    },

    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });

  return { deleteComment, isDeleting };
}
