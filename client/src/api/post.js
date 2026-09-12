import api from "./axiosInstance";

export const postFeed = async (data) => {
  const res = await api.post("/posts", data);
  return res.data;
};

export const getFeeds = async () => {
  const res = await api.get("/posts");
  return res.data;
};

export const getFeedById = async (id) => {
  const res = await api.get(`/posts/${id}`);
  return res.data;
};

export const editFeed = async (id, data) => {
  const res = await api.put(`/posts/${id}`, data);
  return res.data;
};

export const deleteFeed = async (id) => {
  const res = await api.delete(`/posts/${id}`);
  return res.data;
};
