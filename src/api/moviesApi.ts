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
