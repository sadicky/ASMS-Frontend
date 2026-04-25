/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/api";

// 🔹 TYPES
export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  nationality: string;
  parentName: string;
  contact: string;
  address: string;
  religion?: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;

  enrollments: {
    class: {
      id: string;
      name: string;
      grade: {
        name: string;
      };
    };
    academicYear: {
      name: string;
      active: boolean;
    };
  }[];
}

// 🔥 CREATE
export const createStudent = async (data: any) => {
  try {
    const res = await api.post("/students/enroll", data);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || "Error creating student";
  }
};

// 🔥 SCHOOL ADMIN (ARRAY DIRECT)
export const getMyStudents = async (params?: any) => {
  try {
    const res = await api.get("/students/my-students", { params });

    return {
      data: res.data.data || [],
      meta: res.data.meta || {},
    };
  } catch (error: any) {
    throw error.response?.data || "Error fetching students";
  }
};

// 🔥 SUPER ADMIN (PAGINATION)
export const getAllStudents = async (params?: any) => {
  try {
    const res = await api.get("/students/all", { params });
    return res.data;
  } catch (error: any) {
    throw error.response?.data || "Error fetching all students";
  }
};

// 🔥 DETAIL
export const getStudentById = async (id: string): Promise<Student> => {
  try {
    const res = await api.get(`/students/${id}`);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || "Error fetching student";
  }
};