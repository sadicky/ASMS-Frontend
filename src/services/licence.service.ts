/* eslint-disable @typescript-eslint/no-explicit-any */
// import api from "@/lib/api";


// export const getAllLicenses = async () => {
//   const res = await api.get("/licenses");
//   return res.data;
// };
// export const createLicense = async (data: any) => {
//   const res = await api.post("/licenses/create", data);
//   return res.data;
// };

import api from "@/lib/api";

// 🔹 TYPES (optionnel mais recommandé)
export interface License {
  id: string;
  schoolId: string;
  licenseKey: string;
  plan: "BASIC" | "STANDARD" | "PREMIUM";
  issuedAt: string;
  expiresAt: string;
  status: "ACTIVE" | "EXPIRED" | "SUSPENDED";
  createdAt: string;
}

//  GET ALL LICENSES (GLOBAL ADMIN)
export const getAllLicenses = async (): Promise<License[]> => {
  try {
    const res = await api.get("/licenses");
    return res.data;
  } catch (error: any) {
    throw error.response?.data || "Failed to fetch licenses";
  }
};

// GET LICENSES BY SCHOOL
export const getLicensesBySchool = async (
  schoolId: string
): Promise<License[]> => {
  try {
    const res = await api.get(`/licenses/school/${schoolId}`);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || "Failed to fetch school licenses";
  }
};

export const checkLicence = async (
  schoolId: string
): Promise<License | null> => {
  try {
    const res = await api.get(`/licenses/check/${schoolId}`);
    return res;
  } catch (error: any) {
    // si 404 ou pas trouvé → retourner null
    return null;
  }
};

// GET ACTIVE LICENSE (IMPORTANT)
export const getActiveLicense = async (
  schoolId: string
): Promise<License | null> => {
  try {
    const res = await api.get(`/licenses/school/${schoolId}`);
    return res.data.find((l: License) => l.status === "ACTIVE") || null;
  } catch (error: any) {
    // si 404 ou pas trouvé → retourner null
    return null;
  }
};

// CREATE LICENSE
export const createLicense = async (data: any): Promise<License> => {
  try {
    const res = await api.post("/licenses/create", data);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || "Error creating license";
  }
};

// UPDATE / RENEW LICENSE
export const updateLicense = async (
  licenseId: string,
  data: any
): Promise<License> => {
  try {
    const res = await api.patch(`/licenses/school/edit/${licenseId}`, data);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || "Error updating license";
  }
};