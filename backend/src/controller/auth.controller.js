import { userModel } from "../models/user.model.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookies from "cookie-parser";

dotenv.config();


const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
};

export async function registerUserController(req, res) {
  try {
    const { username, email, password } = req.body;

    const isUserExists = await userModel.findOne({ email });
    if (isUserExists) {
      return res.status(400).json({ message: "user already exists" });
    }
let role='user';
    if (email === process.env.ADMIN_EMAIL) {
       role = "admin";
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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
    res.status(500).json({ message: error.message });
  }
}

export async function loginUserController(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");

    if (!user)
      return res.status(400).json({ message: "invalid email or password" });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "invalid email or password" });
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
    res.status(500).json({ message: error.message });
  }

  
}

export async function logout(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: " logged out  successfully",
  });
}

