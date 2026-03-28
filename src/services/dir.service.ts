import api from "@/lib/api";

export const getDirectorates = async (params: any) => {
  const response = await api.get("/directorates", { params });
  return response.data;
};

export const createDirectorate = async (data: {
  name: string;
  regionId: string;
}) => {
  const response = await api.post("/directorates/create", data);
  return response.data;
};

export const getDirectoratesByRegion = async (regionId: string) => {
  if (!regionId) return [];

  const res = await api.get("/directorates", {
    params: { regionId },
  });

  return res.data.data;
};