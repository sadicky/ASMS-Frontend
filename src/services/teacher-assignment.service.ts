import api from "@/lib/api";

export const assignTeacher = async (data: {
  teacherId: string;
  courseId: string;
  isPrimary?: boolean;
}) => {
  try {
    const res = await api.post(
      "/teacher-assignments/create",
      data
    );

    return res.data;
  } catch (error: any) {
    throw (
      error.response?.data || {
        message: "Error assigning teacher",
      }
    );
  }
};

export const getAssignmentsByCourse = async (
  courseId: string
) => {
  try {
    const res = await api.get(
      `/teacher-assignments/course/${courseId}`
    );

    return Array.isArray(res.data)
      ? res.data
      : res.data?.data || [];
  } catch (error: any) {
    throw (
      error.response?.data || {
        message: "Error loading assignments",
      }
    );
  }
};

export const updateTeacherAssignment = async (
  id: string,
  data: {
    teacherId?: string;
    isPrimary?: boolean;
  }
) => {
  try {
    const res = await api.patch(
      `/teacher-assignments/${id}`,
      data
    );

    return res.data;
  } catch (error: any) {
    throw (
      error.response?.data || {
        message: "Error updating assignment",
      }
    );
  }
};