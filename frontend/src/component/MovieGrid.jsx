import Grid from "@mui/material/Grid";
import MovieCard from "./MovieCard.jsx";

const MovieGrid = ({ movies }) => {
  return (
    <Grid container spacing={3}>
      {movies.map((movie,i) => (
        <Grid
          
          key={movie.id || i} 
          xs={12} // mobile: 1 per row
          sm={6} // tablet: 2 per row
          md={4} // small laptop: 3
          lg={3} // desktop: 4
          xl={2.4} // wide screen: 5 (MUI allows decimals)
        >
          <MovieCard  movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieGrid;
