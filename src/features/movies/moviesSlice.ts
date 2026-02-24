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
  console.log("Fetching movies with search:", search, "and sort:", sort);
  return moviesApi.fetchMovies(search, sort);
});

export const createMovieThunk = createAsyncThunk(
  "movies/create",
  async (data: {
    title: string;
    year: number;
    format: "VHS" | "DVD" | "Blu-ray";
    actors: string[];
  }) => {
    return moviesApi.createMovie(data);
  },
);

export const deleteMovieThunk = createAsyncThunk(
  "movies/delete",
  async (id: number) => {
    await moviesApi.deleteMovie(id);
    return id;
  },
);

export const importMoviesThunk = createAsyncThunk(
  "movies/import",
  async (file: File) => {
    return moviesApi.importMovies(file);
  },
);

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
      })
      .addCase(createMovieThunk.fulfilled, (state, action) => {
        state.movies.push(action.payload);
      })
      .addCase(deleteMovieThunk.fulfilled, (state, action) => {
        state.movies = state.movies.filter((m) => m.id !== action.payload);
      })
      .addCase(importMoviesThunk.fulfilled, (state, action) => {
        state.movies.push(...action.payload);
      });
  },
});

export default moviesSlice.reducer;
