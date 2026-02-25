import React, { useState, useRef } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { importMoviesThunk } from "../features/movies/moviesSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";

const ImportMoviesForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

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
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const triggerInput = () => inputRef.current?.click();

  return (
    <Paper
      sx={{ p: 2, mb: 4, display: "flex", alignItems: "center", gap: 2 }}
      elevation={1}
    >
      <Box>
        <Typography variant="h6">Import Movies</Typography>
        <Typography variant="body2" color="text.secondary">
          Upload a .txt file with movies (one per line)
        </Typography>
      </Box>

      <input
        ref={inputRef}
        type="file"
        onChange={handleChange}
        accept=".txt"
        style={{ display: "none" }}
      />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: 2,
          justifyContent: "flex-end",
        }}
      >
        <Button variant="outlined" onClick={triggerInput}>
          Choose file
        </Button>
        <Typography
          variant="body2"
          sx={{ maxWidth: 240, overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {file ? file.name : "No file selected"}
        </Typography>
        <Button variant="contained" onClick={handleSubmit} disabled={!file}>
          Import
        </Button>
      </Box>
    </Paper>
  );
};

export default ImportMoviesForm;
