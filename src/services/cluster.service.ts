import api from "@/lib/api";

export const getClusters = async () => {
  const response = await api.get("/clusters/all");
  return response.data;
};