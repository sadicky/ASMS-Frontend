import api from "@/lib/api";

export interface Assessment {
  id: string;
  type: string;
  title: string;
  maxMark: number;
  weight: number;
  courseId: string;
  termId: string;

  grades?: {
    id: string;
    markObtained: number;
    student: {
      id: string;
      firstName: string;
      lastName: string;
    };
  }[];
}

export interface CreateAssessmentDto {
  type: string;
  title: string;
  maxMark: number;
  weight: number;
  courseId: string;
  termId: string;
}

export interface RecordMarksDto {
  marks: {
    studentId: string;
    markObtained: number;
  }[];
}

export const createAssessment = async (
  dto: CreateAssessmentDto
) => {
  const { data } = await api.post(
    "/assessments/create",
    dto
  );

  return data;
};

export const updateAssessment = async (
  id: string,
  dto: Partial<CreateAssessmentDto>
) => {
  const { data } = await api.patch(
    `/assessments/edit/${id}`,
    dto
  );

  return data;
};

export const getCourseAssessments = async (
  courseId: string,
  termId: string
): Promise<Assessment[]> => {
  const { data } = await api.get(
    `/assessments/course/${courseId}/term/${termId}`
  );

  return data;
};

// 🔥 Get CA (course + term)
export const getCourseCA = async (courseId: string, termId: string) => {
  const res = await api.get(
    `/assessments/course/${courseId}/term/${termId}`
  );
  return res.data;
};

export const recordMarks = async (
  assessmentId: string,
  dto: RecordMarksDto
) => {
  const { data } = await api.post(
    `/assessments/${assessmentId}/marks`,
    dto
  );

  return data;
};