import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import movieRoutes from "./routes/movie.routes.js";
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware.js";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";

const allowedOrigins = ["http://localhost:5173", process.env.FRONTEND_URL];
const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Postman / server-to-server

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed for this origin: " + origin));
    },
    credentials: true,
  }),
);

app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

app.use(errorHandler);
export default app;
