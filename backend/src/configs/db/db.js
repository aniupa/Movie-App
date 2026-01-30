import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
  maxPoolSize: 100,        // increase pool
  minPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
});
    console.log("connected to DB successfully");
  } catch (error) {
    console.log("db connection failed :: ", error);
  }
}
