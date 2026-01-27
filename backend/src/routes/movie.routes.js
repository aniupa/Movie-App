import express from "express";
import { auth,isAdmin } from "../middleware/auth.middleware.js";
import {searchMoviesController,sortMoviesController,getMovieByIdController,updateMoviesController,deleteMoviesController,createMoviesController} from '../controller/movie.controller.js'
const router = express();

// public routes
router.get("/", searchMoviesController);
router.get("/sort", sortMoviesController);
router.get("/:id", getMovieByIdController);


// admin routes
router.post("/", auth, isAdmin, createMoviesController);
router.delete("/:id", auth, isAdmin, deleteMoviesController);
router.put("/:id", auth, isAdmin, updateMoviesController);

export default router;
