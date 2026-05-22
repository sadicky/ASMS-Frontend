/* eslint-disable @typescript-eslint/no-explicit-any */

import api from "@/lib/api";

export interface Exam {
  id: string;
  maxMark: number;

  course: {
    id: string;
    subject: {
      name: string;
      code: string;
    };
  };

  term: {
    id: string;
    name: string;
  };

  grades?: any[];
}

export interface CreateExamDto {
  termId: string;
  courseId: string;
  maxMark: number;
}

export interface RecordExamMarksDto {
  marks: {
    studentId: string;
    markObtained: number;
  }[];
}

// 🔥 CREATE EXAM
export const createExam = async (
  payload: CreateExamDto
) => {
  const { data } = await api.post(
    "/exams/create",
    payload
  );

  return data;
};

// 🔥 RECORD MARKS
export const recordExamMarks = async (
  examId: string,
  payload: RecordExamMarksDto
) => {
  const { data } = await api.post(
    `/exams/${examId}/marks`,
    payload
  );

  return data;
};

// 🔥 GET RESULTS
export const getExamResults = async (
  examId: string
): Promise<Exam> => {
  const { data } = await api.get(
    `/exams/${examId}`
  );

  return data;
};