// const Movie = require("../models/movie.model");
import { movieModel } from "../models/movie.model.js";
import { searchMoviesService } from "../services/movie.service.js";
import { ApiError } from "../utlis/ApiError.js";

//all users
const SORTABLE_FIELDS = [
  "title",
  "rating",
  "releaseDate",
  "duration",
  "createdAt",
];
// Get all movies
export const getAllMoviesController = async (req, res,next) => {
  try {
    const movies = await movieModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: movies });
  } catch (error) {
    next(error)
  }
};

// Sort movies
export const sortMoviesController = async (req, res,next) => {
  try {
    const SORTABLE_FIELDS = [
      "title",
      "rating",
      "releaseDate",
      "duration",
      "createdAt",
    ];
    //pagination
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);
    const skip = (page - 1) * limit;

    // Sorting
    const sortBy = SORTABLE_FIELDS.includes(req.query.sortBy)
      ? req.query.sortBy
      : "rating";

    const order = req.query.order === "asc" ? 1 : -1;
    //filtering

    const filter = {};

    if (req.query.title) {
      filter.title = { $regex: req.query.title, $options: "i" };
    }

    if (req.query.rating) {
      filter.rating = { $gte: Number(req.query.rating) };
    }

    if (req.query.releaseDate) {
      filter.releaseDate = { $gte: new Date(req.query.releaseDate) };
    }

    if (req.query.duration) {
      filter.duration = { $lte: Number(req.query.duration) };
    }

    const [movies, total] = await Promise.all([
      movieModel
        .find()
        .sort({ [sortBy]: order })
        .skip(skip)
        .limit(limit)
        .lean(),
      movieModel.countDocuments(filter),
    ]);
    res.status(200).json({
      success: true,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: movies,
    });
  } catch (error) {
    next(error);
  }
};

// Search movies
export const searchMoviesController = async (req, res) => {
  try {
    // Pagination
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Number(req.query.limit) || 10, 50);
    const skip = (page - 1) * limit;

    const search = req.query.search?.trim();
    if (!search) {
      throw new ApiError(400, "Search query is required");
    }

    // Sorting
    const sortBy = SORTABLE_FIELDS.includes(req.query.sortBy)
      ? req.query.sortBy
      : "rating";

    const order = req.query.order === "asc" ? 1 : -1;

    // Build filter (TEXT SEARCH)
    const filter = {
      $text: { $search: search },
    };

    // Parallel queries (scalable)
    const [movies, total] = await Promise.all([
      movieModel
        .find(filter, { score: { $meta: "textScore" } })
        .sort({ score: { $meta: "textScore" }, [sortBy]: order })
        .skip(skip)
        .limit(limit)
        .lean(),

      movieModel.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: movies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get movie by ID
export const getMovieByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await movieModel.findById(id);
    if (!movie) {
      throw new ApiError(404, "Movie not found");
    }
    res.status(200).json({ success: true, data: movie });
  } catch (error) {
    next(error);
    // res.status(500).json({ success: false, message: error.message });
  }
};

//admin only

// Create movie
export const createMoviesController = async (req, res, next) => {
  try {
    const { imgUrl, duration, releaseDate, rating, description, title } =
      req.body;
    const movie = await movieModel.create({
      imgUrl,
      duration,
      releaseDate,
      rating,
      description,
      title,
    });
    res.status(201).json({ success: true, data: movie });
  } catch (error) {
    next(error);
  }
};

// Update movie
export const updateMoviesController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await movieModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!movie) {
      throw new ApiError(404, "Movie not found");
    }
    res.status(200).json({ success: true, data: movie });
  } catch (error) {
    next(error);
  }
};

// Delete movie
export const deleteMoviesController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await movieModel.findByIdAndDelete(id);
    if (!movie) {
      throw new ApiError(404, "Movie not found");
    }
    res
      .status(200)
      .json({ success: true, message: "Movie deleted successfully" });
  } catch (error) {
    next(error);
  }
};
