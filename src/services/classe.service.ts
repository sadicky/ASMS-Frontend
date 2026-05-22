// import api from "@/lib/api";

// export const createClass = async (data: any) => {
//   const res = await api.post("/classes/create", data);
//   return res.data;
// };

// export const getAllClasses = async (params: any) => {
//   const res = await api.get("/classes", { params });
//   return res.data;
// };

// export const getClasses = async () => {
//   const res = await api.get("/classes");
//   return res.data;
// };
 
// // 🔥 SCHOOL ADMIN (ARRAY DIRECT)
// export const getMyClasses = async () => {
//   try {

//     const res = await api.get("/classes/my-school");

//     // ✅ SAFE NORMALIZATION
//     return Array.isArray(res.data)
//       ? res.data
//       : res.data?.data || [];

//   } catch (error: any) {

//     console.error(error);

//     throw (
//       error.response?.data ||
//       "Error fetching classes"
//     );
//   }
// };

// export const getClassById = async (id: string) => {
//   const res = await api.get(`/classes/${id}`);
//   return res.data;
// };
// src/services/classe.service.ts

/* eslint-disable @typescript-eslint/no-explicit-any */

import api from "@/lib/api";

/* =========================================================
   TYPES
========================================================= */

export interface Grade {
  id: string;
  name: string;
}

export interface Stream {
  id: string;
  name: string;
}

export interface School {
  id: string;
  name: string;
}

export interface ClassItem {
  id: string;
  name: string;

  schoolId: string;
  gradeId: string;
  streamId?: string;

  grade?: Grade;
  stream?: Stream;
  school?: School;

  _count?: {
    enrollments?: number;
  };

  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedClassesResponse {
  classes: ClassItem[];
  total: number;
  page: number;
  pageSize: number;
}

/* =========================================================
   CREATE CLASS
========================================================= */

export const createClass = async (
  data: {
    name: string;
    gradeId: string;
    schoolId?: string;
  }
) => {
  try {
    const res = await api.post(
      "/classes/create",
      data
    );

    return res.data;
  } catch (error: any) {
    console.error(error);

    throw (
      error.response?.data ||
      error.message ||
      "Failed creating class"
    );
  }
};

/* =========================================================
   UPDATE CLASS
========================================================= */

export const updateClass = async (
  id: string,
  data: Partial<{
    name: string;
    gradeId: string;
    schoolId: string;
  }>
) => {
  try {
    const res = await api.put(
      `/classes/${id}`,
      data
    );

    return res.data;
  } catch (error: any) {
    console.error(error);

    throw (
      error.response?.data ||
      error.message ||
      "Failed updating class"
    );
  }
};

/* =========================================================
   DELETE CLASS
========================================================= */

export const deleteClass = async (
  id: string
) => {
  try {
    const res = await api.delete(
      `/classes/${id}`
    );

    return res.data;
  } catch (error: any) {
    console.error(error);

    throw (
      error.response?.data ||
      error.message ||
      "Failed deleting class"
    );
  }
};

/* =========================================================
   GET MY SCHOOL CLASSES
   SCHOOL_ADMIN / TEACHER
========================================================= */

export const getMyClasses = async (): Promise<
  ClassItem[]
> => {
  try {
    const res = await api.get(
      "/classes/my-school"
    );

    return Array.isArray(res.data)
      ? res.data
      : [];
  } catch (error: any) {
    console.error(error);

    throw (
      error.response?.data ||
      error.message ||
      "Failed loading classes"
    );
  }
};

/* =========================================================
   GET SINGLE CLASS
========================================================= */

export const getClassById = async (
  schoolId: string,
  classId: string
): Promise<ClassItem> => {
  try {
    const res = await api.get(
      `/classes/school/${schoolId}/${classId}`
    );

    return res.data;
  } catch (error: any) {
    console.error(error);

    throw (
      error.response?.data ||
      error.message ||
      "Failed loading class"
    );
  }
};

/* =========================================================
   PAGINATE MY SCHOOL CLASSES
   SCHOOL_ADMIN
========================================================= */

export const paginateMyClasses = async (
  params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    gradeId?: string;
    streamId?: string;
    sortBy?: "name" | "grade";
    sortOrder?: "asc" | "desc";
  }
): Promise<PaginatedClassesResponse> => {
  try {
    const res = await api.get(
      "/classes/my-school/paginate",
      {
        params,
      }
    );

    return res.data;
  } catch (error: any) {
    console.error(error);

    throw (
      error.response?.data ||
      error.message ||
      "Failed loading paginated classes"
    );
  }
};

/* =========================================================
   PAGINATE CLASSES BY SCHOOL
   SUPER_ADMIN
========================================================= */

export const paginateClassesBySchool =
  async (
    schoolId: string,
    params?: {
      page?: number;
      pageSize?: number;
      search?: string;
      gradeId?: string;
      streamId?: string;
      sortBy?: "name" | "grade";
      sortOrder?: "asc" | "desc";
    }
  ): Promise<PaginatedClassesResponse> => {
    try {
      const res = await api.get(
        `/classes/school/${schoolId}/paginate`,
        {
          params,
        }
      );

      return res.data;
    } catch (error: any) {
      console.error(error);

      throw (
        error.response?.data ||
        error.message ||
        "Failed loading school classes"
      );
    }
  };

/* =========================================================
   ENROLLMENT COUNT
========================================================= */

export const getMySchoolEnrollmentCount =
  async () => {
    try {
      const res = await api.get(
        "/classes/my-school/enrollment-count"
      );

      return res.data;
    } catch (error: any) {
      console.error(error);

      throw (
        error.response?.data ||
        error.message ||
        "Failed loading enrollment stats"
      );
    }
  };

export const getSchoolEnrollmentCount =
  async (schoolId: string) => {
    try {
      const res = await api.get(
        `/classes/school/${schoolId}/enrollment-count`
      );

      return res.data;
    } catch (error: any) {
      console.error(error);

      throw (
        error.response?.data ||
        error.message ||
        "Failed loading school enrollment stats"
      );
    }
  };