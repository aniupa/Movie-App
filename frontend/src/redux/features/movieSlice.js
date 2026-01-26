import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
  name: "movie",
  initialState: { movieCollection: [] },
  reducers:{
    addMovie:(state,action)=>{
      state.movieCollection=action.payload
    }
    ,removeMovie:(state,action)=>{
      state.movieCollection=action.payload
    },
    loadMovie:(state,action)=>{
      state.movieCollection=action.payload
    }
  }
});

export const {addMovie,removeMovie,loadMovie} =movieSlice.actions;
export default movieSlice.reducer;