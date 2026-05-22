import api from "@/lib/api";

export type Course = {
  id: string;

  class: {
    id: string;
    name: string;
    grade?: {
      name: string;
    };
  };

  subject: {
    id: string;
    name: string;
    code: string;
  };

  assignments?: any[];
};

// 🔥 CREATE COURSE
export const createCourse = async (data: {
  classId: string;
  subjectId: string;
}) => {
  try {
    const res = await api.post("/courses/create", data);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || {
      message: "Error creating course",
    };
  }
};

export const getMyCourses = async () => {
  const res = await api.get("/courses");
  return res.data.data; // backend returns { data, meta }
};

// 🔥 GET COURSES BY CLASS
export const getCoursesByClass = async (
  classId: string
) => {
  try {
    const res = await api.get(
      `/courses/class/${classId}`
    );

    return Array.isArray(res.data)
      ? res.data
      : res.data?.data || [];
  } catch (error: any) {
    throw error.response?.data || {
      message: "Error fetching courses",
    };
  }
};