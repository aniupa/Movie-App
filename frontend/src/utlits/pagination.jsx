
import { useState } from 'react'
const pagination = (movies) => {
  const [movies, movies] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 10;
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentPageMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    return (
    <>pagination</>
  )
}

export default pagination