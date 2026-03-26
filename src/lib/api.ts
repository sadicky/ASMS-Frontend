import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

// 🔥 Étendre le type pour éviter l'erreur _retry
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/* --------------------------
 REQUEST INTERCEPTOR
--------------------------- */
api.interceptors.request.use((config: CustomAxiosRequestConfig) => {
  const token = localStorage.getItem("accessToken");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* --------------------------
 RESPONSE INTERCEPTOR
--------------------------- */
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (
      error.response?.status === 401 &&
      !originalRequest?._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const res = await axios.post(
          "http://localhost:3000/api/auth/refresh",
          { refreshToken }
        );

        const { accessToken } = res.data;

        localStorage.setItem("accessToken", accessToken);

        // 🔥 Rejouer la requête
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        return api(originalRequest);

      } catch (err) {
        // 🔥 Logout automatique
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        window.location.href = "/auth";
      }
    }

    return Promise.reject(error);
  }
);

export default api;