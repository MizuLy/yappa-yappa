const express = require("express");
const {
  register,
  login,
  refresh,
  logout,
} = require("../controllers/auth.controller");
const verifyToken = require("../middlewares/verifyToken");
const validateRequest = require("../middlewares/validateRequest");
const { registerSchema, loginSchema } = require("../validators/auth.validator");

const router = express.Router();

router.post("/refresh", refresh);
router.post("/register", validateRequest(registerSchema), register);
router.post("/login", validateRequest(loginSchema), login);
router.post("/logout", verifyToken, logout);

module.exports = router;
