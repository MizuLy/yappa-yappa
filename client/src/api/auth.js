import api from "./axiosInstance";

export const refresh = async (data) => {
  const res = await api.post("/auth/refresh", data);
  return res.data;
};
export const login = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};
export const register = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};
export const logout = async (data) => {
  const res = await api.post("/auth/logout", data);
  return res.data;
};
