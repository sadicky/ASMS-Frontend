/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/api";

// 🔥 CREATE STAFF
export const createStaff = async (payload: any) => {
  const { data } = await api.post("/staff/create", payload);
  return data;
};

// 🔥 SCHOOL ADMIN - STAFF LIST (ARRAY DIRECT FROM BACKEND)
export const getMyStaffs = async (params?: any) => {
  try {
    const res = await api.get("/staff/all", { params });

    // ⚠️ backend returns array directly
    return Array.isArray(res.data) ? res.data : [];
  } catch (error: any) {
    throw error.response?.data || "Error fetching staff";
  }
};
