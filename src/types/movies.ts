export interface Actor {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  year: number;
  format: "VHS" | "DVD" | "Blu-ray";
  actors: Actor[];
}

export interface MoviesState {
  movies: Movie[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
