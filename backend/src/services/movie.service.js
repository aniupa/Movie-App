export const searchMoviesService = async ({
  query,
    page = 1,
    limit = 10,
  sortBy = "relevance",
}) => {
    const skip = (page - 1) * limit;

  const filter = {
    isDeleted: false,
  };

  // Add text search only if query exists
  if (query) {
    filter.$text = { $search: query };
  }

  const projection = query ? { score: { $meta: "textScore" } } : {};

  let sort = { createdAt: -1 };

  if (query && sortBy === "relevance") {
    sort = { score: { $meta: "textScore" } };
  } else if (sortBy === "rating") {
    sort = { rating: -1 };
  } else if (sortBy === "releaseDate") {
    sort = { releaseDate: -1 };
  } else if (sortBy === "duration") {
    sort = { duration: -1 };
  } 
  
  
  const movies = await movieModel
    .find(filter, projection)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await movieModel.countDocuments(filter);

  return {
    movies,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};
