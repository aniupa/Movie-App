import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { userModel } from "../models/user.model.js";
dotenv.config();

export const auth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id)
      .select("-password -createdAt -updatedAt -__v") 
      .lean(); 
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized: Invalid or expired token",
    });
  }
};

export const isAdmin = (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "unauthorized. Admin only" });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Admin middleware error",
    });
  }
};
