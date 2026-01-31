import { movieModel } from "../models/movie.model.js";
import { getPagination } from "../utlis/pagination.js";
import { buildMovieFilter } from "../utlis/queryHelpers.js";

export const searchMoviesService = async ({
  search,
  page,
  limit,
  order,
  filters = {},
}) => {
  
  const trimmedSearch=search?.trim();
  const {  safePage,safeLimit, skip } = getPagination(page, limit);


  const filter = buildMovieFilter({ search, filters });
  

  const safeOrder = order === true || order === "true" ? 1 : -1;


  let query = movieModel.find(
    filter,
    trimmedSearch ? { score: { $meta: "textScore" } } : {},
  );

  if (!trimmedSearch) {
    query = query.collation({ locale: "en", strength: 2 });
  }

  const sortQuery = trimmedSearch
    ? { score: { $meta: "textScore" } }
    : { title: safeOrder };

  const [movies, total] = await Promise.all([
    query.sort(sortQuery).skip(skip).limit(safeLimit).lean(),
    movieModel.countDocuments(filter),
  ]);

  return { movies, total, page: safePage, limit: safeLimit };
};
