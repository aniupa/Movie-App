// const Movie = require("../models/movie.model");
import { movieModel } from "../models/movie.model.js";
// Get all movies
export const getAllMoviesController = async (req, res) => {
  try {
    const movies = await movieModel.find();
    res.status(200).json({ success: true, data: movies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Sort movies
export const sortMoviesController = async (req, res) => {
  try {
    const { sortBy = "createdAt", order = -1 } = req.query;
    const movies = await movieModel.find().sort({ [sortBy]: order });
    res.status(200).json({ success: true, data: movies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Search movies
export const searchMoviesController = async (req, res) => {
  try {
    const { query } = req.query;
    const movies = await movieModel.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json({ success: true, data: movies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get movie by ID
export const getMovieByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await movieModel.findById(id);
    if (!movie) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    }
    res.status(200).json({ success: true, data: movie });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create movie
export const createMoviesController = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    const { imgUrl, duration, releaseDate, rating, description, title } =
      req.body;
    await movieModel.create({
      imgUrl,
      duration,
      releaseDate,
      rating,
      description,
      title,
    });
    res.status(201).json({ success: true, data: movie });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update movie
export const updateMoviesController = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await movieModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!movie) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    }
    res.status(200).json({ success: true, data: movie });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete movie
export const deleteMoviesController = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await movieModel.findByIdAndDelete(id);
    if (!movie) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

