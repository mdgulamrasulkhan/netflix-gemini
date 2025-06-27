import { createSlice } from "@reduxjs/toolkit";

const GPTSlice = createSlice({
  name: "GPT",
  initialState: {
    ShowGPTSearch: false,
    GPTMovies: null,
    movieNames: null,
    movieResults: null,
  },
  reducers: {
    toggleGPTSearchView: (state) => {
      state.ShowGPTSearch = !state.ShowGPTSearch;
    },

    addGPTMoviesResult: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.GPTMovies = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
  },
});

export const { toggleGPTSearchView, addGPTMoviesResult } = GPTSlice.actions;

export default GPTSlice.reducer;
