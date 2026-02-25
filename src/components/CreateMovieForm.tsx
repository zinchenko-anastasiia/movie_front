import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { createMovieThunk } from "../features/movies/moviesSlice";
const formats = ["VHS", "DVD", "Blu-ray"] as const;

const CreateMovieForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState<number>(2020);
  const [format, setFormat] = useState<(typeof formats)[number]>("DVD");
  const [actors, setActors] = useState<string[]>([""]);

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  const handleActorChange = (value: string, index: number) => {
    const updated = [...actors];
    updated[index] = value;
    setActors(updated);
  };

  const addActorField = () => {
    setActors([...actors, ""]);
  };

  const handleSubmit = () => {
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
    closeDialog();
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={openDialog}
        sx={{ mb: 2 }}
      >
        Create Movie
      </Button>

      <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle>Create Movie</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit}>
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
              onChange={(e) =>
                setFormat(e.target.value as (typeof formats)[number])
              }
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

            <Button onClick={addActorField} sx={{ mt: 1 }}>
              Add Actor
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateMovieForm;
