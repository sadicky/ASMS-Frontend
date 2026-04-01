import api from "@/lib/api";

export const getSchools = async (params: any) => {
  const res = await api.get("/schools", { params });
  return res.data;
};