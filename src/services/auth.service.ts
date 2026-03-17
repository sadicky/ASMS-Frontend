// import api from "@/lib/api";

// export interface AuthResponse {
//   accessToken: string;
//   refreshToken: string;
// }

// export interface LoginDto {
//   email: string;
//   password: string;
// }

// export const login = async (data: LoginDto): Promise<AuthResponse> => {
//   const response = await api.post<AuthResponse>("/auth/login", data);
//   return response.data;
// };

// export const logout = async (): Promise<{ message: string }> => {
//   const token = localStorage.getItem("accessToken");

//   const response = await api.post(
//     "/auth/logout",
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   return response.data;
// };

// export const refreshToken = async (
//   refreshToken: string
// ): Promise<AuthResponse> => {
//   const response = await api.post<AuthResponse>("/auth/refresh", {
//     refreshToken,
//   });

//   return response.data;
// };

import api from "@/lib/api";

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export const login = async (data: LoginDto): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", data);
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};