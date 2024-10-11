import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/dbConnection.js";
import cors from "cors"

// routers import
import authRoutes from "./routes/authRoute.js";
import quizRoutes from './routes/quizRoutes.js'
import questionRoutes from './routes/questionRoutes.js'

// configure env
dotenv.config();

// initialize PORT
const PORT = process.env.PORT || 4500;

// initialize app
const app = express();

// mongodb connection
connectDB();

// middlewares
app.use(cors({
  origin: '*',   // Replace with the frontend origin
  credentials: true, // Allow credentials (cookies)
}));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/question", questionRoutes);

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
