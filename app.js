const express = require("express");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const cookieParser = require("cookie-parser");
const { errorMiddleware } = require("./middlewares/errorm");
const app = express();
const cors = require("cors");

require("dotenv").config({ path: "./database/config.env" });

app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTENDURL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
// setting router below
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskRoutes);

// middlewares
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

// using error middleware
app.use(errorMiddleware);
module.exports = app;
