import { userModel } from "../models/user.model.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

export async function registerUserController(req, res) {
  try {
    const { username, email, password } = req.body;
    const isUserExists = await userModel.findOne({ email });
    if (isUserExists) {
      return res.status(400).json({ message: "user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);
    res.cookie("token", token);
    res.status(201).json({
      message: "user registered successfully",
      user: { _id: user._id, email: user.email, username: user.username },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function loginUserController(req, res) {
  const { token } = req.cookies;
  if (!token) {
    return res.status(400).josn({ message: "unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    const user = await userModel
      .findOne({ _id: decoded.id })
      .select("-password -_v");

    res.status(200).json({ message: "user fetched successfully" });
    // res.send(decoded);
  } catch (error) {
    return res.status(401).json({
      message: "unauthorized invalid token",
    });
  }
}
