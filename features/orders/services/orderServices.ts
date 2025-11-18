import axiosInstance from "@/lib/axiosInstance";
import { OrderClient, Orders } from "@repo/validation";

export async function getOrders(): Promise<Orders> {
  const { data } = await axiosInstance.get("/orders");

  return data.data;
}

export async function getOrder(orderId: string): Promise<OrderClient> {
  const { data } = await axiosInstance.get(`/orders/${orderId}`);

  return data.data;
}

export async function deleteOrder(id: string): Promise<object> {
  const { data } = await axiosInstance.delete(`/orders/${id}`);

  return data.data;
}

export async function getRecentOrder(userId: string): Promise<Orders> {
  const { data } = await axiosInstance.get(`/orders/recentOrder/${userId}`);

  return data.data;
}

export async function updateOrder(
  newData: object,
  id: string
): Promise<object> {
  const { data } = await axiosInstance.patch(`/orders/${id}`, newData);

  return data.data;
}

export async function getlatestOrders() {
  const { data } = await axiosInstance.get("/orders?limit=6");

  return data.data;
}
