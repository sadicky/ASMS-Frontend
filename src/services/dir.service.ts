import api from "@/lib/api";

export const getDirectorates = async () => {
  const response = await api.get("/directorates/all");
  return response.data;
};