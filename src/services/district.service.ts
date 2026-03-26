import api from "@/lib/api";

export const getDistricts = async () => {
  const response = await api.get("/districts/all");
  return response.data;
};