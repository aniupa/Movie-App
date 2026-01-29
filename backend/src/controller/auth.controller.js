import { userModel } from "../models/user.model.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApiError } from "../utlis/ApiError.js";

dotenv.config();

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
};

export async function registerUserController(req, res, next) {
  try {
    if (!req.body) {
       throw new ApiError(400, "Invalid request body");
    }
    const { username, email, password } = req.body;
if (!username || !email || !password) {
  throw new ApiError(400, "All fields are required");
    }
    const isUserExists = await userModel.findOne({ email });
    if (isUserExists) {
      throw new ApiError(400, "user already exists");
    }
    let role = "user";
    if (email === process.env.ADMIN_EMAIL) {
      role = "admin";
    }

    const hashedPassword = await bcrypt.hash(password, 4);

    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
      role,
    });
    const token = generateToken(user);
    res.cookie("token", token);
    res.status(201).json({
      success: true,
      message: "user registered successfully",
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(400, "Email already exists");
    }
    next(error);
  }
}

export async function loginUserController(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      throw new ApiError(400, "invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new ApiError(401, "invalid email or password");
    }

    const token = generateToken(user);

    res.cookie("token", token);

    res.status(200).json({
      success: true,
      user: {
        // id: user._id,
        name: user.username,
        email: user.email,
        role: user.role,
      },
      // token,
    });
  } catch (error) {
    next(error);
  }
}

export async function logout(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: " logged out  successfully",
  });
}

export async function currentUserController(req, res, next) {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
}
