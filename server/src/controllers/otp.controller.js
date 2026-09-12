const { requestOtp, verifyOtp } = require("../services/otp.service");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");

const requestOtpHandler = async (req, res, next) => {
  try {
    const { email } = req.body;

    const request = await requestOtp({ email });

    res.status(200).json({ status: "success", data: request });
  } catch (err) {
    next(err);
  }
};

const verifyOtpHandler = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const verify = await verifyOtp({ email, otp });
    const accessToken = generateAccessToken(verify.user.id);
    generateRefreshToken(verify.user.id, res);

    res.status(200).json({
      status: "success",
      data: { ...verify, accessToken },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { requestOtpHandler, verifyOtpHandler };
