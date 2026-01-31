import express from "express";
import { auth,isAdmin } from "../middleware/auth.middleware.js";
import {getMovieByIdController,getAllMoviesController,sortMoviesController,updateMoviesController,deleteMoviesController,createMoviesController, searchMoviesController} from '../controller/movie.controller.js'
import { validateObjectId } from "../middleware/validation.middleware.js";
const router = express();

// public routes
router.get("/", getAllMoviesController);
router.get('/search',searchMoviesController);
router.get("/sort", sortMoviesController);
router.get("/:id",validateObjectId, getMovieByIdController);


// admin routes
router.post("/", auth, isAdmin, createMoviesController);
router.delete("/:id", auth, isAdmin, deleteMoviesController);
router.put("/:id", auth, isAdmin, updateMoviesController);

export default router;
