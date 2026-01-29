import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movieCollection: [],
    total: 0,
    page: 1,
    limit: 8,
    searchQuery: "",
    selectedMovie: [],
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.page = 1;
    },
    addMovie: (state, action) => {
      state.movieCollection = action.payload;
    },
    removeMovie: (state, action) => {
      state.movieCollection = action.payload;
    },
    loadMovie: (state, action) => {
      state.movieCollection = action.payload.movieCollection;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      
    },
    updateMovie:(state,action)=>{
state.selectedMovie=action.payload.selectedMovie;
    }
  },
});

export const { addMovie, removeMovie, loadMovie, setPage, setSearchQuery ,updateMovie} =
  movieSlice.actions;
export default movieSlice.reducer;
