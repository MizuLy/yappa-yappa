const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const {
  changeBioHandler,
  changeNameHandler,
  changeUsernameHandler,
  changeEmailHandler,
  changePasswordHandler,
  changeAvatarHandler,
  getUserProfileHandler,
  getMyProfileHandler,
} = require("../controllers/user.controller");
const uploadAvatar = require("../config/uploadAvatar");

const router = express.Router();

// Update Info
router.patch("/update-bio", verifyToken, changeBioHandler);
router.patch("/update-name", verifyToken, changeNameHandler);
router.patch("/update-username", verifyToken, changeUsernameHandler);
router.patch("/update-email", verifyToken, changeEmailHandler);
router.patch("/update-password", verifyToken, changePasswordHandler);
router.patch(
  "/update-avatar",
  verifyToken,
  uploadAvatar.single("imageUrl"),
  changeAvatarHandler,
);

// Profile
router.get("/me", verifyToken, getMyProfileHandler);
router.get("/:userId", getUserProfileHandler);
