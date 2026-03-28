import api from "@/lib/api";

export const getClusters = async (params: any) => {
  const response = await api.get("/clusters", { params });
  return response.data;
};

export const createCluster = async (data: {
  name: string;
  districtId: string;
}) => {
  const res = await api.post("/clusters/create", data);
  return res.data;
};