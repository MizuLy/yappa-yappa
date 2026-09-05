// configures routes, middlewares, error handling
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");

const authRouter = require("./routes/auth.route");

const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  }),
);
app.use(express.json());
app.use(
  morgan(process.env.NODE_ENV === "production" ? "combined" : "development"),
);
app.use(cookieParser());

// Health
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.get("/", (req, res) => {
  return res.send("hello");
});
app.use("/api/auth", authRouter); // mizu@gmail.com @kdor1234

// Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(err.statusCode ? statusCode : 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

module.exports = app;
