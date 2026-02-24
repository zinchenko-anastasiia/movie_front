import React, { useEffect, useState } from "react";
import {
  deleteMovieThunk,
  fetchMoviesThunk,
} from "../features/movies/moviesSlice";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { AppDispatch, useAppSelector } from "../app/store";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import CreateMovieForm from "../components/CreateMovieForm";
import DeleteIcon from "@mui/icons-material/Delete";
import ImportMoviesForm from "../components/ImportMoviesForm";

const MoviesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, status, error } = useAppSelector((state) => state.movies);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    dispatch(fetchMoviesThunk({ search, sort }));
  }, [dispatch, search, sort]);

  const handleDelete = (id: number) => {
    dispatch(deleteMovieThunk(id));
  };

  return (
    <Box p={2}>
      <Typography variant="h4" mb={2}>
        Movies
      </Typography>
      <CreateMovieForm />
      <ImportMoviesForm />
      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Search by title or actor"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={sort}
          onChange={(e) => setSort(e.target.value as "asc" | "desc")}
        >
          <MenuItem value="asc">Sort Asc</MenuItem>
          <MenuItem value="desc">Sort Desc</MenuItem>
        </Select>
      </Box>

      {status === "loading" && <CircularProgress />}

      {status === "failed" && <Typography color="error">{error}</Typography>}

      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid
            size={{ xs: 12, md: 6, lg: 4 }}
            key={`${movie.title}-${movie.year}`}
          >
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {movie.title} ({movie.year})
                </Typography>
                <Typography variant="body2">Format: {movie.format}</Typography>
                <Typography variant="body2">
                  Actors: {movie.actors.map((a) => a.name).join(", ")}
                </Typography>
              </CardContent>
              <IconButton color="error" onClick={() => handleDelete(movie.id)}>
                <DeleteIcon />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MoviesPage;
