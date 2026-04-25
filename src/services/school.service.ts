import api from "@/lib/api";

export const getSchools = async (params: any) => {
  const res = await api.get("/schools", { params });
  return res.data;
};
export const AllSchools = async () => {
  const res = await api.get("/schools");
  return res;
};


export const createSchool = async (data: any) => {
  const res = await api.post("/schools/create", data);
  return res.data;
};

export const getSchoolById = async (id: string) => {
  const res = await api.get(`/schools/${id}`);
  return res.data;
}
