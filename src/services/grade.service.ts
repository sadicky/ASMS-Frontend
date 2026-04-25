import api from "@/lib/api";

export const getGrades = async (params: any) => {
  const results = await api.get("/grades", { params });
  return results.data;
};

export const getAllGrades = async () => {
  const results = await api.get("/grades") ;
  return results.data;
};

export const createGrade = async (data: any) => {
  const res = await api.post("/grades/create", data);
  return res.data;
};