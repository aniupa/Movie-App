import express from "express";
import {
  registerUserController,
  loginUserController,
  logout
} from "../controller/auth.controller.js";
const router = express.Router();

router.post("/user/register", registerUserController);
router.post("/user/login", loginUserController);
router.get("/logout", logout);

export default router;
