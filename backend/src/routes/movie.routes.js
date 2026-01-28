import express from "express";
import { auth,isAdmin } from "../middleware/auth.middleware.js";
import {sortMoviesController,updateMoviesController,deleteMoviesController,createMoviesController, searchMoviesController} from '../controller/movie.controller.js'
const router = express();

// public routes
router.get("/", sortMoviesController);
router.get("/sort", searchMoviesController);


// admin routes
router.post("/", auth, isAdmin, createMoviesController);
router.delete("/:id", auth, isAdmin, deleteMoviesController);
router.put("/:id", auth, isAdmin, updateMoviesController);

export default router;
