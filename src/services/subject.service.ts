import api from "@/lib/api";

export type Subject = {
  id: string;
  name: string;
  code: string;
};

// 🔥 GET ALL SUBJECTS
export const getSubjects = async () => {
  try {
    const res = await api.get("/subjects/all");

    return Array.isArray(res.data)
      ? res.data
      : res.data?.data || [];
  } catch (error: any) {
    throw error.response?.data || {
      message: "Error fetching subjects",
    };
  }
};

// 🔥 CREATE SUBJECT
export const createSubject = async (data: {
  name: string;
  code: string;
}) => {
  try {
    const res = await api.post("/subjects/create", data);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || {
      message: "Error creating subject",
    };
  }
};

// 🔥 UPDATE SUBJECT
export const updateSubject = async (
  id: string,
  data: {
    name?: string;
    code?: string;
  }
) => {
  try {
    const res = await api.patch(`/subjects/edit/${id}`, data);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || {
      message: "Error updating subject",
    };
  }
};

// 🔥 DELETE SUBJECT
export const deleteSubject = async (id: string) => {
  try {
    const res = await api.delete(`/subjects/delete/${id}`);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || {
      message: "Error deleting subject",
    };
  }
};