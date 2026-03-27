import api from "@/lib/api";

export const getDistricts = async () => {
  const response = await api.get("/districts/all");
  return response.data;
};

export const createDistrict = async (data: {
  name: string;
  directorateId: string;
}) => {
  const response = await api.post("/districts/create", data);
  return response.data;
};