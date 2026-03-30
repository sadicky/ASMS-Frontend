import api from "@/lib/api";

export const getYears = async () => {
  const response = await api.get("/academic-years");
  return response;
}; 

export const createYear = async (name: string) => {
  const response = await api.post("/academic-years", { name });
  return response.data;
};