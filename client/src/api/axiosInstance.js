// src/api/axiosInstance.js
import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  withCredentials: true,
});

let getAccessToken = () => null; // will be set by AuthProvider
let updateAccessToken = () => {};
let handleAuthFailure = () => {};
let refreshPromise = null;

export const setAccessTokenGetter = (fn) => {
  getAccessToken = fn;
};

export const setAccessTokenUpdater = (fn) => {
  updateAccessToken = fn;
};

export const setAuthFailureHandler = (fn) => {
  handleAuthFailure = fn;
};

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isRefreshRequest = originalRequest?.url?.includes("/auth/refresh");
    const isPublicAuthRequest =
      originalRequest?.url?.includes("/auth/login") ||
      originalRequest?.url?.includes("/auth/register") ||
      originalRequest?.url?.includes("/otps/");

    if (
      error.response?.status !== 401 ||
      originalRequest?._retry ||
      isRefreshRequest ||
      isPublicAuthRequest
    ) {
      if (error.response?.status === 401 && isRefreshRequest) {
        handleAuthFailure();
      }
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      refreshPromise ??= api
        .post("/auth/refresh")
        .then((response) => {
          const nextToken = response.data?.data?.accessToken;
          if (!nextToken) throw new Error("Refresh response did not include an access token");
          updateAccessToken(nextToken);
          return nextToken;
        })
        .finally(() => {
          refreshPromise = null;
        });

      const nextToken = await refreshPromise;
      originalRequest.headers.Authorization = `Bearer ${nextToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      handleAuthFailure();
      return Promise.reject(refreshError);
    }
  },
);

export default api;
