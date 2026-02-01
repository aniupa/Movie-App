import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useDispatch, useSelector } from "react-redux";
import { asyncSearchMoviesAction } from "../../redux/actions/movies.action.js";
import { setPage } from "../../redux/features/movieSlice.js";
import { useEffect } from "react";
import { lazy, Suspense } from "react";

const MovieGrid = lazy(() => import("../../component/MovieGrid.jsx"));
const AppPagination = lazy(() => import("../../component/AppPagination.jsx"));

import Header from "../../component/Header.jsx";

export default function Movies() {
  const dispatch = useDispatch();
  const { movieCollection, total, page, limit, filters, searchQuery, order } =
    useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(asyncSearchMoviesAction());
  }, [page, limit, searchQuery, dispatch, filters, order]);

  const handlePageChange = (event, value) => {
    dispatch(setPage(value));

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header />

      {/* Movie List */}
      <Container sx={{ py: 5 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Popular Movies
        </Typography>
        <Suspense>
          <MovieGrid movies={movieCollection} />
          <AppPagination
            page={page}
            count={Math.ceil(total / limit)}
            onChange={handlePageChange}
          />
        </Suspense>
      </Container>
    </>
  );
}
