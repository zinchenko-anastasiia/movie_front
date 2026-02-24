import React, { useState } from "react";
import { Box, TextField, Button, MenuItem, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { createMovieThunk } from "../features/movies/moviesSlice";
const formats = ["VHS", "DVD", "Blu-ray"] as const;

const CreateMovieForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState("");
  const [year, setYear] = useState<number>(2020);
  const [format, setFormat] = useState<(typeof formats)[number]>("DVD");
  const [actors, setActors] = useState<string[]>([""]);

  const handleActorChange = (value: string, index: number) => {
    const updated = [...actors];
    updated[index] = value;
    setActors(updated);
  };

  const addActorField = () => {
    setActors([...actors, ""]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      createMovieThunk({
        title,
        year,
        format,
        actors: actors.filter(Boolean),
      }),
    );

    setTitle("");
    setActors([""]);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mb={4}>
      <Typography variant="h5" mb={2}>
        Create Movie
      </Typography>

      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        type="number"
        label="Year"
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
        margin="normal"
      />

      <TextField
        select
        fullWidth
        label="Format"
        value={format}
        onChange={(e) => setFormat(e.target.value as (typeof formats)[number])}
        margin="normal"
      >
        {formats.map((f) => (
          <MenuItem key={f} value={f}>
            {f}
          </MenuItem>
        ))}
      </TextField>

      {actors.map((actor, index) => (
        <TextField
          key={index}
          fullWidth
          label={`Actor ${index + 1}`}
          value={actor}
          onChange={(e) => handleActorChange(e.target.value, index)}
          margin="normal"
        />
      ))}

      <Button onClick={addActorField}>Add Actor</Button>

      <Box mt={2}>
        <Button type="submit" variant="contained">
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default CreateMovieForm;
