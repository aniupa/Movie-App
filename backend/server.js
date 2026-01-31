import app from "./src/app.js";
import { connectDB } from "./src/configs/db/db.js";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 4000;
connectDB();

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
