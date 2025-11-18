"use client";
import { useQuery } from "@tanstack/react-query";
import { getPayments } from "../services/paymentServices";

export function useGetPayments() {
  const {
    data: payments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["payments"],
    queryFn: getPayments,
  });
  return { payments, isLoading, error };
}
