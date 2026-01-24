import styles from "./css/Home.module.css";

const movies = [
  {
    rank: 1,
    title: "The Shawshank Redemption",
    year: 1994,
    duration: "2h 22m",
    rating: 9.3,
    poster:
      "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmRhMC00ZDI0LWFmNTEtODM1ZmRlYWM2MWFmXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_.jpg",
  },
  {
    rank: 2,
    title: "The Godfather",
    year: 1972,
    duration: "2h 55m",
    rating: 9.2,
    poster:
      "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmYtYTAwZS00ZjQ5LWFmNTEtODM1ZmRlYWM2MWFmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
  },
];

export default function ImdbTop() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>IMDb Top 250 Movies</h1>

      <div className={styles.list}>
        {movies.map((movie) => (
          <div key={movie.rank} className={styles.card}>
            <div className={styles.rank}>#{movie.rank}</div>

            <img
              src={movie.poster}
              alt={movie.title}
              className={styles.poster}
            />

            <div className={styles.details}>
              <h2>{movie.title}</h2>
              <p className={styles.meta}>
                {movie.year} • {movie.duration}
              </p>

              <div className={styles.rating}>
                ⭐ {movie.rating}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
