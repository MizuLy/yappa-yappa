const {
  getNotifications,
  getUnreadNotificationCount,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
} = require("../services/notification.service");

const parsePositiveInt = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

const getNotificationsHandler = async (req, res, next) => {
  try {
    const result = await getNotifications({
      userId: req.user.id,
      page: parsePositiveInt(req.query.page, 1),
      limit: Math.min(parsePositiveInt(req.query.limit, 20), 100),
      unreadOnly: req.query.unreadOnly === "true",
    });
    res.status(200).json({ status: "success", data: result });
  } catch (err) { next(err); }
};

const getUnreadNotificationCountHandler = async (req, res, next) => {
  try {
    const count = await getUnreadNotificationCount({ userId: req.user.id });
    res.status(200).json({ status: "success", data: { count } });
  } catch (err) { next(err); }
};

const markNotificationReadHandler = async (req, res, next) => {
  try {
    const notification = await markNotificationRead({ id: req.params.id, userId: req.user.id });
    res.status(200).json({ status: "success", data: notification });
  } catch (err) { next(err); }
};

const markAllNotificationsReadHandler = async (req, res, next) => {
  try {
    const result = await markAllNotificationsRead({ userId: req.user.id });
    res.status(200).json({ status: "success", data: { updated: result.count } });
  } catch (err) { next(err); }
};

const deleteNotificationHandler = async (req, res, next) => {
  try {
    const result = await deleteNotification({ id: req.params.id, userId: req.user.id });
    res.status(200).json({ status: "success", data: result });
  } catch (err) { next(err); }
};

module.exports = {
  getNotificationsHandler,
  getUnreadNotificationCountHandler,
  markNotificationReadHandler,
  markAllNotificationsReadHandler,
  deleteNotificationHandler,
};
