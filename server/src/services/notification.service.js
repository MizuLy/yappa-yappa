const { prisma } = require("../config/prisma");

const createNotification = async ({ userId, actorId, type, postId }) => {
  if (userId === actorId) return null;

  return prisma.notification.create({
    data: { userId, actorId, type, postId },
  });
};

const getNotifications = async ({ userId, page = 1, limit = 20, unreadOnly = false }) => {
  const where = { userId, ...(unreadOnly ? { isRead: false } : {}) };
  const [notifications, total, unreadCount] = await Promise.all([
    prisma.notification.findMany({
      where,
      include: {
        actor: { select: { id: true, name: true, imageUrl: true } },
        post: { select: { id: true, content: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.notification.count({ where }),
    prisma.notification.count({ where: { userId, isRead: false } }),
  ]);

  return {
    notifications,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    unreadCount,
  };
};

const getUnreadNotificationCount = ({ userId }) =>
  prisma.notification.count({ where: { userId, isRead: false } });

const markNotificationRead = async ({ id, userId }) => {
  const notification = await prisma.notification.findFirst({ where: { id, userId } });
  if (!notification) {
    const error = new Error("Notification not found");
    error.statusCode = 404;
    throw error;
  }
  return prisma.notification.update({ where: { id }, data: { isRead: true } });
};

const markAllNotificationsRead = ({ userId }) =>
  prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  });

const deleteNotification = async ({ id, userId }) => {
  const result = await prisma.notification.deleteMany({ where: { id, userId } });
  if (result.count === 0) {
    const error = new Error("Notification not found");
    error.statusCode = 404;
    throw error;
  }
  return { message: "Notification deleted" };
};

module.exports = {
  createNotification,
  getNotifications,
  getUnreadNotificationCount,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
};
