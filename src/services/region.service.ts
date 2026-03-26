import api from "@/lib/api";

export const getRegions = async () => {
  const response = await api.get("/regions/all");
  return response.data;
};

export const createRegion = async (name: string) => {
  const response = await api.post("/regions/create", { name });
  return response.data;
};