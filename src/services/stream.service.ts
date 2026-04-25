import api from "@/lib/api";

export const createStream = async (data: any) => {
  const res = await api.post("/streams/create", data);
  return res.data;
};

export const getAllStreams = async () => {
  const res = await api.get("/streams");
  return res.data;
};

export const getStreamById = async (id: string) => {
  const res = await api.get(`/streams/${id}`);
  return res.data;
};