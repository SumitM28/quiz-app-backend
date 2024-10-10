import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConnection.js";

// configure env
dotenv.config();

// initialize PORT
const PORT = process.env.PORT || 4500;

// initialize app
const app = express();

// mongodb connection
connectDB();

// test api
app.get("/", (req, res) => {
  res.send({
    success: true,
    message: "API runnin properly...",
  });
});

// error handling using middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "!Something went wrong!";

  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(PORT, async () => {
  console.log("server listening on port " + PORT);
});
