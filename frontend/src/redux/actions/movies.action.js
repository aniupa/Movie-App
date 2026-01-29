import { toast } from "react-toastify";
import axios from "../../utlits/axios";
import { loadMovie } from "../features/movieSlice";

export const asyncLoadMoviesAction = (data) => async (dispatch) => {
  try {

    const res = await axios.get("/movies/", {
      params: {
        page: data?.page ,
        limit: data?.limit ,
      },
    });


    dispatch(
      loadMovie({
        movieCollection: res?.data?.data,
        total: res?.data?.total ,
        page: res?.data?.page ,
        limit: res?.data?.limit ,
      }),
    );
  } catch (error) {
    console.log("Error fetching movies:", error);
  }
};

export const asyncSearchMoviesAction = (query) => async (dispatch) => {
  try {
    
    const res = await axios.get("/movies/", {
      params: { page: query.page, limit: query.limit, search: query.search },
    });
    

    dispatch(
      loadMovie({
        movieCollection: res?.data?.data,
        total: res?.data?.total,
        page: res?.data?.page,
        limit: res?.data?.limit,
      }),
    );
  } catch (error) {
    console.log("Error searching movies:", error);
  }
};



export const asyncSortMoviesAction = (query) => async (dispatch) => {
  try {
    const res = await axios.get("/movies/sort", {
      params: { sortBy: query.sortBy, order: query.order, ...query },
    });
    
    

    dispatch(
      loadMovie({
        movieCollection: res?.data?.data,
        total: res?.data?.total,
        page: res?.data?.page,
        limit: res?.data?.limit,
      }),
    );
  } catch (error) {
    console.log("Error filtering movies by genre:", error);
  }
};

//admin

export const asyncCreateMovieAction = (data) => async () => {
  try {
    await axios.post("/movies", data, { withCredentials: true });
    
    toast.success("Movie created successfully 🎬");
  } catch (error) {
    console.error(error);
    
  }
};

export const asyncDeleteMovieAction = (movieId) => async (dispatch) => {
  try {
    await axios.delete(`/movies/${movieId}`, { withCredentials: true });
    // alert("Movie deleted successfully 🗑️");
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Failed to delete movie");
  }
};

export const asyncUpdateMovieAction = (movieId, data) => async (dispatch) => {
  try {
    await axios.put(`/movies/${movieId}`, data, { withCredentials: true });
    // alert("Movie updated successfully ✏️");
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Failed to update movie");
  }
};