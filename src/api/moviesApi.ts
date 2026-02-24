import type { Movie } from "../types";
import instance from "./axiosInstance";

export const fetchMovies = async (
  search?: string,
  sort?: "asc" | "desc",
): Promise<Movie[]> => {
  const params: Record<string, string> = {};

  if (search) params.search = search;
  if (sort) params.sort = sort;

  const res = await instance.get<Movie[]>("/movies", { params });
  return res.data;
};

export const createMovie = async (data: {
  title: string;
  year: number;
  format: "VHS" | "DVD" | "Blu-ray";
  actors: string[];
}) => {
  const res = await instance.post("/movies", data);
  return res.data;
};

export const deleteMovie = async (id: number) => {
  await instance.delete(`/movies/${id}`);
};

export const importMovies = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await instance.post("/movies/import", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};
