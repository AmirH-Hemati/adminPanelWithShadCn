"use client";
import { useQuery } from "@tanstack/react-query";
import { getPaymentsStatus } from "../services/paymentServices";

export function useGetPaymentStatus() {
  const {
    data: payments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["paymentsStatus"],
    queryFn: getPaymentsStatus,
  });
  return { payments, isLoading, error };
}
