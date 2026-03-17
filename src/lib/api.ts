// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:3000/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default api;


import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/* --------------------------
 REQUEST INTERCEPTOR
 attach access token
--------------------------- */

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* --------------------------
 RESPONSE INTERCEPTOR
 refresh token automatically
--------------------------- */

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const response = await axios.post(
          "http://localhost:3000/api/auth/refresh",
          { refreshToken }
        );

        const { accessToken } = response.data;

        localStorage.setItem("accessToken", accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return api(originalRequest);

      } catch (err) {

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        window.location.href = "/auth";

      }
    }

    return Promise.reject(error);
  }
);

export default api;


// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:3000/api",
//   withCredentials: true
// });

// // ajouter accessToken automatiquement
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// // gérer erreurs NestJS
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {

//     if (error.response?.status === 401) {
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//       window.location.href = "/login";
//     }

//     return Promise.reject(error.response?.data);
//   }
// );

// export default api;