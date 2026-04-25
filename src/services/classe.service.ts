import api from "@/lib/api";

export const createClass = async (data: any) => {
  const res = await api.post("/classes/create", data);
  return res.data;
};

export const getAllClasses = async (params: any) => {
  const res = await api.get("/classes", { params });
  return res.data;
};

export const getClasses = async () => {
  const res = await api.get("/classes");
  return res.data;
};

// 🔥 SCHOOL ADMIN (ARRAY DIRECT)
export const getMyClasses = async () => { 
  try {
    const res = await api.get("/classes/my-school");

    //✅ SAFE NORMALIZATION
    return Array.isArray(res.data) ? res.data : res.data?.data || [];
  } catch (error: any) {
    throw error.response?.data || "Error fetching classes";
  }
};

export const getClassById = async (id: string) => {
  const res = await api.get(`/classes/${id}`);
  return res.data;
};