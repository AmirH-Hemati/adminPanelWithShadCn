"use client";
import { useQuery } from "@tanstack/react-query";
import { getComments } from "../services/commentServices";

export function useGetComments() {
  const {
    data: commetns = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: getComments,
  });
  return { commetns, isLoading, error };
}
