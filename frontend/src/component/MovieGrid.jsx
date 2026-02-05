import MovieCard from "./MovieCard/MovieCard.jsx";

const MovieGrid = ({ movies }) => {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--gutter-sm)",
        width: "100%",
      }}
    >
      {movies &&
        movies.map((movie, i) => <MovieCard key={movie._id} movie={movie} />)}
    </section>
  );
};

export default MovieGrid;
