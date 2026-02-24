import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { importMoviesThunk } from "../features/movies/moviesSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";

const ImportMoviesForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    try {
      await dispatch(importMoviesThunk(file)).unwrap();
      console.log("Import successful");
    } catch (err) {
      console.error("Import failed:", err);
    } finally {
      setFile(null);
    }
  };

  return (
    <Box mb={4}>
      <Typography variant="h6" mb={1}>
        Import Movies
      </Typography>
      <input type="file" onChange={handleChange} accept=".txt" />
      <Box mt={1}>
        <Button variant="contained" onClick={handleSubmit} disabled={!file}>
          Import
        </Button>
      </Box>
    </Box>
  );
};

export default ImportMoviesForm;
