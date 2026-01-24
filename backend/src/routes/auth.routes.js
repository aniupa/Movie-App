import express from "express";
import { registerUserController,loginUserController } from "../controller/auth.controller.js";
const router = express.Router();

router.post("/user/register", registerUserController);
router.get("/user/login", loginUserController);

export default router;
