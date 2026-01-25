import { movieModel } from "../models/movie.model.js";
import { getPagination } from "../utlis/pagination.js";
import { SORTABLE_FIELDS } from "../constants/sortableFields.js";

export const searchMoviesService = async ({
  search,
  page,
  limit,
  sortBy,
  order,
}) => {
  const filter = search?.trim() ? { $text: { $search: search } } : {};
const safeOrder = order === "asc" ? 1 : -1;

  const { page: safePage, skip, limit: safeLimit } = getPagination(page, limit);

  const safeSortBy = SORTABLE_FIELDS.includes(sortBy) ? sortBy : "rating";
  const sortQuery = search
    ? {
        score: { $meta: "textScore" },
        [safeSortBy]: safeOrder,
      }
    : { [safeSortBy]: safeOrder };
  
  const [movies, total] = await Promise.all([
    movieModel
      .find(filter,search ? { score: { $meta: "textScore" } }:{})
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
