import axios from "axios";
import type {
  LoginPayload,
  RegisterPayload,
  AuthResponse,
} from "../types/auth";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (data: LoginPayload): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${API_URL}/auth/login`,
    data,
  );
  return response.data;
};

export const register = async (
  data: RegisterPayload,
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${API_URL}/auth/register`,
    data,
  );
  return response.data;
};
