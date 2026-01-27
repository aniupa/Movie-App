import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
  name: "movie",
  initialState: { movieCollection: [], total: 0, page: 1, limit: 4 },
  reducers: {
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
  },
});

export const { addMovie, removeMovie, loadMovie } = movieSlice.actions;
export default movieSlice.reducer;
