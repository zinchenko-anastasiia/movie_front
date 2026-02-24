import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import moviesReducer from "../features/movies/moviesSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
