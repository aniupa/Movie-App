// Safely convert query values to numbers
export const toNumber = (val) => {
  if (val === undefined || val === null || val === "") return undefined;
  const num = Number(val);
  return Number.isNaN(num) ? undefined : num;
};

// Add range filter like { $gte, $lte }
export const addRangeFilter = (filter, field, from, to) => {
  if (from === undefined && to === undefined) return;

  filter[field] = {};
  if (from !== undefined) filter[field].$gte = from;
  if (to !== undefined) filter[field].$lte = to;
};

// Build complete movie filter
export const buildMovieFilter = ({ search, filters = {} }) => {
  const filter = {}; 
  const trimmedSearch=search?.trim();

  if (trimmedSearch) {
    filter.$text = { $search: trimmedSearch };
  }

  const yearFrom = toNumber(filters.yearFrom);
  const yearTo = toNumber(filters.yearTo);
  const ratingFrom = toNumber(filters.ratingFrom);
  const ratingTo = toNumber(filters.ratingTo);
  const durationFrom = toNumber(filters.durationFrom);
  const durationTo = toNumber(filters.durationTo);

  addRangeFilter(filter, "releaseYear", yearFrom, yearTo);
  addRangeFilter(filter, "rating", ratingFrom, ratingTo);
  addRangeFilter(filter, "duration", durationFrom, durationTo);

  return filter;
};
