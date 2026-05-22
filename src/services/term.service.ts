// services/term.service.ts

import api from "@/lib/api";

export const getTermsByAcademicYear = async (
  academicYearId: string
) => {
  const res = await api.get(
    `/terms/academic-year/${academicYearId}`
  );

  return res.data;
};

export const getTermById = async (id: string) => {
  const res = await api.get(`/terms/${id}`);
  return res.data;
};

export const updateTerm = async (
  id: string,
  data: {
    name?: string;
  }
) => {
  const res = await api.patch(`/terms/edit/${id}`, data);

  return res.data;
};