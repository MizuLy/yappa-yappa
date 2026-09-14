import api from "./axiosInstance";

export const getNotifications = async (
  page = 1,
  limit = 20,
  unreadOnly = false,
) => {
  const res = await api.get("/notifications", {
    params: { page, limit, unreadOnly },
  });
  return res.data;
};

export const getUnreadNotificationCount = async () => {
  const res = await api.get("/notifications/unread-count");
  return res.data;
};

export const markNotificationRead = async (id) => {
  const res = await api.patch(`/notifications/${id}/read`);
  return res.data;
};

export const markAllNotificationRead = async () => {
  const res = await api.patch("/notifications/read-all");
  return res.data;
};

export const deleteNotification = async (id) => {
  const res = await api.delete(`/notifications/${id}`);
  return res.data;
};
