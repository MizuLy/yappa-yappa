const { prisma } = require("../config/prisma");
const sendOtp = require("../utils/sendMail");

const requestOtp = async ({ email }) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const otp = Math.floor(1000 + Math.random() * 9000).toString(); // 4 digits
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await prisma.otp.deleteMany({ where: { userId: user.id } });

  await prisma.otp.create({
    data: { userId: user.id, otp, expiresAt },
  });

  await sendOtp(user.email, otp);

  return { message: "OTP sent to email" };
};

const verifyOtp = async ({ email, otp }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const record = await prisma.otp.findFirst({
    where: { userId: user.id, otp },
  });

  if (!record) {
    const error = new Error("Invalid OTP");
    error.statusCode = 400;
    throw error;
  }

  if (record.expiresAt < new Date()) {
    const error = new Error("OTP expired");
    error.statusCode = 400;
    throw error;
  }

  await prisma.otp.deleteMany({ where: { userId: user.id } });

  await prisma.user.update({
    where: { id: user.id },
    data: { isVerified: true },
  });

  return { message: "OTP verified" };
};

module.exports = { requestOtp, verifyOtp };
