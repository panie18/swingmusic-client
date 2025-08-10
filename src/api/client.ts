import axios from "axios";
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from "@utils/tokenStorage";

function ensureTrailingSlash(url?: string | null) {
  if (!url) return "";
  return url.endsWith("/") ? url : url + "/";
}

const baseURL = ensureTrailingSlash(process.env.EXPO_PUBLIC_API_URL);

export const api = axios.create({
  baseURL,
  timeout: 15000
});

let isRefreshing = false;
let pendingRequests: Array<() => void> = [];

api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers = { ...(config.headers || {}), Authorization: `Bearer ${token}` };
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error?.config;
    if (!original || original._retry) return Promise.reject(error);
    if (error?.response?.status === 401) {
      if (isRefreshing) {
        await new Promise<void>((resolve) => pendingRequests.push(resolve));
        return api(original);
      }
      original._retry = true;
      isRefreshing = true;
      try {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token");
        const { data } = await axios.post(
          ensureTrailingSlash(api.defaults.baseURL) + "auth/refresh",
          null,
          { headers: { Authorization: `Bearer ${refreshToken}` }, timeout: 15000 }
        );
        const { accessToken, refreshToken: newRefresh, maxAge } = data as { accessToken: string; refreshToken: string; maxAge?: number };
        await setTokens(accessToken, newRefresh, maxAge);
        pendingRequests.forEach((r) => r());
        pendingRequests = [];
        return api(original);
      } catch (e) {
        await clearTokens();
        pendingRequests.forEach((r) => r());
        pendingRequests = [];
        throw e;
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);