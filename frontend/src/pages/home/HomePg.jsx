import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import { useDispatch, useSelector } from "react-redux";
import { asyncLoadMoviesAction } from "../../redux/actions/movies.action.js";
import {useState,useMemo, useEffect } from "react";

import MovieGrid from "../../component/MovieGrid.jsx";
import AppPagination from "../../component/AppPagination.jsx";

export default function Movies() {
  const dispatch = useDispatch();
  const {movieCollection, total} = useSelector((state) => state.movies);

  const [page, setPage] = useState(1);
const limit = 5;


  useEffect(() => {
    dispatch(asyncLoadMoviesAction({page:page,limit:limit}));
    
  }, [page, dispatch]);

const handlePageChange = (event, value) => {
  setPage(value);
  
  window.scrollTo({ top: 0, behavior: "smooth" });
};
 

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          height: 300,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1524985069026-dd778a71c7b4)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Box sx={{ background: "rgba(0,0,0,0.6)", p: 4, borderRadius: 2 }}>
          <Typography variant="h3" fontWeight="bold">
            Unlimited Movies, TV Shows & More
          </Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            Watch anywhere. Cancel anytime.
          </Typography>
        </Box>
      </Box>

      {/* Movie List */}
      <Container sx={{ py: 5 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Popular Movies
        </Typography>
        <MovieGrid movies={movieCollection} />
        <AppPagination
          page={page}
          count={Math.ceil(total / limit)}
          onChange={handlePageChange}
        />
      </Container>
    </>
  );
}
