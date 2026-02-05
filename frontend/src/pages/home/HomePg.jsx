

import { useDispatch, useSelector } from "react-redux";
import { asyncSearchMoviesAction } from "../../redux/actions/movies.action.js";
import { setPage } from "../../redux/features/movieSlice.js";
import { useEffect } from "react";
import { lazy, Suspense } from "react";

const MovieGrid = lazy(() => import("../../component/MovieGrid.jsx"));
const AppPagination = lazy(() => import("../../component/AppPagination.jsx"));

import Header from "../../component/header/Header.jsx";
import "./HomePg.css";
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
      <div className="container">
        <span style={{ textAlign: "left",width:'100%' ,padding:'var(--padding-sm)' }}>
          <h5>Popular Movies</h5>
        </span>
        <Suspense>
          <MovieGrid movies={movieCollection} />
          <AppPagination
            page={page}
            count={Math.ceil(total / limit)}
            onChange={handlePageChange}
            
          />
        </Suspense>
      </div>
    </>
  );
}
