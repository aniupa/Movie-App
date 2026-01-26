import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import movieRoutes from "./routes/movie.routes.js";
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware.js";
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
// app.get("/", (req, res) => {
//   res.send("hello world ");
// });
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

app.use(errorHandler);
export default app;
