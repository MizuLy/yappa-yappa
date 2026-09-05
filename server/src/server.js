// starts the server: loads env vars, connects the DB, calls app.listen()
require("dotenv").config();
const app = require("./app");
const { connectDB, disconnectDB } = require("./config/prisma");

const PORT = process.env.PORT || 6969;

connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`),
  );
});

process.on("SIGINT", async () => {
  await disconnectDB();
  process.exit(0);
});
