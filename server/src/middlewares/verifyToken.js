const jwt = require("jsonwebtoken");
const { prisma } = require("../config/prisma");

const verifyToken = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({ error: "Not authorized, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isVerified: true,
      },
    });

    if (!user) return res.status(401).json({ error: "User no longer exists" });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Not authorized, token failed" });
  }
};

module.exports = verifyToken;
