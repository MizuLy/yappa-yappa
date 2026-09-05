// configures routes, middlewares, error handling
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");

const healthRouter = require("./routes/health.route");
const authRouter = require("./routes/auth.route");
const postRouter = require("./routes/post.route");

const errorHandler = require("./middlewares/errorHandler");

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
app.use("/api/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

app.use(errorHandler);

module.exports = app;
