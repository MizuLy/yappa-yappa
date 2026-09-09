const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const {
  getNotificationsHandler,
  getUnreadNotificationCountHandler,
  markNotificationReadHandler,
  markAllNotificationsReadHandler,
  deleteNotificationHandler,
} = require("../controllers/notification.controller");

const router = express.Router();
router.use(verifyToken);
router.get("/unread-count", getUnreadNotificationCountHandler);
router.get("/", getNotificationsHandler);
router.patch("/read-all", markAllNotificationsReadHandler);
router.patch("/:id/read", markNotificationReadHandler);
router.delete("/:id", deleteNotificationHandler);

module.exports = router;
