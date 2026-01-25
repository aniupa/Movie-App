export const getPagination = (page, limit) => {
  const safePage =
    Number(page) && Number(page) > 0
      ? Number(page)
      : 1;

  const safeLimit =
    Number(limit) && Number(limit) > 0
      ? Math.min(Number(limit), 50)
      : 10;

  return {
    page: safePage,
    limit: safeLimit,
    skip: (safePage - 1) * safeLimit
  };
};
