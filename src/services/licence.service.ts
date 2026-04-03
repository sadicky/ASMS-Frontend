import api from "@/lib/api";

export const getLicensesBySchool = async (schoolId: string) => {
  const res = await api.get(`/licenses/school/${schoolId}`);
  return res.data;
};
export const getAllLicenses = async () => {
  const res = await api.get("/licenses");
  return res.data;
};