const express = require("express");
const {
  requestOtpHandler,
  verifyOtpHandler,
} = require("../controllers/otp.controller");

const router = express.Router();

router.post("/request-otp", requestOtpHandler);
router.post("/verify-otp", verifyOtpHandler);

module.exports = router;
