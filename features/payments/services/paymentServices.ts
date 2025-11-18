import axiosInstance from "@/lib/axiosInstance";

export async function getPaymentsStatus() {
  const { data } = await axiosInstance.get(
    "/payments/stats/paymentStatusCount"
  );

  return data.data;
}

export async function getMonthlySales() {
  const { data } = await axiosInstance.get("/payments/stats/monthlySales");
  return data.data;
}
export async function getPayments() {
  const { data } = await axiosInstance.get("/payments");

  return data.data;
}
