import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import movieRoutes from "./routes/movie.routes.js";
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware.js";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
console.log("🌍 FRONTEND_URL from ENV:", process.env.FRONTEND_URL);

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  process.env.FRONTEND_URL, // your production frontend
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser tools (Postman, curl)
      if (!origin) return callback(null, true);

      // Allow localhost in dev
      if (
        origin.startsWith("http://localhost:") ||
        origin.startsWith("http://127.0.0.1:")
      ) {
        return callback(null, true);
      }

      // Allow your production frontend
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow Vercel preview deployments
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      return callback(null, false); // Block silently without crashing
    },
    credentials: true,
  }),
);
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

app.use(errorHandler);
export default app;
