import app from "./src/app.js";
import { connectDB } from "./src/configs/db/db.js";
connectDB();


app.listen(3000, () => {
  console.log("server is running on port 3000");
});
