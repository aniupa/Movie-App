import express from "express";
import {
  registerUserController,
  loginUserController,
  logout,
  currentUserController,
} from "../controller/auth.controller.js";
import {  isCurrentUser } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/user/register", registerUserController);
router.post("/user/login", loginUserController);
router.get("/logout", logout);
router.get("/user/currentUser", isCurrentUser, currentUserController);

export default router;
