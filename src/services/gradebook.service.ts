/* eslint-disable @typescript-eslint/no-explicit-any */

import api from "@/lib/api";

export interface StudentGradebook {
  caScore: number;
  examScore: number;
  finalTotal: number;
  grade: string;
}

export interface ClassGradebook {
  studentId: string;
  studentName: string;
  caScore: number;
  examScore: number;
  finalTotal: number;
  grade: string;
}

// 🔥 STUDENT RESULT
export const getStudentResult = async (
  studentId: string,
  courseId: string,
  termId: string
): Promise<StudentGradebook> => {
  const { data } = await api.get(
    `/gradebook/student/${studentId}/course/${courseId}/term/${termId}`
  );

  return data;
};

// 🔥 CLASS REPORT
export const getClassReport = async (
  classId: string,
  courseId: string,
  termId: string
): Promise<ClassGradebook[]> => {
  const { data } = await api.get(
    `/gradebook/class/${classId}/course/${courseId}/term/${termId}`
  );

  return data;
};