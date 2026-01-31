import { toast } from "react-toastify";
import axios from "../../utlits/axios";
import { loadMovie, updateMovie } from "../features/movieSlice";


export const asyncLoadMoviesAction = (data) => async (dispatch) => {
  try {
    
    const res = await axios.get("/movies/", {
      params: {
        page: data?.page,
        limit: data?.limit,
      },
    });

    dispatch(
      loadMovie({
        movieCollection: res?.data?.movies,
        total: res?.data?.total,
        page: res?.data?.page,
        limit: res?.data?.limit,
      }),
    );
  } catch (error) {
    console.log("Error fetching movies:", error);
  }
};



export const asyncSearchMoviesAction = () => async (dispatch,getState) => {
  try {
    const state=getState();
     const {searchQuery,order,page,limit,filters}=state.movies;
    
    
    
    const res = await axios.get("/movies/search", {
      params: { search:searchQuery,order:order,page:page,limit:limit ,...filters},
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

export const asyncSortMoviesAction = () => async (dispatch,getState) => {
  try {
    const state=getState();
    const {searchQuery,order,page,limit,filters}=state.movies;
    
    
    
    const res = await axios.get("/movies/sort", {
      params: { search:searchQuery,order:order,page:page,limit:limit ,...filters},
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
export const asyncLoadMovieByIdAction = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/movies/${id}`);
  

    dispatch(
      updateMovie({
        selectedMovie: res?.data,
      }),
    );
  } catch (error) {
    console.log("Error fetching movie by ID:", error);
  }
};
export const asyncCreateMovieAction = (data) => async () => {
  try {
    await axios.post("/movies", data, { withCredentials: true });

    toast.success("Movie created successfully 🎬");
  } catch (error) {
    console.error(error);
  }
};

export const asyncDeleteMovieAction = (data) => async (dispatch) => {
  try {
    await axios.delete(`/movies/${data.id}`, { withCredentials: true });

    dispatch(asyncLoadMoviesAction({ page: data.page, limit: data.limit }));
    toast.success("Movie deleted successfully ");
  } catch (error) {
    console.error(error);
  }
};

export const asyncUpdateMovieAction =
  ({ id, data }) =>
  async () => {
    try {
      await axios.put(`/movies/${id}`, data, { withCredentials: true });
      

      toast.success("updated successfully");
    } catch (error) {
      console.error(error);
    }
  };
