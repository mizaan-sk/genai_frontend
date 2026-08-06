import axios from "axios";

const TOKEN_KEY = "token";

/**
 * The auth cookie only survives when the api is same-site with the app.
 * In production the app is on vercel.app and the api on onrender.com, so the
 * cookie is third-party and browsers (Incognito, Safari) drop it. We keep the
 * cookie for local dev and also carry the token ourselves as a Bearer header,
 * which works everywhere.
 */
export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    // private-mode storage can throw — treat it as signed out
    return null;
  }
};

export const setToken = (token) => {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // nothing we can do; the request-scoped cookie may still work
  }
};

export const clearToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    // already gone as far as we can tell
  }
};

// create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000", // backend url
  withCredentials: true, // send cookies with request
});

// attach the token to every request that has one
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
