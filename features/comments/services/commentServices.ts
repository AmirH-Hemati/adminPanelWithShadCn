import axiosInstance from "@/lib/axiosInstance";

// : Promise<comments>
// : Promise<commentClient>
// : Promise<object>
export async function getComments() {
  const { data } = await axiosInstance.get("/comments");

  return data.data;
}

export async function getComment(commentId: string) {
  const { data } = await axiosInstance.get(`/comments/${commentId}`);

  return data.data;
}

export async function deleteComment(id: string) {
  const { data } = await axiosInstance.delete(`/comments/${id}`);

  return data.data;
}

export async function getRecentcomment(userId: string) {
  const { data } = await axiosInstance.get(`/comments/recentcomment/${userId}`);

  return data.data;
}

export async function updatecomment(
  newData: object,
  id: string
): Promise<object> {
  const { data } = await axiosInstance.patch(`/comments/${id}`, newData);

  return data.data;
}

export async function getlatestcomments() {
  const { data } = await axiosInstance.get("/comments?limit=6");

  return data.data;
}
