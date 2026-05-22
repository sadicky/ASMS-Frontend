import api from "@/lib/api";

/* ================================
   TYPES
================================ */

export interface TermInput {
  name: string;
}

export interface CreateAcademicYearDto {
  name: string;
  terms: TermInput[];
}

/* ================================
   CREATE ACADEMIC YEAR
================================ */

export const createAcademicYear = async (
  data: CreateAcademicYearDto
) => {
  const res = await api.post(
    "/academic-years/create",
    data
  );

  return res.data;
};

/* ================================
   GET ALL ACADEMIC YEARS
================================ */

export const getAcademicYears = async (
  params?: {
    page?: number;
    limit?: number;
    search?: string;
  }
) => {
  const res = await api.get(
    "/academic-years/all",
    {
      params,
    }
  );

  return res.data;
};

export const activateAcademicYear = async (
  id: string
) => {
  const res = await api.patch(
    `/academic-years/${id}/activate`
  );

  return res.data;
};