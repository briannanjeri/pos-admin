// src/utils/api/axiosInstance.ts
import { isPublicPath } from "../publicPaths";
import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

interface RetryableRequest extends InternalAxiosRequestConfig {
  _retry?: boolean;
}
// src/utils/api/axiosInstance.ts

 const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  timeout: 30000,
});

// Dedicated refresh client (no interceptors)
const refreshClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  timeout: 30000,
});

// Prevent multiple refresh requests
let refreshPromise: Promise<void> | null = null;

function refreshAccessToken(): Promise<void> {
  if (!refreshPromise) {
    refreshPromise = refreshClient
      .post("users/auth/refresh/")
      .then(() => undefined)
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

const AUTH_ENDPOINTS = [
  "users/auth/login/",
  "users/auth/refresh/",
  "users/auth/logout/",
];

function isAuthEndpoint(url?: string): boolean {
  return !!url && AUTH_ENDPOINTS.some((path) => url.includes(path));
}

api.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequest | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const shouldAttemptRefresh =
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint(originalRequest.url);

    if (!shouldAttemptRefresh) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      await refreshAccessToken();
      return api(originalRequest);
    } catch (refreshError) {
      if (typeof window !== "undefined") {
        try {
          const store = (await import("@/redux/store")).default;
          const { clearAuth } = await import("@/redux/slices/authSlice");
          store.dispatch(clearAuth());
        } catch (reduxError) {
          console.error(
            "Failed to clear auth state after refresh failure",
            reduxError,
          );
        }
console.log("Interceptor redirect check:", {
  pathname: window.location.pathname,
  isPublic: isPublicPath(window.location.pathname),
});

        if (!isPublicPath(window.location.pathname)) {
          window.location.href = "/login";
        }
      }

      return Promise.reject(refreshError);
    }
  },
);
export default api
