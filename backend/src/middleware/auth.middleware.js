import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { userModel } from "../models/user.model.js";
import { ApiError } from "../utlis/ApiError.js";
dotenv.config();

export const auth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      throw new ApiError(401, 'unauthorized: No token provided" ');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel
      .findById(decoded.id)
      .select("-password -createdAt -updatedAt -__v")
      .lean();
    if (!user) {
      throw new ApiError(401, "Unauthorized: User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(new ApiError(401, "Invalid token."));
    }
    return next(new ApiError(401, "Unauthorized access"));
  }
};

export const isCurrentUser = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel
      .findById(decoded.id)
      .select("-password -createdAt -updatedAt -__v")
      .lean();
    if (user) {
      req.user = user;
    }

    next();
  } catch {
    next();
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
    next(error);
  }
};
