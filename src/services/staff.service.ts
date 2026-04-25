/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/api";

// 🔥 CREATE STAFF
export const createStaff = async (data: any) => {
  try {
    const res = await api.post("/staff", data);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || "Error creating staff";
  }
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
