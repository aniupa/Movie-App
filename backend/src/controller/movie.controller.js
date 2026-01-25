import { movieModel } from "../models/movie.model.js";
import { searchMoviesService } from "../services/movie.service.js";
import { ApiError } from "../utlis/ApiError.js";

// Search movies , Get all movies, sort movies
export const searchMoviesController = async (req, res, next) => {
  try {
    const { search, page, limit, sortBy, order } = req.query;

    const result = await searchMoviesService({
      search,
      page,
      limit,
      sortBy,
      order,
    });

    res.status(200).json({
      success: true,
      page: result.page,
      limit: result.limit,
      total: result.total,
      totalPages: Math.ceil(result.total / result.limit),
      data: result.movies,
    });
  } catch (error) {
    next(error);
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
