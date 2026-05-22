import api from "@/lib/api";

// 🔥 Create lesson session (TEACHER ONLY)
export const createLessonSession = async (data: any) => {
  const res = await api.post("/lesson-sessions/create", data);
  return res.data;
};

// 🔥 Get sessions by course (SCHOOL_ADMIN / TEACHER)
export const getLessonSessionsByCourse = async (courseId: string) => {
  const res = await api.get(`/lesson-sessions/course/${courseId}`);
  return res.data;
};

// 🔥 Update session (TEACHER ONLY)
export const updateLessonSession = async (id: string, data: any) => {
  const res = await api.patch(`/lesson-sessions/${id}`, data);
  return res.data;
};