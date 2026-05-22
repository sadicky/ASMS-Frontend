import api from "@/lib/api";

export interface Stream {
  id: string;
  name: string;
  description?: string;

  _count?: {
    classes: number;
  };

  createdAt: string;
} 

export const createStream = async (data: any) => {
  const res = await api.post("/streams/create", data);
  return res.data;
};

export const getStreams = async () => {
  const res = await api.get("/streams");
  return res;
};

export const getStreamById = async (id: string) => {
  const res = await api.get(`/streams/${id}`);
  return res.data;
};

// 🔥 UPDATE
export const updateStream = async (
  id: string,
  data: any
) => {
  const res = await api.patch(
    `/streams/${id}`,
    data
  );

  return res.data;
};

// 🔥 DELETE
export const deleteStream = async (
  id: string
) => {
  const res = await api.delete(
    `/streams/${id}`
  );

  return res.data;
};