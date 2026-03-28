import api from "@/lib/api";

export const getDistricts = async (params: any) => {
  const response = await api.get("/districts", {params});
  return response.data;
};

export const createDistrict = async (data: {
  name: string;
  directorateId: string;
}) => {
  const response = await api.post("/districts/create", data);
  return response.data;
};

export const getDistrictsByDirectorate = async (directorateId: string) => {
  const res = await api.get("/districts", {
    params: { directorateId },
  });

  return res.data.data;
};