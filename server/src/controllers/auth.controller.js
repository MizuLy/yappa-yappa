const {
  refreshAccessToken,
  registerUser,
  loginUser,
} = require("../services/auth.service");

const refresh = async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken;
    const newAccessToken = await refreshAccessToken(token);
    res
      .status(200)
      .json({ status: "success", data: { accessToken: newAccessToken } });
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await registerUser({ name, email, password });

    res.status(201).json({ status: "success", data: user });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken } = await loginUser({ email, password }, res);

    res.status(200).json({ status: "success", data: { user, accessToken } });
  } catch (err) {
    next(err);
  }
};

const logout = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? "none" : "lax",
    sameSite: "strict",
  });
  res.status(200).json({ status: "success", message: "Logged out" });
};

module.exports = { register, login, refresh, logout };
