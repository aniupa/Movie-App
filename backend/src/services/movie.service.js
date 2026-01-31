import { movieModel } from "../models/movie.model.js";
import { getPagination } from "../utlis/pagination.js";
import { SORTABLE_FIELDS } from "../constants/sortableFields.js";


export const searchMoviesService = async ({
  search,
  page,
  limit,
  sortBy,
  order,
  filters = {},
}) => {
  const filter = {};

  
  const toNumber = (val) => {
    if (val === undefined || val === null || val === "") return undefined;
    const num = Number(val);
    return Number.isNaN(num) ? undefined : num;
  };

  const yearFrom = toNumber(filters.yearFrom);
  const yearTo = toNumber(filters.yearTo);
  const ratingFrom = toNumber(filters.ratingFrom);
  const ratingTo = toNumber(filters.ratingTo);
  const durationFrom = toNumber(filters.durationFrom);
  const durationTo = toNumber(filters.durationTo);

  const MAX_LIMIT = 20;
limit = Math.min(Number(limit) || 10, MAX_LIMIT);

  // 🔍 Text search
  if (search?.trim()) {
    filter.$text = { $search: search.trim() };
  }

  // 🎬 Release Year filter (assuming year stored as Number)
  if (yearFrom !== undefined || yearTo !== undefined) {
    filter.releaseYear = {
      ...(yearFrom !== undefined && { $gte: yearFrom }),
      ...(yearTo !== undefined && { $lte: yearTo }),
    };
  }

  // ⭐ Rating filter
  if (ratingFrom !== undefined || ratingTo !== undefined) {
    filter.rating = {
      ...(ratingFrom !== undefined && { $gte: ratingFrom }),
      ...(ratingTo !== undefined && { $lte: ratingTo }),
    };
  }

  // ⏱ Duration filter
  if (durationFrom !== undefined || durationTo !== undefined) {
    filter.duration = {
      ...(durationFrom !== undefined && { $gte: durationFrom }),
      ...(durationTo !== undefined && { $lte: durationTo }),
    };
  }

  const safeOrder = order === "asc" ? 1 : -1;
  const { page: safePage, skip, limit: safeLimit } = getPagination(page, limit);

  const safeSortBy = SORTABLE_FIELDS.includes(sortBy) ? sortBy : "rating";

  const sortQuery = search
    ? { score: { $meta: "textScore" }}
    : { [safeSortBy]: safeOrder };

  const [movies, total] = await Promise.all([
    movieModel
      .find(filter, search ? { score: { $meta: "textScore" } } : {})
      .sort(sortQuery)
      .skip(skip)
      .limit(safeLimit)
      .lean(),
    movieModel.countDocuments(filter),
  ]);

  return {
    movies,
    total,
    page: safePage,
    limit: safeLimit,
  };
};
