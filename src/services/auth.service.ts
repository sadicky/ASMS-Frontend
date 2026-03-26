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
  try {
    await api.post("/auth/logout");
  } catch (e) {
    // même si erreur, on continue le logout côté frontend
  }

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};