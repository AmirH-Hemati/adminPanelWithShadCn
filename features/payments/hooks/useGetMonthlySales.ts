"use client";
import { useQuery } from "@tanstack/react-query";
import { getMonthlySales } from "../services/paymentServices";

export function useGetMonthlySales() {
  const {
    data: sales = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["monthlySales"],
    queryFn: getMonthlySales,
  });
  return { sales, isLoading, error };
}
