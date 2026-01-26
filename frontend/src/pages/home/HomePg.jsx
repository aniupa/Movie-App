import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import CardMedia from "@mui/material/CardMedia";
// import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import MovieIcon from "@mui/icons-material/Movie";

import { useDispatch,useSelector } from "react-redux";
import { asyncLoadMoviesAction } from "../../redux/actions/movies.action.js";
import { useEffect } from "react";

import MovieCard from "../../component/MovieCard.jsx";
import MovieGrid from "../../component/MovieGrid.jsx";


export default function Movies() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movieCollection);
  
  useEffect(() => {
    dispatch(asyncLoadMoviesAction());
  }, []);


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
          Trending Movies
        </Typography>
        <MovieGrid movies={movies} />
        
      </Container>
    </>
  )
}
