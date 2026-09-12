import api from "./axiosInstance";

export const likePost = async (postId) => {
  const res = await api.post(`/posts/${postId}/like`);
  return res.data;
};

export const unlikePost = async (postId) => {
  const res = await api.delete(`/posts/${postId}/like`);
  return res.data;
};

export const getLikesByPost = async (postId) => {
  const res = await api.get(`/posts/${postId}/likes`);
  return res.data;
};
