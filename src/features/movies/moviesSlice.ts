import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { MoviesState, Movie } from "../../types";
import * as moviesApi from "../../api/moviesApi";

const initialState: MoviesState = {
  movies: [],
  status: "idle",
  error: null,
};

export const fetchMoviesThunk = createAsyncThunk<
  Movie[],
  { search?: string; sort?: "asc" | "desc" }
>("movies/fetch", async ({ search, sort }) => {
  return moviesApi.fetchMovies(search, sort);
});

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchMoviesThunk.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.status = "succeeded";
          state.movies = action.payload;
        },
      )
      .addCase(fetchMoviesThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch movies";
      });
  },
});

export default moviesSlice.reducer;
