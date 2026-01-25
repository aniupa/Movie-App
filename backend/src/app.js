import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import movieRoutes from './routes/movie.routes.js'
const app = express();

app.use(express.json());
app.use(cookieParser());
// app.get("/", (req, res) => {
//   res.send("hello world ");
// });
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

export default app;
