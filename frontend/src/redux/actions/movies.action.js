import axios from "../../utlits/axios";
import { loadMovie } from "../features/movieSlice";

export const asyncLoadMoviesAction = () => async (dispatch) => {
  try {
    const res = await axios.get("/movies/", {
      params: {
        page: 1,
        limit: 3,
      },
    });

    dispatch(loadMovie(res.data.data));
  } catch (error) {
    console.log("Error fetching movies:", error);
  }
};
