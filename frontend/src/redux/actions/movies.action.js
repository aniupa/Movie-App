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