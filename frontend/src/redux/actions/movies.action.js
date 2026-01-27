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
      params: { search: query },
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