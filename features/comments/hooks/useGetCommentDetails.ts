"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getComment } from "../services/commentServices";

export function useGetCommentDetails() {
  const { commentId } = useParams();

  const {
    data: comment,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comments", commentId],
    queryFn: () => getComment(commentId as string),
  });

  return { comment, isLoading, error };
}
