import Grid from "@mui/material/Grid";
import MovieCard from "./MovieCard.jsx";

const MovieGrid = ({ movies }) => {
  
  return (
    <Grid container spacing={1}>
      { movies && movies.map((movie, i) => (
        
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </Grid>
  );
};

export default MovieGrid;
