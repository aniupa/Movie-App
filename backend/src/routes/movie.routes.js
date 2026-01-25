import express from "express";
import { isAdmin } from "../middleware/admin.middleware.js";
import { auth } from "../middleware/auth.middleware.js";
import {getAllMoviesController,sortMoviesController,searchMoviesController,getMovieByIdController,updateMoviesController,deleteMoviesController,createMoviesController} from '../controller/movie.controller.js'
const router = express();

// public routes
router.get("/", getAllMoviesController);
router.get("/sorted", sortMoviesController);
router.get("/search", searchMoviesController);
router.get("/:id", getMovieByIdController);

// admin routes
router.post("/", auth, isAdmin, createMoviesController);
router.delete("/:id", auth, isAdmin, deleteMoviesController);
router.put("/:id", auth, isAdmin, updateMoviesController);

export default router;
